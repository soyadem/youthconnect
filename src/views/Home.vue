<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <p><router-link class="btn" :to="{name: 'CreateCategory' }">CREATE CATEGORY</router-link></p>
      <ListView :category="documents" />
    </div>
  </div>
</template>

<script>
import ListView from '../components/ListView.vue'
import getCollection from "../composables/getCollection";

export default {
  name: "Home",
  components: { ListView },
  setup() {
    const { error, documents } = getCollection("category");
    return { error, documents };
  },
};
</script>

<style>
.btn {
    background-color: #6853a0 !important;
    color: #ffffff;
    border: none; 
    padding: 10px 20px; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: transform 0.5s ease; 
    }
    .btn:hover {
    background-color: #6853a0;
    transform: scale(1.1);
    }
</style>