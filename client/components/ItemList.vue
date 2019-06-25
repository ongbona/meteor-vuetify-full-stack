<template>
  <div>
    <table>
      <thead>
        <tr>
            <th>
                Name
            </th>
            <th>Price</th>
            <th>Cost</th>
            <th>Memo</th>
            <th>QTY</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.cost }}</td>
          <td>{{ item.memo }}</td>
          <td>{{ item.qty }}</td>
          <td>
            <v-btn color="info" flat round @click="btnEdit(item)">Edit</v-btn>
            <v-btn color="red" flat round @click="btnDelete( item._id)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["items"],


  methods: {
    btnEdit(val) {
      this.$emit("getForm", val);
    },
    btnDelete(_id) {
      Meteor.call("removeItem", _id, (error, result) => {
        if (result) {
          this.getItemData();
          alert("Deleted !");
        }
      });
    },
    getItemData() {
      Meteor.call("findItem", (error, result) => {
        if (result) {
          this.items = result;
          console.log(result);
        }
      });
    }
  }
};
</script>
