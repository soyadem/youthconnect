<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>CREATE NEW ACTIVITY</h4>
      <input type="text" required placeholder="ACTIVITY TITLE" v-model="title">
      <textarea required placeholder="ACTIVITY DESCRIPTION..." v-model="description"></textarea>
      
      <!-- Upload activity image -->
      <label>UPLOAD ACTIVITY COVER IMAGE</label>
      <input type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div>
      
      <button :disabled="isUploading">{{ isUploading ? 'Uploading...' : 'CREATE' }}</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'

export default {
  setup() {
    const { uploadImage, url, error } = useStorage();
    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isUploading = ref(false);

    const handleSubmit = async () => {
      if (!file.value) {
        fileError.value = "Please select an image file";
        return;
      }
      isUploading.value = true;
      await uploadImage(file.value);
      console.log('Image uploaded, URL:', url.value);
      isUploading.value = false;
    };

    const types = ['image/png', 'image/jpeg'];
    const handleChange = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png or jpg)';
      }
    };
    
    return { title, description, handleSubmit, fileError, handleChange, isUploading };
  }
}
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>
