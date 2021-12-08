<template>
  <div>
   <h1>HOME</h1>
   <h1>Login</h1>
   <input/>  
   <h1>Senha</h1> 
   <input/>  
  </div>
</template>

<script>
export default {
  name: "Home",
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

<style scoped>
div {
    background-color: #0AE0FA;
    padding: 70px;
    border-radius: 20px;
}
h1{
    color: #000F63;
}
input {
    height: 35px;
    border-radius: 20px;
    color: #000F63;
    border-color: #000F63;
    }

</style>