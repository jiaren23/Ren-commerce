<template>
  <div class="body">
    <Navbar></Navbar>
    <h2 class="keyboard-title"><span class="h2-title">BITPLAY </span>旅行包 , 隨時準備好下一次的旅行  </h2>
    <img class="store_banner" v-bind:src="imgUrl" alt="banner"/>
        <section class="web-work">
      <div class="web-box">
        <a href="http://jiaren.ga/Ren-commerce/#/store/productIndex">
          <div class="web-box-img"><img src="../../assets/image/store-pic1.jpg"></div>
          <div class="box-content">
            <h5>還是用 BITPLAY SNAP! CASE 最順手</h5>
            <p>你有聽過bitplay SNAP! Case與 bitplay HD外接式手機鏡頭嗎？有好 […]...<br><br><span class="arrow">➥&nbsp;&nbsp;</span><span class="see-more">See More</span></p>
          </div>
        </a>
      </div>
      <div class="web-box">
        <a href="http://jiaren.ga/Ren-commerce/#/store/productIndex">
          <div class="web-box-img"><img src="../../assets/image/store-pic2.jpg"></div>
          <div class="box-content">
            <h5>BITPLAY 豐富手機攝影的萬用配件</h5>
            <p>接觸台灣設計品牌bitplay已經快要三年時間，除了和品牌一起成長外，同時也開啟了我對手機...<br><br><span class="arrow">➥&nbsp;&nbsp;</span><span class="see-more">See More</span></p>
          </div>
        </a>
      </div>
      <div class="web-box">
        <a href="http://jiaren.ga/Ren-commerce/#/store/productIndex">
          <div class="web-box-img"><img src="../../assets/image/store-pic3.jpg"></div>
          <div class="box-content">
            <h5>集防護、設計與功能於一身</h5>
            <p>為了要讓行動攝影更為「直覺」，讓你拿出手機就可以瞬間變身生活探險家到處探索。bitplay...<br><br><span class="arrow">➥&nbsp;&nbsp;</span><span class="see-more">See More</span></p>
          </div>
        </a>
      </div>
    </section>
    <Footer/>
  </div>
</template>


<script>  
  import Navbar from "../component/NavbarCust";
  import Footer from "../component/FooterCust";
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
          console.log("頁面長完了")
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
      Footer,
      ProductIndex,
      ProductInfo,
    }
  }
</script>  

<style scoped lang="scss">
@import "../../assets/global.scss";
    img{
      width: 100%;
    }
    .keyboard-title{
      font-size:1rem;
          color: $text-color-sand;
          margin: 20px auto;
          width: 20em;
          border-right: 0.05em solid;
          overflow: hidden;
          font-weight: 900;
          // font-size: 0.8rem;
          white-space: nowrap;
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
            color:$text-color-green;
          }
     }
    .web-work{
      display:block;
      .web-box{  
        margin: 20px auto !important;  
        padding: 20px;
        width: 90%;
        text-align: center;
        border: solid 1px rgb(199, 193, 193);
        margin:20px;
        border-radius: 10px;
        a{
            color:rgb(97, 84, 84) ;
        }
        .box-content{
          padding: 20px 10px;
          p{
            margin-top: 20px;
          }
          .see{
            color: red;
          }
          .arrow{
              animation: arrow 2s infinite;
              color:rgb(116, 108, 108) !important;
          }
          @keyframes arrow{
              0%{
                  opacity: 0.5;
              }
              50%{
                  opacity: 1;
              }
              100%{
                  opacity: 0.5;        
              }
          }  
        }
      }   
    }
@media screen and (min-width: 960px) {
 .body {
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  background-position: center center;
  background-size: cover;
  .keyboard-title {
    color: $text-color-sand;
    margin: 20px auto;
    width: 20em;
    border-right: 0.05em solid;
    overflow: hidden;
    font-size: 2rem;
    font-weight: 900;
    white-space: nowrap;
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
      color:$text-color-green;
    }
  }
  .store_banner{
    width: 80%;
    margin: auto 10% auto 10%;
  }
    .web-work{
        display: flex;
        max-width: 80%;
        margin: auto;
        margin-top: 30px;
        .web-box{    
          width: 500px;
          text-align: center;
          margin: 10px !important;
          border: solid 1px rgb(199, 193, 193);
          border-radius: 5px;
          a{
             color:rgb(97, 84, 84) ;
          }
           .web-box-img{
              margin-bottom: 10px;
              img{
                max-width:100%;
              }
            }
            .box-content{
              padding: 10px;
            }
        }
    }  
  }
}
</style>
