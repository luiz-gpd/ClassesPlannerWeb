<template>
  <div class="centered-container">
    <div class="content">
    <h1 class="title">Trilha</h1>
    <!-- <row> -->
    <button @click="goToPlan()" >Voltar</button>
    <!-- </row> -->
  </div>
  </div>
</template>

<script>
import { router } from "../_helper/router";
export default {
  name: "PlanCreator",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: "",
      }
    };
  },
  created () {
      console.log('ele chegou aqui')
  },
  methods: {
    goToPlan() {
      router.push("/plan");
    }
  }
};
</script>

<style >
.centered-container {
  border-radius: 20px;
  padding: 50px;
  }
  .content {

    width: 100%;
    z-index: 1;
  }
.title {
  color: #0AE0FA; 
  }
</style>
