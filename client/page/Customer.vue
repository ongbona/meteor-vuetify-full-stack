<template>
  <div>
    <form>
      <v-text-field v-model="form.name" :counter="10" label="Name" required></v-text-field>
      <v-text-field  v-model="form.age" :counter="10" label="Age" required></v-text-field>
      <v-text-field  v-model="form.gender" :counter="10" label="Gender" required></v-text-field>
      <v-text-field v-model="form.address" :counter="10" label="Address" required></v-text-field>
      <v-text-field v-model="form.phone" :counter="10" label="Phone" required></v-text-field>

      <v-btn color="primary" @click="submit">{{formType}}</v-btn>
      <v-btn color="primary" @click="clear">clear</v-btn>
    </form>

    <CustomerList :items="items" @getForm="getForm"></CustomerList>
  </div>
</template>

<script>
import CustomerList from "../components/CustomerList";
export default {
  components: {
    CustomerList
  },
  data() {
    return {
      items: [],
      formType: "Add",
      form: {
          _id:'',
        name: "",
        age: null,
        gender: null,
        address: "",
        phone: null
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
      this.form.age =  val.item.age;
      this.form.gender =  val.item.gender;
      this.form.address =  val.item.address
      this.form.phone =  val.item.phone
    },

    getItemData() {
      Meteor.call("findCustomer", (error, result) => {
        if (result) {
          this.items = result;
        }
      });
    },
    submit() {
      if (this.formType == "Add") {
        let doc = {
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender,
          address: this.form.address,
          phone: this.form.phone,         
        };
        Meteor.call("insertCustomer", doc, (error, result) => {
          if (result) {
            this.getItemData();
            this.clear();
            alert("Submited");
          }
        });
      } else {
        //   update
        let doc = {
            _id:this.form._id,
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender,
          address: this.form.address,
          phone: this.form.phone,         
        };
        // console.log(doc)

        Meteor.call("updateCustomer", doc, (error, result) => {
          if (result) {
            this.getItemData();
            this.clear();
            this.formType='Add'
            alert("Updated!");
          }
         else  console.log(error);
        });
      }
    },
    clear() {
      this.form.name = "";
      this.form.age = null;
      this.form.gender = null;
      this.form.address = "";
      this.form.phone= null;
    }
  }
};
</script>
