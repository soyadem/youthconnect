import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);

  const uploadImage = async (file) => {
    if (!file) {
      error.value = "No file selected";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      //gemmer selve billedet i skyen (imgbb)
      const res = await fetch("https://api.imgbb.com/1/upload?key=0ba5a1ed1425bce346224daa185fd438", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error("Image upload failed");
      }

      url.value = data.data.url;
      console.log("Image uploaded: ", url.value);

      //gemmer billede-url i firestore
      await projectFirestore.collection("images").add({
        userId: user.value.uid,
        imageUrl: url.value,
        createdAt: new Date()
      });
    } catch (err) {
      console.log("Error uploading file:", err.message);
      error.value = err.message;
    }
  };

  return { uploadImage, url, error };
};

export default useStorage;
