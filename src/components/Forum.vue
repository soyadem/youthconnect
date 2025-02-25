<script setup>
import { ref } from "vue";
import getCollection from "@/composables/getCollection";
import { projectFirestore, timestamp, projectAuth } from "@/firebase/config";

const { documents: posts, error } = getCollection("posts");
const newPost = ref("");
const user = ref(projectAuth.currentUser);
const editingPost = ref(null);
const editedContent = ref("");

// Funktion til at sende et nyt indlæg
const submitPost = async () => {
    if (newPost.value.trim() && user.value) {
        await projectFirestore.collection("posts").add({
            username: user.value.displayName || "Ukendt Bruger",
            userId: user.value.uid, 
            content: newPost.value,
            likes: [], // Gemmer likes som en tom liste
            createdAt: timestamp(),
        });
        newPost.value = "";
    }
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
    await projectFirestore.collection("posts").doc(postId).update({
        content: editedContent.value,
    });
    editingPost.value = null; // Stop redigering
};

// Funktion til at like et opslag
const toggleLike = async (post) => {
    if (!user.value) {
        alert("Du skal være logget ind for at like!");
        return;
    }

    const postRef = projectFirestore.collection("posts").doc(post.id);
    let updatedLikes = post.likes ? [...post.likes] : []; // Sikrer, at der altid er en liste

    if (updatedLikes.includes(user.value.uid)) {
        // Hvis brugeren allerede har liket, fjern like
        updatedLikes = updatedLikes.filter((uid) => uid !== user.value.uid);
    } else {
        // Hvis brugeren ikke har liket, tilføj like
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
    <div class="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Forum</h2>

        <p v-if="!user" class="text-red-500 text-center">
            Du skal være logget ind for at skrive et opslag.
        </p>

        <div v-if="user" class="flex flex-col gap-4">
            <textarea v-model="newPost"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skriv dit indlæg..."></textarea>
            <button @click="submitPost"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Send
            </button>
        </div>

        <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>

        <div class="mt-6 space-y-4">
            <div v-for="post in posts" :key="post.id"
                class="p-4 bg-white rounded-lg shadow flex flex-col">
                <p class="text-sm text-gray-500">
                    <strong>{{ post.username }}</strong>
                </p>

                <!-- Redigeringsfelt -->
                <div v-if="editingPost === post.id">
                    <textarea v-model="editedContent" class="w-full p-2 border rounded"></textarea>
                    <button @click="saveEdit(post.id)" class="bg-green-500 text-white py-1 px-3 rounded mt-2">
                        Gem
                    </button>
                    <button @click="editingPost = null" class="bg-gray-500 text-white py-1 px-3 rounded mt-2 ml-2">
                        Annuller
                    </button>
                </div>

                <!-- Normal visning -->
                <p v-else class="text-lg text-gray-800">{{ post.content }}</p>

                <!-- Synes godt om knap -->
                <div class="flex items-center gap-2 mt-2">
                    <button @click="toggleLike(post)" class="bg-pink-500 text-white py-1 px-3 rounded flex items-center gap-1">
                        ❤️ {{ post.likes ? post.likes.length : 0 }}
                    </button>
                </div>

                <!-- Rediger / Slet knapper (kun synlig for ejeren) -->
                <div v-if="user && user.uid === post.userId" class="flex gap-2 mt-2">
                    <button @click="startEditing(post)" class="bg-yellow-500 text-white py-1 px-3 rounded">
                        Rediger
                    </button>
                    <button @click="deletePost(post.id)" class="bg-red-500 text-white py-1 px-3 rounded">
                        Slet
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
