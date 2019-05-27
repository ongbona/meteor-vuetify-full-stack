import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
    { path: '/item', component:() => import('./page/Item.vue') },
    { path: '/customer', component: ()=>import('./page/Customer.vue') },
    { path: '/invoice', component: ()=>import('./page/Invoice.vue') },
    { path: '/report', component: ()=>import('./page/Report.vue') },
    { path: '/report-date', component: ()=>import('./page/Report-Date.vue') },

  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

  export default router;
  