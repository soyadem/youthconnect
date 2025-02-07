<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>CREATE A NEW CATEGORY</h4>
      <input
        type="text"
        required
        placeholder="CATEGORY TITLE"
        v-model="title"
      />
      <textarea
        required
        placeholder="CATEGORY DESCRIPTION..."
        v-model="description"
      ></textarea>
      <!-- upload playlist image -->
      <label>UPLOAD CATEGORY IMAGE COVER</label>
      <input type="file" @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button class="btn" v-if="!isPending">CREATE</button>
      <button v-else disabled>SAVING...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("category");
    const { user } = getUser()

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
  if (!file.value) {
    fileError.value = "Please select an image file";
    return;
  }

  isPending.value = true;
  await uploadImage(file.value); // Upload til ImgBB

  console.log("Uploaded image URL:", url.value); // Debugging

  await addDoc({
    title: title.value,
    description: description.value,
    userId: user.value.uid,
    userName: user.value.displayName,
    coverUrl: url.value, // Her gemmes billedets URL korrekt
    filePath: filePath.value, // (Valgfrit) Sletnings-URL fra ImgBB
    activities: [],
    createdAt: timestamp(),
  });

  isPending.value = false;

  if (!error.value) {
    console.log("Category added");
  }
};
    // allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
    };
  },
};
</script>

<style scoped>
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


