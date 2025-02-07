<template>
  <form @submit.prevent="handleSubmit">
    <h3>LOGIN</h3>
    <input type="email" placeholder="EMAIL" v-model="email">
    <input type="password" placeholder="PASSWORD" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button class="login-btn" v-if="!isPending">LOGIN</button>
    <button v-if="isPending" disabled>LOGIN</button>
  </form>
</template>

<script>
// using @ means start at the project src root
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import router for navigation

export default {
  setup() {
    const { error, login, isPending } = useLogin()
    const router = useRouter() // Get router instance

    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log('user logged in')
        router.push('/')
      }
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>

<style scoped>
.login-btn {
    background-color: green;
    margin-top: -5px;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block; 
    transition: transform 0.5s ease;
}
.login-btn:hover {
    background-color: green;
    transform: scale(1.1);
    }
</style>
