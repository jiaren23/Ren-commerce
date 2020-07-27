<template>
  <div class="mr-4 ml-4">
    <Navbar></Navbar>         <!--  <Alert/>Alert -->
    <img src="../../assets/image/store_banner.jpg" alt=""/>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
     
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
