import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/admin/Login';
import Dashboard from '@/components/admin/Dashboard';
import ProductList from '@/components/admin/ProductList';
import ProductIndex from '@/components/views/ProductIndex';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/login',
    },
    {
      path: '/',
      name: 'ProductIndex',
      component: ProductIndex,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Dashboard,
      meta: { requiresAuth: true },
      children:[
        {
          path:'productList',
          name: 'ProductList',
          component: ProductList,
          meta: { requiresAuth: true },
        },
        {
          path:'productList',
          name: 'ProductList',
          component: ProductList,
          meta: { requiresAuth: true },
        },
        {
          path:'productList',
          name: 'ProductList',
          component: ProductList,
          meta: { requiresAuth: true },
        },
      ]
    }
  ]
})
