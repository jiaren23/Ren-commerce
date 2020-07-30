<template>
  <div class="mr-4 ml-4">
    <Navbar></Navbar>         <!--  <Alert/>Alert -->
    <h2><span class="h2-title">BITPLAY </span>旅人包，隨時準備好下一次的旅行  </h2>
    <img class="store_banner" src="../../assets/image/store_banner.jpg" alt=""/>
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

<style scoped lang="scss">
  .store_banner{
    width: 80%;
    margin: auto 10% auto 10%;
  }

  h2 {
    color: #b6a36e;
    margin: 20px auto;
    width: 20em;
    border-right: 0.05em solid;
    overflow: hidden;
    font-weight: 900;
    white-space: nowrap;
    animation: typing 3s steps(18), insert 1s steps(1) infinite;
    .h2-title{
      color:#486339
    }
  }
  // h2 .h2-title{
  //   color:#486339
  // }

  @keyframes insert {
  50% {
    border-color: transparent;
  }
}
@keyframes typing {
  0% {
    width: 0;
  }
}
</style>
