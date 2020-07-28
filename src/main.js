import Vue from 'vue'
import App from './App'
import './bus'
import currency from './filters/currency'
import date from './filters/data'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(VueAxios, axios)
Vue.config.productionTip = false;
Vue.use(Loading);
Vue.component('Loading',Loading);
Vue.filter('currencyFilter',currency)
Vue.filter('dateFilter',date)

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  // console.log('to',to,'from',from,'next',next)
  if(to.meta.requiresAuth){
     const api = `${process.env.APIPATH}/api/user/check`;
     axios.post(api).then((response)=>{
        // console.log(response.data)
        if(response.data.success){
          next();
        }else{
          next({
            path:'/login'
          })
        }
     })
  }else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App }, // components: {APP:APP}
  template: '<App/>'
})
