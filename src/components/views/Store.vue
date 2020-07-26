<template>
  <div>
    <Navbar></Navbar>         <!--  <Alert/>Alert -->
         
    
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        
       <!-- <router-view></router-view> -->
       <ProductIndex/>
       <!-- <ProductInfo/> -->
        </main>
      </div>
    </div>
  </div>
</template>


<script>  
  import Navbar from "../component/NavbarCust";
  import ProductIndex from "./ProductIndex";
  import ProductInfo from "./ProductInfo";

  export default {
    components:{
      Navbar,
      ProductIndex,
      ProductInfo,
    }
  }
</script>  
