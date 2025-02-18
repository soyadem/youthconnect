import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { projectFirestore, projectAuth, timestamp } from '@/firebase/config'

export const useActivityStore = defineStore('activityStore', () => {
  const registeredActivities = ref([])

  // 🔥 Hent aktiviteter fra Firestore ved opstart
  const fetchActivities = async () => {
    const user = projectAuth.currentUser
    if (!user) return

    const res = await projectFirestore.collection('registeredActivities')
      .where('userId', '==', user.uid)
      .get()

    registeredActivities.value = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  // 🔥 Registrer aktivitet og gem i Firestore
  const registerActivity = async (activity) => {
    const user = projectAuth.currentUser
    if (!user) return

    const newActivity = {
      ...activity,
      userId: user.uid,
      createdAt: timestamp()
    }

    const docRef = await projectFirestore.collection('registeredActivities').add(newActivity)
    registeredActivities.value.push({ id: docRef.id, ...newActivity })
  }

  // Hent aktiviteter ved opstart
  onMounted(fetchActivities)

  return { registeredActivities, registerActivity, fetchActivities }
})
