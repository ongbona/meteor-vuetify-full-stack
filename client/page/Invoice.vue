<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-select
            v-model="customerId"
            :items="customerOpt"
            item-text="name"
            item-value="_id"
            label="Select Customer"
          ></v-select>
        </v-flex>

        <v-flex xs12 md4>
          <v-menu
            v-model="menu2"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" label="Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field v-model="no" label="No"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- End top -->
    <!-- Item -->
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-select
            v-model="itemId"
            :items="itemOpt"
            item-text="name"
            item-value="_id"
            label="Select Item"
          ></v-select>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field type="number" v-model="price" label="Price" disabled></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field type="number" v-model="qty" label="Qty"></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn @click="btnAddItem" color="primary">Add Item</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- End Item -->

    <!-- TableList -->
    <ItemList :items="items" @getForm="getForm"></ItemList>
    <!-- End Talbe -->
    <center>
      <v-btn color="info" @click="btnBuy">Buy</v-btn>
    </center>
  </div>
</template>

<script>
var moment = require('moment');
moment().format();
import ItemList from "../components/ItemListInvoice";
export default {
  components: {
    ItemList
  },
  data() {
    return {
      customerId: "",
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      no: 0,
      customerOpt: [],
      itemId: "",
      items: [],
      itemOpt: [],
      price: "",
      qty: "",
      itemName: ""
    };
  },
  mounted() {
    this.getDateOpts();
  },
  watch: {
    itemId(val) {
      this.itemOpt.forEach(doc => {
        if (doc._id == val) {
          this.itemName = doc.name;
          this.price=doc.price;
        }
      });
    }
  },
  methods: {
    getDateOpts() {
      Meteor.call("findItem", (error, result) => {
        if (!error) {
          this.itemOpt = result;
        }
      });

      Meteor.call("findCustomer", (error, result) => {
        if (!error) {
          this.customerOpt = result;
        }
      });
    },
    btnBuy() {
      let itemDoc=[]
      this.items.forEach(doc => {
        itemDoc.push({
          itemId:doc._id,
          qty:doc.qty,
        })
      });
      let doc = {
        customerId: this.customerId,
        no: this.no,
        date: new Date(this.date),
        items: itemDoc
      };
      console.log(doc);
      Meteor.call('insertInvoice',doc,(error,result)=>{
        if(!error){
          alert(result);
        }
      })
    },
    btnAddItem() {
      this.items.push({
        _id: this.itemId,
        name: this.itemName,
        price: parseFloat(this.price),
        qty: parseFloat(this.qty),
        amount: parseFloat(this.qty) * parseFloat(this.price)
      });
    },
    getForm(val) {
      console.log(val);
    }
  }
};
</script>
