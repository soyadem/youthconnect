<template>
  <form @submit.prevent="handleSubmit">
    <h3>LOGIN</h3>
    <input type="email" placeholder="EMAIL" v-model="email">
    <input type="password" placeholder="PASSWORD" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">LOGIN</button>
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
        router.push('/') // Navigate to the home page after successful login
      }
    }

    return { email, password, handleSubmit, error, isPending }
  }
}
</script>
