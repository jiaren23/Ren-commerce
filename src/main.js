import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next)
  if(to.meta.requiresAuth){
     const api = `${process.env.APIPATH}/api/user/check`;
     axios.post(api).then((response)=>{
        console.log(response.data)
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
