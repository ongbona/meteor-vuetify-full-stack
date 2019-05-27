<template>
  <div>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.age }}</td>
        <td>{{ props.item.gender }}</td>
        <td>{{ props.item.address}}</td>
        <td>{{ props.item.phone }}</td>
        <td>
          <v-btn color="info" flat round @click="btnEdit( props)">Edit</v-btn>
          <v-btn color="red" flat round @click="btnDelete( props.item._id)">Delete</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Age",
          align: "left",
          sortable: true,
          value: "age"
        },
        {
          text: "Gender",
          align: "left",
          sortable: true,
          value: "gender"
        },
        {
          text: "Address",
          align: "left",
          sortable: true,
          value: "address"
        },
        {
          text: "Phone",
          align: "left",
          sortable: true,
          value: "phone"
        }
      ]
    };
  },

  methods: {
    btnEdit(val) {
      this.$emit("getForm", val);
    },
    btnDelete(_id) {
      Meteor.call("removeCustomer", _id, (error, result) => {
        if (result) {
          this.getItemData();
          alert("Deleted !");
        }
      });
    },
    getItemData() {
      Meteor.call("findCustomer", (error, result) => {
        if (result) {
          this.items = result;
          console.log(result);
        }
      });
    }
  }
};
</script>
