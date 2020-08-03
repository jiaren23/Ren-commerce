<template>

  <div class="mr-4 ml-4">
    <Navbar/>
        <loading :active.sync="isLoading" loader="dots"/>
        <div class="row mt-4">
             <!-- <loading :active.sync="isLoading" loader="dots"/> -->
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
                        <!-- <div class="h5">2,800 元</div> -->
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
        </div>

      
   </div>




           <!-- <div class="content">
                <div 
                    class="box box-shadow" 
                    v-for="item in products" 
                    :key="item.id">
                        <div 
                            class="box-img"
                            :style="{backgroundImage:`url(${item.imageUrl})`}">
                        </div>
                        <div class="box-content">
                            <span class="box-category">{{item.category}}</span>
                            <h5 class="card-title">
                                <a href="#" class="text-dark">{{item.title}}</a>
                            </h5>
                            <p class="card-text">{{item.content}}</p>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <del class="h6">原價 {{item.origin_price}} 元</del>
                                <div class="h5">現在只要 {{item.price}} 元</div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button type="button" class="box-btn">
                                <i 
                                class="fas fa-spinner fa-spin"
                                v-if="item.id === status.loadingItem"></i>
                                <router-link :to="`/store/productIndex/${item.id}`">查看更多</router-link>
                            </button>
                            <button 
                                type="button" 
                                class="box-btn"
                                @click="addToCart(item.id)">
                                    <i 
                                    class="fas fa-spinner fa-spin"
                                    v-if="item.id === status.loadingItem"></i>
                                    加到購物車
                            </button>
                        </div>
             
                </div>
        
        </div> -->
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