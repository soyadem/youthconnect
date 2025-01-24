<template>
  <div class="navbar">
    <nav>
        <img src="@/assets/bird.png" alt="">
        <h1><router-link :to="{ name: 'Home' }" class="brand">youthconnect</router-link></h1>
        <div class="links">
            <button class="nav-btn">MY ACTIVITIES</button>
            <button class="nav-btn">ABOUT US</button>
            <router-link class="btn" :to="{name: 'Signup'}">SIGN UP</router-link>
            <router-link class="btn" :to="{name: 'Login'}">LOGIN</router-link>
            <button class="nav-btn">LOGOUT</button>
        </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .navbar {
        padding:16px 10px;
        margin-bottom: 60px;
        background-color: white;
    }
    nav {
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    nav h1 {
        margin-left: 20px;
    }
    nav .links {
        margin-left: auto;
    }
    nav .links a, button{
        margin-left: 16px;
        font-size: 14px;
    }
    nav img {
        max-height: 60px;
    }
    .brand {
    color: #6853a0;
    text-decoration: none;
    }
    .nav-btn {
    background-color: #6853a0;
    color: #ffffff;
    border: none; /* Fjern standardkant */
    padding: 10px 20px; /* Juster polstring efter behov */
    border-radius: 5px; /* Tilføj afrundede hjørner efter behov */
    cursor: pointer; /* Skift musemarkøren til en hånd ved hover */
    transition: transform 0.5s ease; /* Tilføj en transition for transformering */
    }
    .btn {
    background-color: #6853a0;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none; /* Fjern understregning */
    display: inline-block; /* Sørg for, at elementet opfører sig som en knap */
    transition: transform 0.5s ease; /* Tilføj en transition for transformering */
    }
    .nav-btn:hover,
    .btn:hover {
    background-color: #6853a0; /* En mørkere nuance af #6853a0 */
    transform: scale(1.1);
    }



</style>