<template>
  <div class="main">
    <b-container>
      <b-row cols="1" cols-md="2">
        <b-col class="bg-info d-none d-md-block login-image"></b-col>
        <b-col><LoginForm/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const LoginForm = () =>
  import(/* webpackChunkName: "about" */ "../../components/Login/LoginForm.vue");
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 100vh;
}
.login-image {
  background-image: url("https://images.unsplash.com/photo-1592225924255-31de2f8d8abe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd");
  background-size: cover;
  height: 50vh;
}
</style>
