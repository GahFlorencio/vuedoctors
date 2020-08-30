<template>
  <div>
    <div class="h1">
      <b-card-text class="mt-2">Create Account</b-card-text>
    </div>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" label="Name" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          v-model="form.name"
          required
          placeholder="Your Name"
        ></b-form-input>
      </b-form-group>
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
      <b-form-radio-group
        v-model="form.selected"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        required
      ></b-form-radio-group>
      <b-form-group
        v-if="form.selected === true"
        id="input-group-2"
        label="CRM"
        label-for="input-3"
      >
        <b-form-input
          v-if="form.selected === true"
          type="text"
          id="input-3"
          maxlength="6"
          v-model="form.crm"
          :required="form.selected === true"
          placeholder="Your CRM"
        ></b-form-input>
      </b-form-group>

      <b-button class="mb-2" type="submit" variant="primary">Create</b-button>
      <div>
        <b-link href="/login">Login</b-link>
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
        name: "",
        crm: "",
        selected: null,
      },
      options: [
        { item: false, name: "Im a Patient" },
        { item: true, name: "Im a Doctor" }
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("register", this.form);
    },
  },
};
</script>
