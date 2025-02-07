<template>
    <form @submit.prevent="handleSubmit">
    <h3>SIGN UP</h3>
    <input type="text" placeholder="DISPLAY NAME" v-model="displayName">
    <input type="text" placeholder="SCHOOL" v-model="school">
    <input type="email" placeholder="EMAIL" v-model="email">
    <input type="password" placeholder="PASSWORD" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button class="btn" v-if="!isPending">SIGN UP</button>
    <button v-if="isPending" disabled>LOGIN</button>
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

<style scoped>
    .btn {
    margin-top: -5px;
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
