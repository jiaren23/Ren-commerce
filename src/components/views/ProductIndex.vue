<template>
   <div class="body">
     <Navbar/>
     <!-- <CouponsModal/> -->
     <loading :active.sync="isLoading" loader="dots"/>
     <img src="https://d2xwhsqvg2p5k2.cloudfront.net/wp-content/uploads/2020/03/slide-011.jpg" alt=""/>
        <div class="content">
                <div 
                    class="box box-shadow" 
                    v-for="item in products" 
                    :key="item.id">
                        <div 
                            class="box-img"
                            :style="{backgroundImage:`url(${item.imageUrl})`}">
                        </div>
                        <div class="box-content">
                            <span class="box-category badge badge-secondary">{{item.category}}</span>
                            <h5 class="box-title">
                                <a href="#" class="text-dark">{{item.title}}</a>
                            </h5>
                            <div class="box-price">
                                <del>原價 {{item.origin_price}} 元</del>
                                <div>特價 {{item.price}} 元</div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="button" class="box-btn">
                                <i 
                                class="fas fa-spinner fa-spin"
                                v-if="item.id === status.loadingItem"></i>
                                <router-link class="ro-btn" :to="`/store/productIndex/${item.id}`">查看更多</router-link>
                            </button>
                            <button 
                                type="button" 
                                class="box-btn box-btn-addToCart"
                                @click="addToCart(item.id)">
                                    <i 
                                    class="fas fa-spinner fa-spin"
                                    v-if="item.id === status.loadingItem"></i>
                                    加到購物車
                            </button>
                        </div>
                </div>
        </div>
        <Footer/>
   </div>
</template>

<script>  
import $ from 'jquery';
import Navbar from "../component/NavbarCust";
import Footer from "../component/FooterCust";
import CouponsModal from "./CouponsModal"

export default {
  data() {
      return {
        products: [],
        status:{
          loadingItem:'',
        },
        cart:{},
        isLoading: false,
      }
  },
  methods : {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    addToCart(id,qty=1){
       const vm = this;
       const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;   // 多加 參數 id 
       let cart = {
         product_id : id,
         qty : qty,
        }   
      this.$http.post(url,{data:cart}).then((response) => {
          // vm.product = response.data.product;
          // vm.product.num = 1 ;
          console.log(response.data);
          vm.status.loadingItem = '';             // 將原本的 vm.isLoading = false;   ** 改成 如果讀取完要改成 空的
          vm.getCart();       
          vm.$router.go(0); // 重新整理頁面 - 解決加入購物車後 modalCart 不能馬上讀到 getCart 的問題   :  原生js寫法 :   location.reload();
    });
   
  },
    getCart(){
       const vm = this;
       const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;   // 多加 參數 id 
       vm.isLoading = true;
       this.$http.get(url).then((response) => {
          vm.cart = response.data.data;
          vm.isLoading = false;
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
  created() {
    this.getProducts();
    this.getCart();
    this.getCoupons();
  },

  components:{
    Navbar,
    Footer,
    CouponsModal,
  }
}
</script> 

<style scoped lang="scss">
*{
    border:none !important;
    // text-decoration: none;
}
.body{
  margin: auto;
  max-width: 1920px;
  width: 100%;
  position: relative;
  img{
    width: 100%;
  }
  .content{
    max-width: 960px;
    border:solid 1px;
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .box{
        width: 300px;
        margin: 8px 8px 20px 8px; 
        padding: 8px;
        border:solid 2px;
        .box-img{
            width: 100%;
            height: 300px;
            border:solid 1px;
            background-position: center;
            background-size: cover;
        }
        .box-content{
            border:solid 1px;
            // padding: 30px;
            height: 130px;
            position: relative;
            .box-category{
                border:solid 1px;
            }
            .box-title{
                font-size: 16px;
            }
            .box-price{
                position: absolute;
                margin-top: 10px;
                right: 0;
            }
        }
        .box-footer{
            border: solid 1px rgb(201, 140, 140);
            position: relative;
            .box-btn{
                text-decoration: none;
                border-radius: 10px;
                background-color: #fff;
            }
            .box-btn-addToCart{
                position: absolute;
                right: 0;
            }
            a{
                color:none !important;
            }
            .ro-btn,button{
                color:saddlebrown;
            }
        }
    }
    .box-shadow {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 300px;
    }

    .box-shadow:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

  }
} 

@media screen and (max-width: 960px){
    .box{
        margin:auto !important;
        margin-bottom: 30px !important;
       
    }
}
</style> 




