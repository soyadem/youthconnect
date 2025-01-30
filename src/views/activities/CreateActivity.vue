<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Activity</h4>
        <input type="text" required placeholder="Activity title" v-model="title">
        <textarea required placeholder="Create description..." v-model="description"></textarea>
        <label>Upload activity cover image</label>
        <input type="file">
        <div class="error"></div>
        <button>Create</button>
        
    </form>
</template>

<script>
import {ref} from 'vue'
export default {
    setup() {
        const title = ref('')
        const description = ref('')

        const handleSubmit = () =>{
            console.log(title.value, description.value)
        }
        return {title, description, handleSubmit}
    }
    
}
</script>

<style>
    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
        font-size: 12px;
        display:block;
        margin-top:30px;
    }
    button {
        margin-top: 20px;
    }
</style>