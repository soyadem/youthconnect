import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { projectFirestore, projectAuth, timestamp } from '@/firebase/config'
import getUser from '@/composables/getUser'  // Tilføj denne linje for at importere getUser


export const useActivityStore = defineStore('activityStore', () => {
  const registeredActivities = ref([])

  const fetchActivities = async () => {
    const { user } = getUser()  // Brug getUser composable til at hente den aktuelle bruger
    if (!user.value) return
  
    const res = await projectFirestore.collection('registeredActivities')
      .where('userId', '==', user.value.uid)  // Filtrer aktiviteter for den aktuelle bruger
      .get()
  
    registeredActivities.value = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  const registerActivity = async (activity, coverUrl) => {
    const user = projectAuth.currentUser
    if (!user) return

    if (!coverUrl) {
      console.error("Fejl: coverUrl er undefined!", activity)
      return
    }

    const newActivity = {
      ...activity,
      coverUrl,
      userId: user.uid,
      createdAt: timestamp()
    }

    const docRef = await projectFirestore.collection('registeredActivities').add(newActivity)
    registeredActivities.value.push({ id: docRef.id, ...newActivity })
  }
  onMounted(fetchActivities)

  return { registeredActivities, registerActivity, fetchActivities }
})
