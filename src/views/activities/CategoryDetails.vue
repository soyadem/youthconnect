<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="category" class="category-details">

    <!-- playlist information -->
    <div class="category-info">
      <div class="cover">
        <img :src="category.coverUrl">
      </div>
      <h2>{{ category.title }}</h2>
      <p class="username">Created by {{ category.userName }}</p>
      <p class="description">{{ category.description }}</p>
      </div>

      <div class="activity-list">
        <p> ACTIVITY LIST HERE</p>
        <AddActivity />
      </div>
      
  </div>
</template>

<script>
import AddActivity from '@/components/AddActivity.vue'
import getDocument from '@/composables/getDocument'

export default {
  props: ['id'],
  components: { AddActivity },
  setup(props) {
    const { error, document: category } = getDocument('category', props.id)

    return { error, category }
  }
}
</script>

<style>
 .category-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.category-info {
  text-align: center;
}
.category-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.category-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>