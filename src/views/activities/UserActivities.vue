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
  <div class="user-activity">
    <div v-if="registeredActivities.length">
      <div v-for="activity in registeredActivities" :key="activity.id" class="activity-card">
        <h3>{{ activity.title }}</h3>
        <p>{{ activity.location }}</p>
        <p>{{ activity.time }}</p>
      </div>
    </div>
    <p v-else>No registered activities yet.</p>
  </div>
</template>
