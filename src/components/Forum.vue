<script setup>
import { ref } from "vue";
import getCollection from "@/composables/getCollection"; // Hent data
import { projectFirestore, timestamp } from "@/firebase/config"; // Firebase konfiguration

const { documents: posts, error } = getCollection("posts");
const newPost = ref("");
const username = ref("Bruger123");

// Funktion til at sende et nyt indlæg
const submitPost = async () => {
    if (newPost.value.trim()) {
        await projectFirestore.collection("posts").add({
            username: username.value,
            content: newPost.value,
            createdAt: timestamp(),
        });
        newPost.value = ""; // Nulstil inputfelt
    }
};
</script>

<template>
    <div class="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-4 text-center">Forum</h2>
        <div class="flex flex-col gap-4">
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
                <p class="text-sm text-gray-500">{{ post.username }}</p>
                <p class="text-lg text-gray-800">{{ post.content }}</p>
            </div>
        </div>
    </div>
</template>
