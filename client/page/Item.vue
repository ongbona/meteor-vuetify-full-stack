<template>
  <div>
    <form>
      <v-text-field v-model="form.name" :counter="10" label="Name" required></v-text-field>
      <v-text-field type="number" v-model="form.price" :counter="10" label="Price" required></v-text-field>
      <v-text-field type="number" v-model="form.cost" :counter="10" label="Cost" required></v-text-field>
      <v-text-field v-model="form.memo" :counter="10" label="Memo" required></v-text-field>
      <v-text-field type="number" v-model="form.qty" :counter="10" label="Qty" required></v-text-field>

      <v-btn color="primary" @click="submit">{{formType}}</v-btn>
      <v-btn color="primary" @click="clear">clear</v-btn>
    </form>

    <ItemList :items="items" @getForm="getForm"></ItemList>
  </div>
</template>

<script>
import ItemList from "../components/ItemList";
export default {
  components: {
    ItemList
  },
  data() {
    return {
      items: [],
      formType: "Add",
      form: {
          _id:'',
        name: "",
        price: null,
        cost: null,
        memo: "",
        qty: null
      }
    };
  },
  mounted() {
    this.getItemData();
  },
  methods: {
    getForm(val) {
      this.formType = "Update";
      this.form._id = val.item._id
      this.form.name = val.item.name
      this.form.price =  val.item.price;
      this.form.cost =  val.item.cost;
      this.form.memo =  val.item.memo
      this.form.qty =  val.item.qty
    },

    getItemData() {
      Meteor.call("findItem", (error, result) => {
        if (result) {
          this.items = result;
        }
      });
    },
    submit() {
      if (this.formType == "Add") {
        let doc = {
          name: this.form.name,
          price: parseFloat(this.form.price),
          cost: parseFloat(this.form.cost),
          memo: this.form.memo,
          qty: parseFloat(this.form.qty)
        };
        console.log(doc)
        Meteor.call("insertItem", doc, (error, result) => {
          if (result) {
            this.getItemData();
            this.clear();
            alert("Submited");
          }
        });
      } else {
        //   update
        let doc = {
          _id: this.form._id,
          name: this.form.name,
          price: parseFloat(this.form.price),
          cost: parseFloat(this.form.cost),
          memo: this.form.memo,
          qty: parseFloat(this.form.qty)
        };
        Meteor.call("updateItem", doc, (error, result) => {
          if (result) {
            this.getItemData();
            this.clear();
            this.formType='Add'
            alert("Updated!");
          }
        });
      }
    },
    clear() {
      this.form.name = "";
      this.form.price = null;
      this.form.cost = null;
      this.form.memo = "";
      this.form.qty = null;
    }
  }
};
</script>
