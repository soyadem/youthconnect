<script>
import { useActivityStore } from '@/stores/activityStore'
import { computed } from 'vue'

export default {
  setup() {
    const store = useActivityStore()
    const registeredActivities = computed(() => store.registeredActivities)

    return { registeredActivities }
  }
}
</script>

<template>
  <div class="activity-list">
    <h2>MY ACTIVITIES</h2>
    <div v-if="registeredActivities.length">
      <div v-for="activity in registeredActivities" :key="activity.id" class="single">
        <div class="thumbnail">
          <!-- Vist billede hvis coverUrl findes -->
          <img v-if="activity.coverUrl" :src="activity.coverUrl" :alt="activity.title" class="activity-image" />
        </div>
        <div class="info">
          <h3>{{ activity.title }}</h3>
          <p>{{ activity.location }}</p>
          <p>{{ activity.time }}</p>
        </div>
      </div>
    </div>
    <p v-else>No registered activities yet.</p>
  </div>
</template>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}

.single:hover {
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  transform: scale(1.02);
  transition: all ease 0.2;
}

.thumbnail {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 14px;
}

.thumbnail img {
  width: 100%;  /* Sikrer at billedet fylder containeren */
  height: 100%; /* Gør at billedet altid fylder hele containeren */
  object-fit: cover; /* Sikrer at billedet bevarer proportioner og beskæres hvis nødvendigt */
  display: block;
}

.info {
  margin-left: 20px;
}

.info h3 {
  font-size: 20px;
  margin-bottom: 5px;
}

.info p {
  margin: 5px 0;
  color: #555;
}
</style>
