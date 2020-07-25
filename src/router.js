import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/components/admin/Login';
import Dashboard from '@/components/admin/Dashboard';
import ProductList from '@/components/admin/ProductList';
import ProductIndex from '@/components/views/ProductIndex';
import ProductInfo from '@/components/views/ProductInfo';
import Store from '@/components/views/Store';

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path:'*',
//       redirect:'/login',
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login,
//     },  
//     {
//       path: '/productIndex',
//       name: 'ProductIndex',
//       component: ProductIndex,
//       // children:[
//       //   {
//       //     path: ':productId',
//       //     name: 'ProductInfo',
//       //     component: ProductInfo,
//       //   }
//       // ]
//     },
//     {
//           path: '/store/:productId',
//           name: 'ProductInfo',
//           component: ProductInfo,
//     },
//     {
//       path: '/admin',
//       name: 'Admin',
//       component: Dashboard,
//       meta: { requiresAuth: true },
//       children:[
//         {
//           path:'productList',
//           name: 'ProductList',
//           component: ProductList,
//           meta: { requiresAuth: true },
//         },
//         {
//           path:'productList',
//           name: 'ProductList',
//           component: ProductList,
//           meta: { requiresAuth: true },
//         },
//         {
//           path:'productList',
//           name: 'ProductList',
//           component: ProductList,
//           meta: { requiresAuth: true },
//         },
//       ]
//     }
//   ]
// })



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
      children:[
     
        {
          path: 'productIndex',
          name: 'ProductIndex',
          component: ProductIndex,
        },
        {
        path: ':productId',
        name: 'ProductInfo',
        component: ProductInfo,
           
        },
        
      ]
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
      ]
    }
  ]
})
