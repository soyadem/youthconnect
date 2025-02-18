<script setup>
import { ref, computed } from "vue";
import getCollection from "@/composables/getCollection";
import { projectFirestore, timestamp, projectAuth } from "@/firebase/config";

const { documents: posts, error } = getCollection("posts");
const newPost = ref("");
const user = ref(projectAuth.currentUser); // Hent den nuværende bruger

// Funktion til at sende et nyt indlæg
const submitPost = async () => {
    if (newPost.value.trim() && user.value) {
        await projectFirestore.collection("posts").add({
            username: user.value.displayName || "Ukendt Bruger",
            userId: user.value.uid, // Gem brugerens ID
            content: newPost.value,
            createdAt: timestamp(),
        });
        newPost.value = ""; // Nulstil inputfelt
    }
};

// Hold øje med om brugeren skifter
projectAuth.onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
});
</script>

<template>
    <div class="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Forum</h2>
        
        <!-- Hvis brugeren ikke er logget ind -->
        <p v-if="!user" class="text-red-500 text-center">Du skal være logget ind for at skrive et opslag.</p>

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
                    <strong>{{ post.username }}</strong> ({{ post.userId }})
                </p>
                <p class="text-lg text-gray-800">{{ post.content }}</p>
            </div>
        </div>
    </div>
</template>

