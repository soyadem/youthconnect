<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">Forum</h1>

    <!-- Liste af emner -->
    <div>
      <div v-for="(topic, index) in topics" :key="index" class="mb-4 p-4 border rounded-lg">
        <h2 class="text-lg font-bold cursor-pointer" @click="selectTopic(index)">
          {{ topic.title }}
        </h2>
      </div>
    </div>

    <!-- Hvis et emne er valgt, vis et tekstfelt for at skrive et opslag -->
    <div v-if="selectedTopic !== null" class="mt-4 p-4 border rounded-lg">
      <h2 class="text-lg font-bold">Skriv et opslag til emnet: {{ topics[selectedTopic].title }}</h2>
      <textarea
        v-model="topics[selectedTopic].newPost"
        placeholder="Skriv dit opslag her..."
        class="w-full mb-2 p-2 border rounded"
      ></textarea>
      <button
        @click="handlePostSubmit"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Opret Indlæg
      </button>
    </div>

    <!-- Vis opslag for det valgte emne -->
    <div v-if="selectedTopic !== null" class="mt-4">
      <div v-for="(post, index) in topics[selectedTopic].posts" :key="index" class="mb-4 p-4 border rounded-lg">
        <p>{{ post }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Liste af emner
      topics: [
        { title: "Emne 1", posts: [], newPost: "" },
        { title: "Emne 2", posts: [], newPost: "" },
        { title: "Emne 3", posts: [], newPost: "" }
      ],
      selectedTopic: null // Den valgte emne
    };
  },
  methods: {
    // Når et emne vælges
    selectTopic(index) {
      this.selectedTopic = index;
    },
    // Opret opslag i det valgte emne
    handlePostSubmit() {
      if (this.selectedTopic !== null && this.topics[this.selectedTopic].newPost) {
        this.topics[this.selectedTopic].posts.push(this.topics[this.selectedTopic].newPost);
        this.topics[this.selectedTopic].newPost = ""; // Tøm tekstfeltet efter indlæg
      }
    }
  }
};
</script>

<style>
  .border {
    border: 1px solid #ddd;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>