<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="document">
    <h2>CATEGORY DETAILS - ID: {{ id }}</h2>
    <div class="single">
      <div class="thumbnail">
        <img :src="document.coverUrl" alt="Category image" />
      </div>
      <div class="info">
        <h3>{{ document.title }}</h3>
        <p>CREATED BY: {{ document.userName }}</p>
      </div>
      <div class="song-number">
        <p>{{ document.activities.length }} ACTIVITIES</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>LOADING...</p>
  </div>
</template>

<script>
import getDocument from '../../composables/getDocument'

export default {
  props: ['id'],
  setup(props) {
    const { error, document } = getDocument('category', props.id) 
    return { error, document }
  }
}
</script>

<style>
  .playlist-details {
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
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
</style>