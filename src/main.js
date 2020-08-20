import Vue from 'vue'
import App from './App'
import './bus'
import currency from './filters/currency'
import date from './filters/date'
import wrap from './filters/wrap'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import VueClipboard from 'vue-clipboard2';


Vue.use(VueAxios, axios)
Vue.config.productionTip = false;
Vue.use(Loading);
Vue.component('Loading',Loading);
Vue.filter('currencyFilter',currency)
Vue.filter('dateFilter',date)
Vue.filter('wrapStr',wrap)
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)

VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);

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
