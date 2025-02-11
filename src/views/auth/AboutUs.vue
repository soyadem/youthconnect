<template>
  <div class="container">
    <div class="white-section">
      <h2>Hvem er vi?</h2>
      <p>
        Vi er YouthConnect – en platform, der giver unge i Roskilde mulighed for at socialisere og skabe fællesskaber med andre unge i lokalområdet.
        Vi har udviklet en online tilmeldingsplatform, som gør det muligt for unge at få overblik over og tilmelde sig aktiviteter på tværs af de forskellige skoler i området.
      </p>

      <div class="content-section">
        <div class="text-box forum-box">
          <h3>Forum</h3>
          <p>
            Vi tilbyder også et forum for unge, der finder det udfordrende at være sociale. Her kan de møde ligesindede og skabe nye venskaber baseret på fælles interesser.
          </p>
        </div>
        <div class="text-box security-box">
          <h3>Sikkerhed og fortrolighed</h3>
          <p>
            Vi sikrer et trygt miljø gennem verificerede brugere, GDPR-overholdelse og ansvarlig administration, så de unge kan fokusere på fællesskab.
          </p>
        </div>
      </div>

      <h2 class="section-title">Forældre</h2>
      <p>
        Vi forstår vigtigheden af tryghed for forældre. Derfor har vi skabt funktioner, der giver indsigt i de aktiviteter, deres børn deltager i.
      </p>

      <div class="content-section">
        <div class="text-box transparency-box">
          <h3>Transparens</h3>
          <p>Forældre kan få adgang til en oversigt over deres barns aktiviteter via en dedikeret forældremenu.</p>
        </div>
        <div class="text-box communication-box">
          <h3>Kommunikation</h3>
          <p>Mulighed for at modtage notifikationer om tidspunkter, lokationer og kontaktpersoner for aktiviteterne.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6853a0;
  font-family: "Arial", sans-serif;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  background: white;
  border-radius: 0;
  box-shadow: none;
  padding: 40px;
}

.white-section {
  width: 100%;
}

h2 {
  color: #6853a0;
  margin-bottom: 15px;
  font-size: 1.8rem;
  text-transform: uppercase;
}

.section-title {
  margin-top: 40px;
}

p {
  color: #444;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.content-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
}

.text-box {
  flex: 1;
  min-width: 320px;
  max-width: 48%;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  color: white;
  font-weight: bold;
  background: #6853a0;
  text-align: left;
}

.text-box p {
  color: white;
}

.text-box:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
}

h3 {
  margin-bottom: 10px;
  color: #fff;
}

@media (max-width: 768px) {
  .content-section {
    flex-direction: column;
    align-items: center;
  }
  .text-box {
    width: 100%;
  }
}
</style>
