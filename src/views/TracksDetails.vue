<template>
  <div>
    <h2 class="title">Trilha {{selectedTrack.name}}</h2>
    <div v-for="(activity, index) in selectedTrack.activities" :key="index">
      <img src="../assets/leftArrow.png" v-if="index !== 0 && index%2" class="arrow-l"/>
      <img src="../assets/rightArrow.png" v-if="index !== 0 && index%2 === 0" class="arrow-r"/>
      <div class="container mt-5" @click="openTrackModal(activity)">
      <div class="center">
        {{ activity.type }}
      </div>
      </div>
    </div>
    <b-modal id="activity-details" height="auto" :scrollable="true" ok-only footerClass="border-top-0" :centered="true"
    :title="selectedActivity.type.replace(selectedActivity.type.charAt(0), selectedActivity.type.charAt(0).toUpperCase())">
      {{ selectedActivity.description }}
    </b-modal>
  </div>
</template>

<script>
//   import config from '../helpers/generalConfig';

  export default {
    props: {
      loggedUser: undefined,
      selectedTrack: undefined,
    },
    data() {
      return {
        loading: false,
        selectedActivity: {
          type: '',
          description: '',
        },
        selectedActivityIndex: 0,
      };
    },
    async created() {
      console.log(this.selectedTrack.activities);
      console.log(this.loggedUser);
    },
    methods: {
      openTrackModal(activity) {
        console.log('entrou aqui')
        this.selectedActivity = activity;
        this.$bvModal.show('activity-details')
      },
    },
  };
</script>

<style scoped>
.container {
  border-radius: 30px;
  height: 130px;
  width: 220px;
  position: relative;
  border: 5px solid rgb(2, 2, 34);
  cursor: pointer;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.title {
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 50px;
  }
  .arrow-l {
    height: 120px;
    margin: -50px, auto;
    position: absolute;
  }
  .arrow-r {
    height: 120px;
    margin: -50px, auto;
    position: absolute;
  }
</style>
