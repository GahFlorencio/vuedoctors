<template>
  <div class="main">
    <b-container>
      <b-row cols="1" cols-md="2">
        <b-col class="bg-info d-none d-md-block login-image"></b-col>
        <b-col><CreateForm/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const CreateForm = () =>
  import(/* webpackChunkName: "about" */ "../../components/Login/CreateForm.vue");
export default {
  name: "Create Account",
  components: {
    CreateForm
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
  background-image: url("https://images.unsplash.com/photo-1488998527040-85054a85150e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-size: cover;
  height: 50vh;
}
</style>
