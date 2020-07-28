<template>

  <div>
    <Navbar/>
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
                         ></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>

      
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
        status:{
          isLoading : '',
        }
      }
    
  },
  methods : {
       getProduct(){//取得單一產品
        const vm = this;
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
        // vm.status.isLoading = true;
        // vm.$store.dispatch('updateLoading',true)
        this.$http.get(api).then(function(response) {
          // vm.status.isLoading = ;
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
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
           this.$http.post(api,{data:cart}).then(function(response) {
          // vm.status.isLoading = ;
            vm.cart = response.data.data
            // vm.$store.dispatch('updateLoading',false)
           console.log(response.data.message)
        });  
      },
    },
    created() {
      this.productId =  this.$route.params.productId;
      this.getProduct();     
    },
    components:{
      Navbar,
    }
}
</script>  