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
const forbiddenWords = ["fuck", "forbudtord2", "forbudtord3"];

// Opdater posts, når data ændres
watchEffect(() => {
    posts.value = rawPosts.value || [];
    topics.value = [...new Set(posts.value.map(post => post.topic))];
});

// Funktion til at oprette et nyt emne
const createTopic = () => {
    if (!newTopic.value.trim()) return;
    topics.value.push(newTopic.value.trim());
    selectedTopic.value = newTopic.value.trim();
    newTopic.value = "";
};

// Funktion til at sende et nyt indlæg
const submitPost = async () => {
    if (!newPost.value.trim() || !user.value || !selectedTopic.value) return;
    
    // Tjek for forbudte ord
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

// Funktion til at slette et indlæg
const deletePost = async (postId) => {
    if (confirm("Er du sikker på, at du vil slette dette indlæg?")) {
        await projectFirestore.collection("posts").doc(postId).delete();
    }
};

// Start redigering af et indlæg
const startEditing = (post) => {
    editingPost.value = post.id;
    editedContent.value = post.content;
};

// Gem ændringerne i et indlæg
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

// Funktion til at like et opslag
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

// Hold øje med om brugeren skifter
projectAuth.onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-xl">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Forum</h2>

    <!-- Login Check -->
    <p v-if="!user" class="text-red-500 text-center mb-4">
      Du skal være logget ind for at skrive et opslag.
    </p>

    <div v-if="user" class="flex flex-col gap-6">
      <!-- Create Topic Section -->
      <div class="flex gap-4">
        <input
          v-model="newTopic"
          class="p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nyt emne"
        />
        <button
          @click="createTopic"
          class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
        >
          Opret emne
        </button>
      </div>

      <!-- Select Topic -->
      <div>
        <select
          v-model="selectedTopic"
          class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="topic in topics" :key="topic" :value="topic">
            {{ topic }}
          </option>
        </select>
      </div>

      <!-- Create Post -->
      <textarea
        v-model="newPost"
        class="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Skriv dit indlæg..."
      ></textarea>
      <button
        @click="submitPost"
        class="bg-blue-500 text-white py-3 px-8 rounded-lg w-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>

    <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>

    <!-- Posts Section -->
    <div class="mt-8 space-y-6">
      <div
        v-for="post in (posts || []).filter(p => p.topic === selectedTopic)"
        :key="post.id"
        class="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <div class="flex justify-between items-start mb-4">
          <p class="text-sm text-gray-500">
            <strong>{{ post.username }}</strong>
          </p>
        </div>

        <!-- Post Content and Actions (flex) -->
        <div class="flex items-start gap-6">
          <!-- Post Content -->
          <div class="flex-1">
            <div v-if="editingPost === post.id">
              <textarea
                v-model="editedContent"
                class="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div class="flex justify-end gap-2 mt-2">
                <button
                  @click="saveEdit(post.id)"
                  class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                >
                  Gem
                </button>
                <button
                  @click="editingPost = null"
                  class="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition"
                >
                  Annuller
                </button>
              </div>
            </div>

            <p v-else class="text-lg text-gray-800">{{ post.content }}</p>
          </div>

          <!-- Post Actions (Like, Edit, Delete) -->
          <div class="flex flex-col items-end space-y-2">
            <button
              @click="toggleLike(post)"
              class="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition"
            >
              ❤️ {{ post.likes ? post.likes.length : 0 }}
            </button>
            <div v-if="user && user.uid === post.userId" class="flex flex-col gap-2">
              <button
                @click="startEditing(post)"
                class="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
              >
                Rediger
              </button>
              <button
                @click="deletePost(post.id)"
                class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
              >
                Slet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


