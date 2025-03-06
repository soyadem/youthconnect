<template>
  <div class="add-activity">
    <button class="btn" v-if="!showForm" @click="showForm = true">ADD ACTIVITIES</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>ADD A NEW ACTIVITY</h4>
      <input type="text" placeholder="ACTIVITY TITLE" required v-model="title">
      <input type="text" placeholder="LOCATION" required v-model="location">
      <input type="text" placeholder="TIME" required v-model="time">
      <input type="text" placeholder="MENTOR" required v-model='mentor'>
      <button>ADD</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useCollection from '@/composables/useCollection'

export default {
  props: ['category'],
  setup(props) {
    const title = ref('')
    const location = ref('')
    const time = ref('')
    const mentor = ref('')
    
    const showForm = ref(false)
    const { updateDoc } = useCollection('category')

    const handleSubmit = async () => {
      if (!props.category || !props.category.id) {
        console.error("Category or category ID is undefined")
        return
      }

      const newActivity = {
        title: title.value,
        location: location.value,
        time: time.value,
        mentor: mentor.value,
        id: Math.floor(Math.random() * 1000)
      }
      await updateDoc(props.category.id, {
        activities: [...(props.category.activities || []), newActivity]
      })
      title.value = ''
      location.value = ''
      time.value = ''
      mentor.value = ''
    }

    return { title, location, time, mentor, showForm, handleSubmit }
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
  .btn {
    display: flex;
    justify-content: flex-start;
  }
  .btn {
  
    background-color: #6853a0;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: transform 0.5s ease;
    }
    .btn:hover {
    background-color: #6853a0;
    transform: scale(1.1);
    }
</style>