<template>
  <div>
    <v-app>
      <div>
       
          <router-link to="/item">Item</router-link>
          <router-link to="/customer">Customer</router-link>
          <router-link to="/invoice">Invoice</router-link>
          <router-link to="/report">Report</router-link>
          <router-link to="/report-date">Report By Date</router-link>
       
        <router-view></router-view> 
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>