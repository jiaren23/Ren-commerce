<template>
   <div>

        <div class="row mt-4">
             <loading :active.sync="isLoading" loader="dots"/>
            <div 
                class="col-md-4 mb-4" 
                v-for="item in products" 
                :key="item.id" >
                <div class="card border-0 shadow-sm" >
                    <div 
                        style="height: 500px; background-size: cover; background-position: center ; background: no-repeat"
                        :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price}} 元</del>
                        <div class="h5">現在只要 {{item.price}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button 
                      type="button" 
                      class="btn btn-outline-secondary btn-sm"
                      ><!--@click="goProductInfo(item.id)"-->
                        <i class="fas fa-spinner fa-spin"></i>
                        <router-link :to="`/store/${item.id}`">查看更多</router-link>
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

export default {
  data() {
      return {
        products: [],
        product : {}, 
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
    goProductInfo(id){
       const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;   // 多加 參數 id 
        //vm.status.loadingItem = id;               // 將原本的 vm.isLoading = true;   ** 改為由 id 決定是哪個 查看更多被觸發
        this.$http.get(url).then((response) => {
          vm.product = response.data.product;
          // vm.product.num = 1 ;
          // $('#productModal').modal('show');       // 啟用 modal
          console.log(response);
          // vm.status.loadingItem = '';             // 將原本的 vm.isLoading = false;   ** 改成 如果讀取完要改成 空的
           vm.$router.push(`/store/${response.data.product.id}`);
     });
    },
  },
  created() {
    this.getProducts();
  
  },
}
</script>  