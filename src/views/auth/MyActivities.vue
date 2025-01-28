<template>
    <div>
        <Button @click="showActivities"><Myactivities/></Button>
        <div>
            <h2>My Activities</h2>
            <ul>
                <li v-for="activity in activities" :key="activity">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
      data() {
        return {
          activitiesVisible: false,
          activities: ["Biograftur", "Fodbold", "bowling"],
            };
    },
        methods:{
            showActivities(){
                this.activitiesVisible = !this.activitiesVisible;
            },
        },
    };


</script>

<style scoped>
.activities {
margin-top: 20px;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
background-color: aliceblue;
}

.activities h2 {
margin-bottom: 10px;
}

.activities ul {
list-style-type: none;
}
</style>