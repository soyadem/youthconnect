import { ref } from 'vue'
import { projectStorage } from '../firebase/config'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `acts/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const ref = await storageRef.put(file)
            url.value = res.ref.getDownloadURL()
         } catch(err) {
                console.log(err.message)
                error.value = err.message
            }
        }
    return { url, filePath, error, uploadImage}
}

export default useStorage