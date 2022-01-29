<template>
  <div>
    <div v-for="(activity, index) in this.selectedTrack.activities" :key="index">
      <!-- < v-if="index !== 0" seta /> -->
      <div class="big-square" @click="openTrackModal(activity, index)">
        {{ activity.type }}
      </div>
    </div>
    <modal name="activity-details" height="auto" :scrollable="true">
      {{ selectedActivity.type }} {{ selectedActivity.description }}
      <b-button variant="danger" v-on:click="$modal.hide('activity-details')">Pronto</b-button>
    </modal>
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
        selectedActivity: undefined,
        selectedActivityIndex: 0,
      };
    },
    async created() {},
    methods: {
      openTrackModal(activity) {
        this.selectedActivity = activity;
      },
    },
  };
</script>

<style scoped></style>
