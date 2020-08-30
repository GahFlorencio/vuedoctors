<template>
  <div>
    <div class="h1 mb-4">
      <b-icon-calendar3-fill></b-icon-calendar3-fill>
      Laradoctors
      <b-card-text class="mt-4">Login</b-card-text>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button class="mb-2" type="submit" variant="primary">Login</b-button>
      <div>
        <b-link href="/account/create">Create account</b-link>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
