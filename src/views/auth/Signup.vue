<template>
    <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="text" placeholder="School" v-model="school">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Log in</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'

export default {
    setup(){
        const {error, signup, isPending} = useSignup()
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const school = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value, school.value)
            if(!error.value){
                console.log('user signed up')
            }
        }

        return {email, password, displayName, school, isPending, error, handleSubmit}
    }
}
</script>

<style

</style>
