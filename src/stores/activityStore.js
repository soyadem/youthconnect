import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    registeredActivities: []
  }),
  actions: {
    registerActivity(activity) {
      if (!this.registeredActivities.some(a => a.id === activity.id)) {
        this.registeredActivities.push(activity)
      }
    }
  }
})
