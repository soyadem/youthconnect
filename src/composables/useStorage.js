import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    try {
      // FormData til at uploade fil til ImgBB
      const formData = new FormData();
      formData.append("image", file);

      // Din ImgBB API-nøgle
      const API_KEY = "0ba5a1ed1425bce346224daa185fd438";
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Upload failed");
      }

      // Gem URL'en fra ImgBB
      url.value = data.data.url;
      filePath.value = data.data.delete_url; // Gem evt. delete URL, hvis du vil slette billeder senere

    } catch (err) {
      console.error("Upload error:", err.message);
      error.value = err.message;
    }
  };

  return { uploadImage, url, filePath, error };
};

export default useStorage;
