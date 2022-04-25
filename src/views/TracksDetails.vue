<template>
  <div>
    <h2 class="title">Trilha {{ selectedTrack.name }}</h2>
    <div>
      <b-card class="mb-2">
        <div class="text-right position-absolute top-0 end-0 icon-top-size">
        <b-icon @click="editTrack()" icon="pencil-fill" class="rigth-icon"/>
        <b-icon @click="openDialog()" icon="download" class="ml-2"/>
        <b-icon icon="download" class="litte ml-2"/>
        </div>
        <b-row no-gutters class="centering-all">
          <b-col md="6">
            <div class="track-info">
              <div class="inner-div">
            <ul>
              <li><b>Ano: </b>{{ selectedTrack.turma }}</li>
              <li><b>Segmento: </b>{{ selectedTrack.segmento }}</li>
              <li><b>Disciplina: </b>{{ selectedTrack.disciplina }}</li>
              <li><b>Metodologia: </b>{{ selectedTrack.methodology }}</li>
              <li><b>Recurso: </b>{{ selectedTrack.resource }}</li>
              <li><b>Objetivo: </b>{{ selectedTrack.objectives }}</li>
              <li><b>Habilidades: </b>{{ selectedTrack.associatedHabilities.toString() }}</li>
              <li><b>Observação: </b>{{ selectedTrack.observation }}</li>
            </ul>
            </div>
          </b-col>
          <b-col md="6" align-self="center">
            <div class="left-line">
            <div
              v-for="(activity, index) in selectedTrack.activities"
              :key="index"
              class="parent"
            >
              <img
                src="../assets/leftArrow.png"
                v-if="index !== 0 && index % 2"
                class="arrow-l"
              />
              <img
                src="../assets/rightArrow.png"
                v-if="index !== 0 && index % 2 === 0"
                class="arrow-r"
              />
              <div class="container mt-5" @click="openTrackModal(activity)">
                <div class="center">
                  {{ activity.steps }}
                </div>
              </div>
            </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <b-modal
      id="activity-details"
      height="auto"
      :scrollable="true"
      ok-only
      footerClass="border-top-0"
      :centered="true"
      :title="
        selectedActivity.steps.replace(
          selectedActivity.steps.charAt(0),
          selectedActivity.steps.charAt(0).toUpperCase()
        )
      "
    >
      {{ selectedActivity.description }}
    </b-modal>
    <v-dialog />
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
        steps: "",
        description: "",
      },
      selectedActivityIndex: 0,
    };
  },
  async created() {
    console.log(this.selectedTrack);
  },
  methods: {
    openTrackModal(activity) {
      this.selectedActivity = activity;
      this.$bvModal.show("activity-details");
    },
    editTrack() {
    this.$emit('editTrack');
    },
    openDialog() {
    this.$emit('openDialog');
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Summit&display=swap");

.container {
  border-radius: 30px;
  height: 130px;
  width: 220px;
  position: relative;
  border: 5px solid rgb(2, 2, 34);
  cursor: pointer;
}
.litte {
  color: white !important;
  font-size: 1px !important;
  cursor: initial !important;
}
.track-info {
  margin: 4px ;
  text-align: center;
  left: 10px;
}
.inner-div {
  display: inline-block;
  margin: 0 auto;
  padding: 3px;
}
.icon-top-size {
  font-size: 27px;
  height: 27px;
  width: 100px;
  cursor: pointer;
}
.centering-all {
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
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
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
  color: #16acf1;
}
.arrow-l {
  height: 120px;
  margin: -50px, auto;
  position: absolute;
  left: 140px;
  bottom: 75px;
}
.arrow-r {
  height: 120px;
  margin: -50px, auto;
  position: absolute;
  left: 445px;
  bottom: 75px;
}
.parent {
  position: relative;
}
.left-line {
  border-left: 1px solid black;
}

/* List */
ul {
  counter-reset: index;
  padding: 0;
  max-width: 300px;
}

/* List element */
li {
  counter-increment: index;
  display: flex;
  align-items: center;
  padding: 12px 0;
  box-sizing: border-box;
}

/* Element counter */
li::before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
  min-width: 50px;
  padding-right: 12px;
  font-variant-caps: small-caps;
  align-self: flex-start;
  background-image: linear-gradient(to bottom, aquamarine, rgb(13, 53, 138));
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Element separation */
li + li {
  border-top: 1px solid grey;
}

@use postcss-preset-env {
  stage: 0;
  autoprefixer: {
    grid: true;
  }
  browsers: last 2 versions;
}
</style>
