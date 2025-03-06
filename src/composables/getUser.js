import { ref, onMounted } from 'vue'
import { projectAuth, projectFirestore } from '@/firebase/config' // ✅ Brug den eksisterende config

const user = ref(null)
const role = ref(null)

const getUser = () => {
  onMounted(async () => {
    // Håndterer ændringer i brugerens autentificering
    projectAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        try {
          // Hent brugerens data fra Firestore
          const userDoc = await projectFirestore.collection('users').doc(firebaseUser.uid).get()
          if (userDoc.exists) {
            role.value = userDoc.data().role // ✅ Hent rollen
          } else {
            // Hvis brugeren ikke findes i Firestore, kan du f.eks. tildele en standardrolle
            role.value = 'student' // Standardrolle
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          role.value = 'student' // Standardrolle hvis der er en fejl
        }
      } else {
        user.value = null
        role.value = null
      }
    })
  })

  return { user, role }
}

export default getUser
