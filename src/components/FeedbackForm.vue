<template>
  <div class="feedback-form">
    <h3>Giv din feedback</h3>
    <textarea v-model="feedbackText" placeholder="Skriv din feedback her..."></textarea>
    <button @click="sendFeedback">Send Feedback</button>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { projectFirestore, projectAuth } from "@/firebase/config";

const props = defineProps({
  activityId: String,
});

const db = projectFirestore;
const auth = projectAuth;
const feedbackText = ref("");
const message = ref("");

const sendFeedback = async () => {
  if (!feedbackText.value.trim()) {
    message.value = "Feedback må ikke være tom!";
    return;
  }

  try {
    await db.collection("feedback").add({
      activityId: props.activityId,
      user: auth.currentUser ? auth.currentUser.email : "Anonym",
      text: feedbackText.value,
      timestamp: projectFirestore.FieldValue.serverTimestamp(),
    });

    message.value = "Tak for din feedback!";
    feedbackText.value = "";
  } catch (error) {
    console.error("Fejl ved indsættelse af feedback:", error);
    message.value = "Der opstod en fejl. Prøv igen.";
  }
};
</script>

<style scoped>
.feedback-form {
  margin-top: 20px;
}
textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}
button {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.message {
  margin-top: 10px;
  color: green;
}
</style>