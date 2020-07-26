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
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <i class="fas fa-spinner fa-spin"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                        <i class="fas fa-spinner fa-spin"></i>
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
      }
  },
  methods : {
    // getProduct(){//取得單一產品
    //   const vm = this;
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
    //   // vm.$store.dispatch('updateLoading',true)
    //   this.$http.get(api).then(function(response) {
    //     if(response.data.success){ 
    //       vm.product = response.data.product
    //       // vm.$store.dispatch('updateLoading',false)
    //     }else{
    //       console.log(response.data.message)
    //     }
    //   });
    // },
getProduct(){//取得單一產品
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      // vm.$store.dispatch('updateLoading',true)
      this.$http.get(api).then(function(response) {
        if(response.data.success){ 
          vm.product = response.data.product
          // vm.$store.dispatch('updateLoading',false)
        }else{
          console.log(response.data.message)
        }
      });
    },
  },
  created() {
     this.productId =  this.$route.params.productId;
     this.getProduct();
     console.log(this.getProduct())
  },
  components:{
    Navbar,
  }
}
</script>  