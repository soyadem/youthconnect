import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPending = ref(false)

  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      await projectFirestore.collection(collection).add(doc)
      isPending.value = false
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }
  const updateDoc = async (docId, updates) => {
    error.value = null
    isPending.value = true

    try {
      const docRef = projectFirestore.collection(collection).doc(docId)
      const res = await docRef.update(updates)
      isPending.value = false
      return res
    } catch (err) {
      console.error(err.message)
      error.value = 'Could not update the document'
      isPending.value = false
    }
  }

  return { error, addDoc, isPending, updateDoc }

}

export default useCollection