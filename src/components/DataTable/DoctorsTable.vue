<template>
  <div>
    <b-table small responsive hover :fields="fields" :items="items">
      <template v-slot:cell(Name)="data">
        {{ data.item.user.name }}
      </template>
      <template v-slot:cell(CRM)="data">
        {{ data.item.crm }}
      </template>
    </b-table>
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
      fields: ["Name", "CRM"],
      items: [],
    };
  },
  methods: {
    async getDoctors() {
      let { data } = await axios.get("http://157.245.131.54/api/doctors");
      this.items = data.doctors;
    },
  },
  created() {
    this.getDoctors();
  },
};
</script>
