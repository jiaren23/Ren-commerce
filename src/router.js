import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/admin/Login';
import Dashboard from '@/components/admin/Dashboard';
import ProductList from '@/components/admin/ProductList';
import OrderList from '@/components/admin/OrderList';
import Coupons from '@/components/admin/Coupons';
import ProductIndex from '@/components/views/ProductIndex';
import ProductInfo from '@/components/views/ProductInfo';
import Store from '@/components/views/Store';
import Cart from '@/components/views/Cart';


Vue.use(Router)


export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },  
    {
      path: '/store',
      name: 'Store',
      component: Store,
    },
     
    {
      path: '/store/productIndex',
      name: 'ProductIndex',
      component: ProductIndex,
    },
    {
      path: '/store/productIndex/:productId',
      name: 'ProductInfo',
      component: ProductInfo,           
    },
    {
      path: '/store/cart',
      name: 'Cart',
      component: Cart,           
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
          path:'orderList',
          name: 'OrderList',
          component: OrderList,
          meta: { requiresAuth: true },
        },
        {
          path:'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ]
    }
  ]
})
