<template>
  <div>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="nav-link logo" :to="`/store`">BITPlAY</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> 
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link text-center" :to="`/store/productIndex`"> 逛商品 </router-link> 
        </li>
         <li class="nav-item active">
          <a class="nav-link text-center " @click="openCouponsModal"> 優惠券 </a>  
        </li>
        <li  class="nav-item active">
          <a class="nav-link text-center " @click="openCartModal"> 購物車 </a> 
        </li>
        <li class="nav-item">
         <router-link class="nav-link text-center" :to="`/login`">管理員登入</router-link> 
        </li>
      </ul>
    </div>
  </nav>
  <CartModal></CartModal>
  <CouponsModal/>


    
  </div>
</template>

<script>
import CartModal from "../views/CartModal"
import CouponsModal from "../views/CouponsModal"

import $ from 'jquery';
export default {
  data(){
    return{}
  },
  name: 'Navbar',
  methods:{
    signout(){
          //  依據 API 文件指出 此api 址需傳入 api 不須傳入其他資料 即可登出
        const api = `${process.env.APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then(response => { // 然後 使用 post 傳入用戶資料  vm.user
        console.log(response.data);
        if (response.data.success){ // 這裡寫一個判別式 : 如果登出成功 就將路徑 轉到我們登入頁面
            vm.$router.push('/login')  // 確定登出就將頁面 導回 signin
        }
        });
    },
     openCartModal(){                          // 新增 參數 ( 是否是新的 , item(原有的 item) )
      this.getCart();
      $('#cartModal').modal('show')              // bs 提供給予控制 modal 的 methods
    },
     getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;   // 多加 參數 id 
        vm.isLoading = true;
      this.$http.get(url).then((response) => {
          vm.isLoading = false;
          vm.cart = response.data.data;
          console.log(response.data.data.carts);
      });
      },
      getCoupons() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      vm.isLoading=true;
      this.$http.get(url, vm.tempProduct).then((response) => {
        vm.isLoading=false;
        vm.coupons = response.data.coupons;
        console.log(response);
      });
    },
     openCouponsModal(){                          // 新增 參數 ( 是否是新的 , item(原有的 item) )
      this.getCoupons();
      $('#couponsModal').modal('show')              // bs 提供給予控制 modal 的 methods
    },  
  },
 
  created(){
    this.getCart();
    this.getCoupons();
  },
  components:{
    CartModal,
    CouponsModal,
  }
}
</script>

<style scoped>
 a{   
   color:rgb(116, 108, 108) !important;
 }

 .nav-link{
   cursor: pointer;
 }

 .logo{
   font-weight: 800;
 }

 /* .modal-backdrop.show{
   opacity: 0;
 } */
</style>