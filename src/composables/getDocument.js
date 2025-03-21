import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
  const document = ref(null)
  const error = ref(null)

  const docRef = projectFirestore.collection(collection).doc(id)

  const unsub = docRef.onSnapshot(doc => {
    if (doc.exists) {
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'Document not found'
    }
  }, err => {
    console.log(err.message)
    error.value = 'Could not fetch the data'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document }
}

export default getDocument
