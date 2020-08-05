<template>

  <div class="body">
    <Navbar/>
        <loading :active.sync="isLoading" loader="dots"/>
        <!-- <div class="row mt-4">
            
            <div 
                class="col-md-4 mb-4" >
                <div class="card border-0 shadow-sm" >
                    <div 
                        style="height: 150px; background-size: cover; background-position: center"
                        :style="{backgroundImage:`url(${product.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{product.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{product.title}}</a>
                    </h5>
                    <p class="card-text">{{product.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                    
                        <del class="h6">原價 {{product.origin_price}} 元</del>
                        <div class="h5">現在只要 {{product.price}} 元</div>
                    </div>
                    </div>
                    <select name="" class="form-control mt-3" v-model="product.num">
                      <option :value="num" v-for="num in 10" :key="num">
                        選購 {{num}} {{product.unit}}
                      </option>
                    </select>
                    <div class="card-footer d-flex">
                 
                    <div class="text-muted text-nowrap mr-3">
                      小計 <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addToCart(product.id,product.num)">
                        <i 
                          class="fas fa-spinner fa-spin"
                          v-if="loadingItem"
                         ></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div> -->

<!-- sss -->

             <div class="content">
                <div 
                    class="box box-shadow" >
                        <div 
                            class="box-img"
                            :style="{backgroundImage:`url(${product.imageUrl})`}">
                        </div>
                        <div class="box-content">
                            <span class="box-category badge badge-secondary">{{product.category}}</span>
                            <h5 class="box-title">
                                <a href="#" class="text-dark">{{product.title}}</a>
                            </h5>
                            <p class="card-text">{{product.content}}</p>
                            <div class="box-price">
                                <del>原價 {{product.origin_price}} 元</del>
                                <div>特價 {{product.price}} 元</div>
                            </div>
                            <div>
                              <select v-model="product.num">
                                <option :value="num" v-for="num in 10" :key="num">
                                  選購 {{num}} {{product.unit}}
                                </option>
                              </select>

                            </div>
                              
                         
                        </div>
                       
                        <div class="box-footer">
                            <div>
                              小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button 
                                type="button" 
                                class="box-btn box-btn-addToCart"
                                @click="addToCart(product.id,product.num)">
                                    <i 
                                    class="fas fa-spinner fa-spin"
                                    v-if="loadingItem"></i>
                                    加到購物車
                            </button>
                        </div>
             
                </div>
        
        </div>
<!-- sss -->
      
   </div>
          
</template>


<script>  
import $ from 'jquery';
import Navbar from "../component/NavbarCust";

export default {
  data() {
      return {
        product: [],
        productId:'',
        cart:'',
        isLoading : true,
        
        loadingItem: false,
      
      }
    
  },
  methods : {
       getProduct(){//取得單一產品
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
        vm.isLoading = true;
        // vm.$store.dispatch('updateLoading',true)
        this.$http.get(api).then(function(response) {
          vm.isLoading = false;
        
          if(response.data.success){ 
            vm.product = response.data.product
            // vm.$store.dispatch('updateLoading',false)
          }else{
            console.log(response.data.message)
          }
        });
      },
      addToCart(id,qty=1){
        const vm = this;
        const cart = {
          product_id : id,
          qty
        }
        vm.loadingItem = true;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
           this.$http.post(api,{data:cart}).then(function(response) {
          vm.loadingItem = false;
            vm.cart = response.data.data
            // vm.$store.dispatch('updateLoading',false)
           console.log(response.data.message)
           vm.$router.go(0); // 重新整理頁面 - 解決加入購物車後 modalCart 不能馬上讀到 getCart 的問題   :  原生js寫法 :   location.reload();

        });  
      },
    },
    created() {
      this.productId =  this.$route.params.productId;
      this.getProduct(); 
      // console.log(this.status.loadingItem)    
    },
    components:{
      Navbar,
    }
}
</script>  
 
 <style scoped lang="scss">
*{
    // border:none !important;
    text-decoration: none;
}
.body{
  margin: auto;
  max-width: 1920px;
  width: 100%;
  position: relative;
  img{
    width: 100%;
  }
  .coupon{
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color:rgb(187, 187, 187);
    color: #000;
    font-weight: 500;
    z-index: 900;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer; 
  }
  .content{
    max-width: 960px;
    border:solid 1px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .box{
        width: 300px;
        margin: 8px;
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
            // height: 130px;
            position: relative;
            .box-category{
                border:solid 1px;
            }
            .box-title{
                font-size: 16px;
            }
            // .box-price{
            //     position: absolute;
            //     margin-top: 10px;
            //     right: 0;
            // }
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
                // position: absolute;
                // right: 0;
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
        // background-color: #eee;
       
    }
}


</style> 