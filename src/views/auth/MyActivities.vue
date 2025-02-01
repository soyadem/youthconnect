<template>
  <div>
    <div class="activities-grid">
      <div v-for="activity in activities" :key="activity.name" class="activity-card">
        <img v-if="activity.image" :src="activity.image" :alt="activity.name" class="activity-image" />
        <p>{{ activity.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const activities = [
      { image: require('@/assets/cinema1.jpg'), name: "CINEMA" },
      { image: require('@/assets/football1.png'), name: "FOOTBALL" },
      { image: require('@/assets/bowling1.webp'), name: "BOWLING"},
      { image: require('@/assets/dancing1.jpg'), name: "DANCING"},
      { image: require('@/assets/gaming1.jpg'), name: "GAMING"},
      { image: require('@/assets/reading1.avif'), name: "READING"},
      { image: require('@/assets/zoo1.jpg'), name: "ZOO"},
      { image: require('@/assets/walking1.jpg'), name: "WALKING"},
      { image: require('@/assets/picnic1.jpg'), name: "PICNIC"}
    ];

    return {
      activities,
    };
  },
};
</script>

<style scoped>
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Større kolonner for større bokse */
  gap: 30px; /* Øget afstand mellem bokse */
  margin-top: 30px;
}

.activity-card {
  padding: 23px; /* Øget padding for større kort */
  border-radius: 15px; /* Øget afrunding af hjørner */
  background-color: #6853a0; /* Lilla baggrund */
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); /* Større skygge */
}

.activity-card:hover {
  transform: translateY(-10px); /* Løft boksen mere ved hover */
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.2); /* Større skygge ved hover */
}

.activity-card p {
  margin: 0;
  font-size: 1.8rem; /* Øget font-størrelse */
  font-weight: bold;
  color: white; /* Hvid tekst */
}

.activity-image {
  width: 100%; /* Sørg for at billedet fylder hele containerens bredde */
  height: 260px; /* Fast højde for ensartede billeder */
  object-fit: cover; /* Sørg for at billedet beskæres korrekt, så det fylder hele containeren */
  border-radius: 12px;
  margin-bottom: 20px; /* Mere afstand mellem billede og tekst */
}
</style>
