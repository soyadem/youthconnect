<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="document">
    <h2>Category Details - ID: {{ id }}</h2>
    <div class="single">
      <div class="thumbnail">
        <img :src="document.coverUrl" alt="Category image" />
      </div>
      <div class="info">
        <h3>{{ document.title }}</h3>
        <p>Created by {{ document.userName }}</p>
      </div>
      <div class="song-number">
        <p>{{ document.activities.length }} Activities</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import getDocument from '../../composables/getDocument'
import { computed } from 'vue'

export default {
  props: ['id'],
  setup(props) {
    const { error, document } = getDocument('category', props.id) 
    return { error, document }
  }
}
</script>

<style>
/* Add your styles */
</style>
