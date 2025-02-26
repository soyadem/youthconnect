import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)
  const docRef = projectFirestore.collection(collection).doc(id)

  const deleteDoc = async () => {
    isPending.value = true
    error.value = null
    try {
      await docRef.delete()
      isPending.value = false
    } catch (err) {
      console.error("Error deleting document:", err.message)
      error.value = 'Could not delete the document'
      isPending.value = false
    }
  }

  const updateDoc = async (updates) => {
    isPending.value = true
    error.value = null
    try {
      await docRef.update(updates)
      isPending.value = false
    } catch (err) {
      console.error("Error updating document:", err.message)
      error.value = 'Could not update the document'
      isPending.value = false
    }
  }

  return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
