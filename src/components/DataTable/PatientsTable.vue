<template>
  <div>
    <div class="d-flex">
      <b-button
        v-if="this.is_doctor"
        v-b-modal.modal-prevent-closing
        class=" mb-4 mx-2 text-secundary"
        variant="primary"
        @click="editing = false"
        ><b-icon-plus-circle-fill
          class="mr-2"
          scale="1"
        ></b-icon-plus-circle-fill>
        Create
      </b-button>
    </div>
    <b-table small responsive hover :fields="fields" :items="items">
      <template v-slot:cell(Name)="data">
        {{ data.item.user.name }}
      </template>
      <template v-slot:cell(Email)="data">
        {{ data.item.user.email }}
      </template>
    </b-table>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create New Patient"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form>
        <b-form-group id="input-group-2" label="Name" label-for="input-3">
          <b-form-input
            type="text"
            id="input-3"
            v-model="form.name"
            required
            placeholder="Your Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

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
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      rows: 0,
      currentPage: 0,
      fields: ["Name", "Email"],
      items: [],
      form: {
        index: null,
        id: null,
        patient_id: null,
        date: null,
        hour: null,
      },
      options: [
        { item: false, name: "Im a Patient" },
        { item: true, name: "Im a Doctor" },
      ],
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    is_doctor() {
      return this.$store.state.is_doctor;
    },
  },
  watch: {
    token(value) {
      return value;
    },
    is_doctor(value) {
      return value;
    },
  },
  methods: {
    async getDoctors() {
      let { data } = await axios.get("http://157.245.131.54/api/patients");
      this.items = data.patients;
    },
    resetModal() {
      this.form = {
        index: null,
        id: null,
        patient_id: null,
        date: null,
        hour: null,
      };
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler

      this.handleSubmit();
    },
    async handleSubmit() {
      this.$store.dispatch("create_patient", this.form);
      this.getDoctors();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
        this.getDoctors();
      });
    },
  },
  created() {
    this.getDoctors();
  },
};
</script>
