<template>
  <div class="container">
    <div class="white-section">
      <h2>Hvem er vi?</h2>
      <p>
        Vi er YouthConnect – en platform, der giver unge i Roskilde mulighed for at socialisere og skabe fællesskaber med andre unge i lokalområdet.
        Vi har udviklet en online tilmeldingsplatform, som gør det muligt for unge at få overblik over og tilmelde sig aktiviteter på tværs af de forskellige skoler i området.
      </p>

      <div class="content-section">
        <div class="text-box">
          <h3>Forum</h3>
          <p>
            Vi tilbyder også et forum for unge, der finder det udfordrende at være sociale. Her kan de møde ligesindede og skabe nye venskaber baseret på fælles interesser.
          </p>
        </div>
        <div class="text-box">
          <h3>Sikkerhed og fortrolighed</h3>
          <p>
            Vi sikrer et trygt miljø gennem verificerede brugere, GDPR-overholdelse og ansvarlig administration, så de unge kan fokusere på fællesskab.
          </p>
        </div>
      </div>

      <h2>Forældre</h2>
      <p>
        Vi forstår vigtigheden af tryghed for forældre. Derfor har vi skabt funktioner, der giver indsigt i de aktiviteter, deres børn deltager i.
      </p>

      <div class="content-section">
        <div class="text-box">
          <h3>Transparens</h3>
          <p>Forældre kan få adgang til en oversigt over deres barns aktiviteter via en dedikeret forældremenu.</p>
        </div>
        <div class="text-box">
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 1100px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.white-section {
  text-align: center;
  width: 100%;
}

h2 {
  color: #333;
  margin-bottom: 15px;
}

p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.content-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.text-box {
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h3 {
  color: #444;
  margin-bottom: 10px;
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
