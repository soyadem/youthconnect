<template>
  <div class="container">
    <div class="purple-section">
      <h1 class="white-text">ABOUT<br>US</h1>
    </div>
    <div class="white-section">
      <p>Lorem Ipsum<br><br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vivamus lacinia, orci eu iaculis tincidunt, lorem sapien suscipit odio. Proin fringilla eros sed tempus iaculis. 
        Cras vestibulum lacinia lorem vel vehicula. Integer sit amet mollis sapien. La turtabonta muros des kuntapus heriacles.
        David kentala odio estamos icaluis orci eu samtom procedurda ki luabne kio den.
    </p>
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
  overflow: hidden; 
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%; 
}

.purple-section {
  background-color: #6853a0;
  width: 30%;
  display: flex;
  align-items: center; 
  justify-content: center; 
  height: 70vh; 
}

.purple-section h1 {
  color: white;
}

.white-text {
  color: white;
  font-size: 4.8rem; 
  font-weight: bold; 
  text-transform: uppercase; 
}

.white-section {
  background-color: white;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 20px;
  text-align: center;
  height: 70vh;
}

.white-section p {
  /*font-weight: bold;*/
  font-style: italic;
  font-size: 2.7rem; 
}
</style>
