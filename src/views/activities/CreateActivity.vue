<template>
    <form @submit.prevent="handleSubmit">
        <h4>CREATE NEW</h4>
        <input type="text" required placeholder="ACTIVITY TITLE" v-model="title">
        <textarea required placeholder="CREATE DESCRIPTION..." v-model="description"></textarea>
        <label>UPLOAD ACTIVITY COVER IMAGE</label>
        <input type="file">
        <div class="error"></div>
        <button>CREATE</button>
        
    </form>
</template>

<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const title = ref('')
        const description = ref('')

        const handleSubmit = async () =>{
            if( file.value ){
                await uploadImage(file.value)
                console.log('Image uploaded, url: ', url.value)
            }
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