<template>
    <div>
      <h1>{{ activity.title }}</h1>
      <p>{{ activity.description }}</p>
  
      <FeedbackForm :activityId="activity.id" />
      <FeedbackList :activityId="activity.id" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  import FeedbackForm from ".@/components/FeedBackForm.vue";
  import FeedbackList from ".@/components/FeedbackList.vue";
  
  const db = getFirestore();
  const route = useRoute();
  const activity = ref({});
  
  onMounted(async () => {
    const docRef = doc(db, "activities", route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      activity.value = docSnap.data();
    }
  });
  </script>