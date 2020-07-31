<template>
  <div class="mr-4 ml-4">
    <Navbar></Navbar>         <!--  <Alert/>Alert -->
    <loading :active.sync="isLoading" loader="dots"/>
    <h2><span class="h2-title">BITPLAY </span>旅人包，隨時準備好下一次的旅行  </h2>
    <img class="store_banner" v-bind:src="imgUrl" alt="banner"/>
    <!-- <img class="store_banner" src="../../assets/image/store_banner.jpg" alt=""/> -->
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
  import img from "../../assets/image/store_banner.jpg";

  export default {
    data(){
      return{
          imgUrl : img,
          isLoading : true,
     }
    },
    methods:{
      loading(){
        const vm = this;
        window.onload = function(){
          console.log("頁面長玩了")
           vm.isLoading = false;
        }    
      },
    },
    created(){
      this.isLoading = true;
      this.loading();
    },
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
    // animation:name duration | timing-function | delay | iteration-count | direction | fill-mode | play-state;
    // steps(x)  影格製造打字效果
    animation: typing 3s steps(18), insert 1s steps(1) infinite;
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
    .h2-title{
      color:#486339
    }
  }

</style>
