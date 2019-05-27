<template>
  <div>
    <center>
      <h1>Report By Date</h1>
    </center>
    <center>
      <h2>
        From
        <b>{{date.start}}</b> to
        <b>{{date.stop}}</b>
      </h2>
    </center>
    <div>
      <div>
        <table class="table border hover" v-show="invoices.length>0">
          <thead>
            <tr class="tr">
              <th class="th">Date</th>
              <th class="th">No</th>
              <th class="th">Customer</th>
              <th class="th">Item</th>
              <th class="th">Qty</th>
              <th class="th">Price</th>
              <th class="th">Amount</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(doc,i) in invoices">
              <template v-for="(item,itemIndex) in doc.items">
                <tr class="tr" v-if="itemIndex==0" :key="item.itemId">
                  <td class="td">{{doc.date | formatDate}}</td>
                  <td class="td">
                    <router-link
                      :to="{name:'invoiceForm',params:{_id:doc._id, name:'reportByDate'}}"
                    >{{doc.no}}</router-link>
                  </td>
                  <td class="td">{{doc.customerName}}</td>
                  <td class="td">{{item.itemName}}</td>
                  <td class="td">{{item.qty}}</td>
                  <td class="td">{{item.price}}</td>
                  <td class="td">{{item.amount}}</td>
                </tr>
                <tr class="tr" v-else :key="itemIndex">
                  <td class="td" colspan="3"></td>
                  <td class="td">{{item.itemName}}</td>
                  <td class="td">{{item.qty}}</td>
                  <td class="td">{{item.price }}</td>
                  <td class="td">{{item.amount }}$</td>
                </tr>
              </template>
              <tr class="tr" :key="i">
                <td class="td" colspan="6"></td>
                <td class="td">{{doc.total }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <h1 v-show="invoices.length<=0">No data</h1>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  data() {
    return {
      invoices: [],
      date: {
        start: moment("04-01-2019").format("DD-MM-YYYY"),
        stop: moment(Date.now()).format("DD-MM-YYYY")
      }
    };
  },
  filters: {
    formatDate(val) {
      return moment(val).format("DD-MM-YYYY");
    }
    // formatTotal(val) {
    //     return numeral(val).format('$0,0.[000]')
    // },
  },
  mounted() {
    this.getReport();
  },
  methods: {
    getReport() {
      let seletor = {
        date: {
          $gte: moment(this.date.start, "DD-MM-YYYY")
            .startOf("day")
            .toDate(),
          $lte: moment(this.date.stop, "DD-MM-YYYY")
            .endOf("day")
            .toDate()
        }
      };
      Meteor.call("findInvoiceByDate", seletor, (error, result) => {
        if (result) {
          this.invoices = result;
          console.log(result);
        }
      });
    }
  }
};
</script>

<style>
</style>
