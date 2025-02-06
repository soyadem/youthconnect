<template>
  <div class="home">
    <div v-if="documents && documents.length > 0" class="activities-grid">



  <div v-for="doc in documents" :key="doc.id" class="activity-card">
    <router-link :to="{ name: 'CategoryDetails', params: { id: doc.id }}">
    <img v-if="doc.coverUrl" :src="doc.coverUrl" :alt="doc.title" class="activity-image" />
    <p>{{ doc.title }}</p></router-link>
  </div>
</div>
  </div>
</template>
<script>


import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
   setup() {
    const { error, documents } = getCollection('category')
    return { error, documents }
  }
}
</script>

<style scoped>
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px; 
  margin-top: 30px;
}

.activity-card {
  padding: 15px; 
  border-radius: 20px; 
  background-color: #6853a0; 
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); 
}

.activity-card:hover {
  transform: translateY(-15px); 
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.2); 
}

.activity-card p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: white; 
}

.activity-image {
  width: 100%; 
  height: 190px; 
  object-fit: cover; 
  border-radius: 12px;
  margin-bottom: 6px; 
}

</style>