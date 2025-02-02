<template>
  <div class="navbar">
    <nav>
        <img src="@/assets/bird.png" alt="">
        <h1><router-link :to="{ name: 'Home' }" class="brand">youthconnect</router-link></h1>
        <div class="links">
            <div v-if="user">
                <router-link class="btn" :to="{name: 'AboutUs'}">ABOUT US</router-link>
                <button class="btn" @click="handleClick">LOGOUT</button>
            </div>
            <div v-else>
            <router-link class="btn" :to="{name: 'AboutUs'}">ABOUT US</router-link>
            <router-link class="btn" :to="{name: 'Signup'}">SIGN UP</router-link>
            <router-link class="btn" :to="{name: 'Login'}">LOGIN</router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { user } = getUser()
        const { logout } = useLogout()
        const router = useRouter()

        const handleClick = async () =>{
            await logout()
            console.log('user logged out')
            router.push({name: 'Login'})
        }
        return {handleClick, user}
    }
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
    border: none; 
    padding: 10px 20px; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: transform 0.5s ease; 
    }
    .btn {
    background-color: #6853a0;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block; 
    transition: transform 0.5s ease;
    }
    .nav-btn:hover,
    .btn:hover {
    background-color: #6853a0;
    transform: scale(1.1);
    }
</style>