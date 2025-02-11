<script setup>
import { ref } from 'vue'
import {addDoc, collection,getFirestore, serverTimpestamp} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const feedbackText = ref('');
const succesfeedback = ref("");

const submitFeedback = async () => { 
    if (!auth.currentUser) {
    alert("Du skal logge ind for at give feedback");
    return;
}

try {
    await addDoc(collection(db, "feedback"), {
        user: auth.currentUser.email,
        text: feedbackText.value,
        timestamp: serverTimpestamp(),
    });
    feedbackText.value = "";
    succesmessaaage.value = "Tak for din feedback";
    } catch (error) {
    console.error ("Fejl din feedback kunne ikke sendes", error);
    }
};
</script>

<template>
    <div>
        <h2>Giv din feedback</h2>¨
        <textarea v-model="feedbackText" placeholder="Skriv din feedback her..."></textarea>"
        <button @click="submitFeedback">Send feedback</button>¨
        <p v-if="succesmessage">{{ sucessMessage }}</p>
    </div>
</template>

<style scoped>
textarea {
    width: 100%;
    height: 100px;
    
}
botton {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 10px;
}
</style>