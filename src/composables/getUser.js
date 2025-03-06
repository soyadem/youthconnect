import { ref, onMounted } from 'vue'
import { projectAuth, projectFirestore } from '@/firebase/config'

const user = ref(null)
const role = ref(null)

const getUser = () => {
  onMounted(async () => {
    projectAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        try {
          const userDoc = await projectFirestore.collection('users').doc(firebaseUser.uid).get()
          if (userDoc.exists) {
            role.value = userDoc.data().role
          } else {
            // Hvis dokumentet ikke findes, opretter vi det med standardrolle
            await projectFirestore.collection('users').doc(firebaseUser.uid).set({
              role: 'student', // Standardrolle
            })
            role.value = 'student'
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          role.value = 'student' // Sætter standardrolle, hvis der er en fejl
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
