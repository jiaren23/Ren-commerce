<template>
  <div>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <a href="#">BITPLAY</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> 
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="`/store/productIndex`"> 逛商品 </router-link> 
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" :to="`/store/cart`"> 購物車 </router-link> 
        </li>
        <li class="nav-item">
           <a  class="nav-link" href="https://bitplayinc.com/review-2/?lang=zh-hant">用戶評測 </a> 
        </li>
        <li class="nav-item">
         <router-link class="nav-link" :to="`/login`">管理員登入</router-link>
        </li>
      </ul>
    </div>
  </nav>


    
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style scoped>
 a{   
   color:rgb(116, 108, 108) !important;
 }
</style>