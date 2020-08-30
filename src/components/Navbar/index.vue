<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-brand href="/">
      <b-icon-calendar3-fill></b-icon-calendar3-fill>
      Laradoctors</b-navbar-brand
    >
    <div>
      <b-navbar-toggle class="border-0 border-none" target="my-sidebar">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="x"></b-icon>
          <b-icon v-else icon="list"></b-icon>
        </template>
      </b-navbar-toggle>
    </div>
    <b-sidebar id="my-sidebar" title="Menu" shadow>
      <div class="">
        <b-list-group>
          <b-list-group-item class="d-flex align-items-center flex-row">
            <div class="btn w-100 text-left p-0" @click="handleGoToPerfil()">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">{{user_name}}</span>
            </div>
            <div class="btn text-danger " @click="handleLogout()">
              <b-icon-box-arrow-right></b-icon-box-arrow-right>
            </div>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-center flex-row">
            <div class="btn w-100 text-left p-0" @click="handleGoToCalendar()">
              <div class="d-flex">
                <div class="h-10 mr-4"><b-icon icon="calendar3"></b-icon></div>
                <span class="mr-auto">My Calendar</span>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item
            v-if="!is_doctor"
            class="d-flex align-items-center flex-row"
          >
            <div class="btn w-100 text-left p-0" @click="handleGoToDoctors()">
              <div class="d-flex">
                <div class="h-10 mr-4"><b-icon icon="people"></b-icon></div>
                <span class="mr-auto">Doctors</span>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item
            v-if="is_doctor"
            class="d-flex align-items-center flex-row"
          >
            <div class="btn w-100 text-left p-0" @click="handleGoToPatients()">
              <div class="d-flex">
                <div class="h-10 mr-4"><b-icon icon="people"></b-icon></div>
                <span class="mr-auto">Patients</span>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    is_doctor() {
      return this.$store.state.is_doctor;
    },
    user_name() {
      return this.$store.state.user_name;
    },
  },
  watch: {
    is_doctor(value) {
      return value;
    },
    user_name(value) {
      return value;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout", this.form);
      this.$router.push("/login");
    },
    handleGoToPerfil() {
      this.$router.push("/");
    },
    handleGoToDoctors() {
      this.$router.push("/doctors");
    },
    handleGoToPatients() {
      this.$router.push("/patients");
    },
    handleGoToCalendar() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
<style scoped></style>
