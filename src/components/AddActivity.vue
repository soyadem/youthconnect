<template>
  <div class="add-activity">
    <button v-if="!showForm" @click="showForm = true">ADD ACTIVITIES</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>ADD A NEW ACTIVITY</h4>
      <input type="text" placeholder="ACTIVITY TITLE" required v-model="title">
      <input type="text" placeholder="LOCATION" required v-model="location">
      <input type="text" placeholder="TIME" required v-model="time">
      <button>ADD</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const title = ref('')
    const location = ref('')
    const time = ref('')
    const showForm = ref(false)

    const handleSubmit = async () => {
      const newActivity = {
        title: title.value,
        location: location.value,
        time: time.value,
        id: Math.floor(Math.random() * 1000)
      }
      console.log(newActivity)
    }

    return { title, location, time, showForm, handleSubmit }
  }

}
</script>

<style scoped>
  .add-activity {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>