<template>
  <div>
    <h2>MY ACTIVITIES</h2>
    <div class="activities-grid">
      <div v-for="activity in activities" :key="activity" class="activity-card">
        <p>{{ activity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      activities: ["BIOGRAFTUR", "FODBOLD", "BOWLING"],
    };
  },
};
</script>

<style scoped>
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Dynamisk antal kolonner */
  gap: 20px; /* Afstand mellem bokse */
  margin-top: 20px;
}

.activity-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Blød skygge */
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.activity-card:hover {
  transform: translateY(-5px); /* Løfter boksen op ved hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15); /* Øget skygge ved hover */
}

.activity-card p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
</style>
