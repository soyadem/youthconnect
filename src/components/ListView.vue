<template>
  <div v-for="doc in category" :key="doc.id">
    <router-link :to="{ name: 'CategoryDetails', params: { id: doc.id } }">
      <div class="single">
        <div class="thumbnail">
          <img v-if="doc.coverUrl" :src="doc.coverUrl" :alt="doc.title" class="category-image" />
        </div>
        <div class="info">
          <h3>{{ doc.title }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['category'],
}
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover{
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  transform: scale(1.02);
  transition: all ease 0.2;
}
.thumbnail {
  max-width: 150px;
  max-height: 150px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width:100%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 30px;
}
</style>