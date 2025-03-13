<script setup>
import { ref, watchEffect } from "vue";
import getCollection from "@/composables/getCollection";
import { projectFirestore, timestamp, projectAuth } from "@/firebase/config";

const { documents: rawPosts, error } = getCollection("posts");
const posts = ref([]);
const newPost = ref("");
const newTopic = ref("");
const topics = ref([]);
const selectedTopic = ref(null);
const user = ref(projectAuth.currentUser);
const editingPost = ref(null);
const editedContent = ref("");

// Forbudte ord
const forbiddenWords = ["fuck"];

// Opdater posts, når data ændres
watchEffect(() => {
    posts.value = rawPosts.value || [];
    topics.value = [...new Set(posts.value.map(post => post.topic))];
});

// Opret nyt emne
const createTopic = () => {
    if (!newTopic.value.trim()) return;
    topics.value.push(newTopic.value.trim());
    selectedTopic.value = newTopic.value.trim();
    newTopic.value = "";
};

// Send et nyt indlæg
const submitPost = async () => {
    if (!newPost.value.trim() || !user.value || !selectedTopic.value) return;
    
    if (forbiddenWords.some(word => newPost.value.toLowerCase().includes(word))) {
        alert("Dit indlæg indeholder forbudte ord.");
        return;
    }
    
    await projectFirestore.collection("posts").add({
        username: user.value.displayName || "Ukendt Bruger",
        userId: user.value.uid, 
        topic: selectedTopic.value,
        content: newPost.value,
        likes: [],
        createdAt: timestamp(),
    });
    newPost.value = "";
};

// Slet et indlæg
const deletePost = async (postId) => {
    if (confirm("Er du sikker på, at du vil slette dette indlæg?")) {
        await projectFirestore.collection("posts").doc(postId).delete();
    }
};

// Start redigering
const startEditing = (post) => {
    editingPost.value = post.id;
    editedContent.value = post.content;
};

// Gem ændringer i indlæg
const saveEdit = async (postId) => {
    if (forbiddenWords.some(word => editedContent.value.toLowerCase().includes(word))) {
        alert("Dit indlæg indeholder forbudte ord.");
        return;
    }
    
    await projectFirestore.collection("posts").doc(postId).update({
        content: editedContent.value,
    });
    editingPost.value = null;
};

// Like et indlæg
const toggleLike = async (post) => {
    if (!user.value) {
        alert("Du skal være logget ind for at like!");
        return;
    }

    const postRef = projectFirestore.collection("posts").doc(post.id);
    let updatedLikes = post.likes ? [...post.likes] : [];

    if (updatedLikes.includes(user.value.uid)) {
        updatedLikes = updatedLikes.filter(uid => uid !== user.value.uid);
    } else {
        updatedLikes.push(user.value.uid);
    }

    await postRef.update({ likes: updatedLikes });
};

// Opdater brugerstatus
projectAuth.onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
});
</script>

<template>
  <div class="container">
    <div class="forum-box">
      <h2 class="text-center text-3xl font-bold mb-6">Forum</h2>

      <!-- Login Check -->
      <p v-if="!user" class="text-red-500 text-center mb-4">
        Du skal være logget ind for at skrive et opslag.
      </p>

      <div v-if="user" class="forum-actions">
        <!-- Opret emne -->
        <div class="input-group">
          <input v-model="newTopic" placeholder="Nyt emne" />
          <button @click="createTopic" class="green">Opret emne</button>
        </div>

        <!-- Vælg emne -->
        <select v-model="selectedTopic">
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>

        <!-- Skriv indlæg -->
        <textarea v-model="newPost" placeholder="Skriv dit indlæg..."></textarea>
        <button @click="submitPost" class="blue">Send</button>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <!-- Indlæg -->
      <div class="posts">
        <div v-for="post in (posts || []).filter(p => p.topic === selectedTopic)" :key="post.id" class="post">
          <p class="username"><strong>{{ post.username }}</strong></p>

          <div v-if="editingPost === post.id">
            <textarea v-model="editedContent"></textarea>
            <div class="button-group">
              <button @click="saveEdit(post.id)" class="green">Gem</button>
              <button @click="editingPost = null" class="gray">Annuller</button>
            </div>
          </div>

          <p v-else class="content">{{ post.content }}</p>

          <div class="actions">
            <button @click="toggleLike(post)" class="pink">❤️ {{ post.likes ? post.likes.length : 0 }}</button>
            <div v-if="user && user.uid === post.userId">
              <button @click="startEditing(post)" class="yellow">Rediger</button>
              <button @click="deletePost(post.id)" class="red">Slet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  color: #212529;
  transition: background 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}

.forum-box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.input-group {
  display: flex;
  gap: 10px;
}

input, textarea, select {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  width: 100%;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.green { background: #28a745; color: white; }
.blue { background: #007bff; color: white; }
.red { background: #dc3545; color: white; }
.pink { background: #ff1493; color: white; }
.yellow { background: #ffc107; color: black; }
</style>
