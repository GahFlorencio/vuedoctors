<template>
  <div class="main">
    <Navbar />
    <b-container>
      <h1 class="mb-4">Patients</h1>
      <Table :editable="true" />
    </b-container>
  </div>
</template>

<script>
const Navbar = () =>
  import(/* webpackChunkName: "about" */ "../../components/Navbar");
const Table = () =>
  import(/* webpackChunkName: "about" */ "../../components/DataTable/PatientsTable.vue");

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Table
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  display: block;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-height: 100vh;
}
.login-image {
  background-image: url("https://images.unsplash.com/photo-1592225924255-31de2f8d8abe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd");
  background-size: cover;
  height: 50vh;
}
</style>

