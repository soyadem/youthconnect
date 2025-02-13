<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="category" class="category-details">

    <div class="category-info">
      <div class="cover">
        <img :src="category.coverUrl">
      </div>
      <h2>{{ category.title }}</h2>
      <p class="username">Created by {{ category.userName }}</p>
      
      <!-- ICON-SEKTION -->
      <div class="category-icon">
        <img v-if="category.iconType" :src="iconMap[category.iconType]" alt="Category Icon">
        <p class="icon-text"> <em>{{ iconDescriptions[category.iconType] }}</em></p>
      </div>
      
      <p class="description">{{ category.description }}</p>
    </div>

    <div class="activity-list">
      <div v-if="!category.activities.length">NO ACTIVITIES HAVE BEEN ADDED TO THIS PLAYLIST YET.</div>
      <div v-for="activity in category.activities" :key="activity.id" class="single-activity">
        <div class="detail">
          <h3>{{ activity.title }}</h3>
          <p>{{ activity.location }}</p>
          <p>{{ activity.time }}</p>
        </div>
      </div>
      <AddActivity :category="category"/>
    </div>

  </div>
</template>

<script>
import AddActivity from '@/components/AddActivity.vue'
import getDocument from '@/composables/getDocument'
import communityIcon from '@/assets/icons/community.png'
import confidenceIcon from '@/assets/icons/confidence.png'
import mentalIcon from '@/assets/icons/mental.png'
import movementIcon from '@/assets/icons/movement.png'

export default {
  props: ['id'],
  components: { AddActivity },
  setup(props) {
    const { error, document: category } = getDocument('category', props.id)

    const iconMap = {
      community: communityIcon,
      confidence: confidenceIcon,
      mental: mentalIcon,
      movement: movementIcon
    }
    const iconDescriptions = {
      community: 'CATEGORY FOSTERS A SENSE OF COMMUNITY AND ENCOURAGES MEANINGFUL CONNECTIONS',
      confidence: 'CATEGORY BOOSTS SELF-CONFIDENCE AND EMPOWERS PERSONAL GROWTH.',
      mental: 'THIS ACTIVITY SUPPORTS MENTAL WELL-BEING AND HELPS BRING PEACE OF MIND',
      movement: 'CATEGORY PROMOTES PHYSICAL MOVEMENT, ENHANCING STRENGTH AND VITALITY.'
    }

    return { error, category, iconMap, iconDescriptions }
  }
}
</script>

<style>
 .category-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.category-info {
  text-align: center;
}
.category-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.category-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.category-icon {
  text-align: center;
  margin-top: 20px;
}

.category-icon img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 10px;
}

.icon-text em{
  font-size: 14px;
  font-weight: bold;
  color: #6853a0 !important;
  font-style: italic;
}
.single-activity {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>