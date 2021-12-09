<template>
  <div class="centered-container">
    <div class="content">
    <h1 class="title">Olá Professor</h1>
    <h1 class="sub-title">Plano de Aulas</h1>
    <div class="etapa" >
      <div class="center">
        <h1 class="etapa-button">Etapa 1</h1>
      </div>
      <md-radio-group ng-model="selected" class="center-radio">
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao1">
          Vídeo
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao2">
          Apresentação
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao3">
          Prova
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao4">
          Outro
        </md-radio-button>
      </md-radio-group>
    </div>
    <div class="etapa">
      <div class="center">
        <h1 class="etapa-button">Etapa 2</h1>
      </div>
      <md-radio-group ng-model="selected" class="center-radio">
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao1">
          Vídeo
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao2">
          Apresentação
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao3">
          Prova
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao4">
          Outro
        </md-radio-button>
      </md-radio-group>
    </div>
    <div class="etapa">
      <div class="center">
        <h1 class="etapa-button">Etapa 3</h1>
      </div>
      <md-radio-group ng-model="selected" class="center-radio">
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao1">
          Vídeo
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao2">
          Apresentação
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao3">
          Prova
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao4">
          Outro
        </md-radio-button>
      </md-radio-group>
    </div>
    <div class="etapa">
      <div class="center">
        <h1 class="etapa-button">Etapa 4</h1>
      </div>
      <md-radio-group ng-model="selected" class="center-radio">
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao1">
          Vídeo
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao2">
          Apresentação
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao3">
          Prova
        </md-radio-button>
        <md-radio-button class ="radio" ng-repeat="item in items" ng-value="item.value" aria-label="opcao4">
          Outro
        </md-radio-button>
      </md-radio-group>
    </div>
    </div>
    <div class="background" />
  </div>
</template>

<script>
// import { router } from "../_helper/router";
export default {
  name: "PlanCreator",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  
};
</script>

<style >
.etapa{
  margin-bottom: 15px;
  }
.radio{
  color: #b5c207; 
  }
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
  .sub-title {
  color: #b5c207; 
  align-items: left;
  justify-content: left;
  text-align: left ;
  font-size: 24px;
  }
  .center{
        display: flex;
    align-items: center;
    justify-content: center;
    }
     .center-radio{
        display: flex;
    align-items: center;
    justify-content: space-evenly;
    }
  .etapa-button{
        display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
  justify-content: center;
    color: #000F63;
    width: fit-content;
    padding: 15px;
    border-radius: 15px;
    background-color: white;
    }
  .p {
  color: #0AE0FA; 
  }
.background {
    background-color: #000F63 !important;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
</style>
