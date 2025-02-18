import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged(_user => {
  console.log('User state change. Current user is:', _user)
  user.value = _user
  if (_user) {
    store.fetchActivities()  // Opdater aktiviteter når en bruger logger ind
  } else {
    store.registeredActivities.value = []  // Ryd registrerede aktiviteter ved logout
  }
})

const getUser = () => {
  return { user } 
}

export default getUser