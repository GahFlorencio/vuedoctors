<template>
  <div>
    <div class="d-flex flex-column">
      <b-form-datepicker
        class="h-2 p-0 mb-4 w-100 d-flex align-items-center flex-row"
        v-model="date"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="pt-br"
      ></b-form-datepicker>
      <b-button
        class="mb-4 mx-2 text-light"
        variant="secondary"
        @click="getSchedulesDate()"
        ><b-icon-search></b-icon-search>
      </b-button>
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
    <b-table
      small
      responsive
      hover
      :fields="fields"
      :items="items"
      :tbody-tr-class="rowClass"
    >
      <template v-slot:cell(Actions)="data">
        <b-button
          v-b-modal.modal-prevent-closing
          @click="selectData(data)"
          v-if="data.item.finished == false && data.item.canceled == false"
          class="p-0 mr-2 text-primary"
          variant="secundary"
          ><b-icon-pencil-square scale="1"></b-icon-pencil-square>
        </b-button>
        <b-button
          v-if="data.item.finished == false && data.item.canceled == false"
          class="p-0 mr-2 text-success"
          variant="secundary"
          @click="handleFinish(data.item.id)"
          ><b-icon-check-circle-fill scale="1"></b-icon-check-circle-fill
        ></b-button>
        <b-button
          v-if="data.item.finished == false && data.item.canceled == false"
          class="p-0 mr-2 text-danger"
          variant="secundary"
          @click="handleDelete(data.item.id)"
          ><b-icon-trash scale="1"></b-icon-trash
        ></b-button>
      </template>
      <template v-slot:cell(Name)="data">
        {{
          data.item.doctor
            ? data.item.doctor.user.name
            : data.item.medical_patient.user.name
        }}
      </template>
    </b-table>


    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Schedule"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group v-show="false" label="ID" label-for="id_patient">
          <b-form-input v-model="form.id" id="id_patient"></b-form-input>
        </b-form-group>
        <b-form-group label="Patient" label-for="patient">
          <b-form-select v-model="form.patient_id">
            <b-form-select-option :value="null"
              >Please select an option</b-form-select-option
            >
            <b-form-select-option
              v-for="item in options"
              :key="item.id"
              :value="item.id"
              >{{ item.user.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Date" label-for="date">
          <b-form-datepicker
            v-model="form.date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="pt-br"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group label="Hour" label-for="hour">
          <b-form-timepicker
            v-model="form.hour"
            locale="pt-br"
          ></b-form-timepicker>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      date: null,
      rows: 0,
      currentPage: 0,
      fields: [],
      items: [],
      options: [],
      editing: false,
      form: {
        index: null,
        id: null,
        patient_id: null,
        date: null,
        hour: null,
      },
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
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.finished === true) return "table-success";
      if (item.canceled === true) return "table-danger";
    },

    selectData(data) {
      this.form = {
        index: data.index,
        id: data.item.id,
        patient_id: data.item.medical_patient_id,
        date: data.item.date,
        hour: data.item.hour,
      };
      this.editing = true;
    },

    resetModal() {
      this.form = {
        index: null,
        id: null,
        patient_id: null,
        date: null,
        hour: null,
      };
      this.editing = false;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      if (this.editing) {
        this.handleSubmit();
      } else {
        this.handleCreate();
      }
    },
    async handleSubmit() {
      if (!!this.form.date && !!this.form.hour && !!this.form.patient_id) {
        await axios
          .put("http://157.245.131.54/api/schedules/" + this.form.id, {
            date: this.form.date,
            hour: this.form.hour,
            patient_id: this.form.patient_id,
          })
          .then(() => {
            this.getSchedules();
            this.$nextTick(() => {
              this.$bvModal.hide("modal-prevent-closing");
            });
          });
      }
    },
    async handleCreate() {
      if (!!this.form.date && !!this.form.hour && !!this.form.patient_id) {
        await axios
          .post("http://157.245.131.54/api/schedules/" + this.token, {
            date: this.form.date,
            hour: this.form.hour,
            patient_id: this.form.patient_id,
          })
          .then(() => {
            this.getSchedules();
            this.$nextTick(() => {
              this.$bvModal.hide("modal-prevent-closing");
            });
          });
      }
    },
    async handleDelete(id) {
      await axios
        .delete("http://157.245.131.54/api/schedules/" + id)
        .then(() => {
         if (new Date(this.date).toLocaleDateString() !== new Date().toLocaleDateString() ) {
            this.getSchedulesDate();
          } else {
            this.getSchedules();
          }
        });
    },
    async handleFinish(id) {
      await axios
        .put("http://157.245.131.54/api/schedules/finish/" + id)
        .then(() => {
          console.log(this.date, new Date());

          if (new Date(this.date).toLocaleDateString() !== new Date().toLocaleDateString() ) {
            this.getSchedulesDate();
          } else {
            this.getSchedules();
          }
        });
    },
    async getOptions() {
      let { data } = await axios.get("http://157.245.131.54/api/patients");
      this.options = data.patients;
    },
    async getSchedules() {
      let { data } = await axios.get(
        "http://157.245.131.54/api/schedules/" + this.token
      );
      this.items = data.data;
      this.currentPage = data.current_page;
      this.rows = data.total;
    },
    async getSchedulesDate() {
      let { data } = await axios.get(
        "http://157.245.131.54/api/schedules/" +
          this.token +
          "/" +
          new Date(this.date).toISOString().split("T")[0]
      );
      this.items = data.data;
      this.currentPage = data.current_page;
      this.rows = data.total;
    },
  },
  created() {
    this.getOptions();
    this.getSchedules();
    this.fields =
      this.is_doctor === true
        ? [
            "Actions",
            "Name",
            { key: "date", label: "Date" },
            { key: "hour", label: "Hour" },
          ]
        : [
            "Name",
            { key: "date", label: "Date" },
            { key: "hour", label: "Hour" },
          ];
    this.date = new Date();
  },
};
</script>
