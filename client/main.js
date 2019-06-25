import Vue from 'vue';
import App from './App.vue';
import './main.html';

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
const opts = {}
Vue.use(Vuetify)


import router from './routes'
Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(opts),
    ...App,
  });
});