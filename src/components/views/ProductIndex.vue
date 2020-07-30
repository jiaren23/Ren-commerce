<template>
   <div class="mr-4 ml-4">
    <div class="coupon">點我優惠券<br>(要加浮動)</div>
     <Navbar/>
        <div class="row mt-4">
             <loading :active.sync="isLoading" loader="dots"/>
             <img src="https://d2xwhsqvg2p5k2.cloudfront.net/wp-content/uploads/2020/03/slide-011.jpg" alt=""/>
            <div 
                class="col-md-4 mb-4" 
                v-for="item in products" 
                :key="item.id" 
            >
                <div class="card border-0 shadow-sm" >
                    <div 
                        style="height: 520px; background-size: cover; background-position: center ; background: no-repeat"
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
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <i 
                          class="fas fa-spinner fa-spin"
                          v-if="item.id === status.loadingItem"></i>
                        <router-link :to="`/store/productIndex/${item.id}`">查看更多</router-link>
                    </button>
                    <button 
                      type="button" 
                      class="btn btn-outline-danger btn-sm ml-auto"
                      @click="addToCart(item.id)">
                        <i 
                          class="fas fa-spinner fa-spin"
                          v-if="item.id === status.loadingItem"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>

<!-- 
 <div 
      class="my-5 row justify-content-center" 
      v-if="cart.total !== 0">   
      <div class="my-5 row justify-content-center">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr 
              v-for="item in cart.carts" 
              :key="item.id" 
              v-if="cart.carts">
              <td class="align-middle">
                <button 
                  type="button" 
                  class="btn btn-outline-danger btn-sm"
                 >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr 
              v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>

        <div class="input-group mb-3 input-group-sm">
          <input 
            type="text" 
            class="form-control" 
            placeholder="請輸入優惠碼"
            >
          <div class="input-group-append">
            <button 
              class="btn btn-outline-secondary" 
              type="button"
              >
              套用優惠碼
            </button>
          </div>
        </div>

      </div>
    </div> -->

   </div>
</template>

<script>  
import $ from 'jquery';
import Navbar from "../component/NavbarCust";

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

},
  created() {
    this.getProducts();
    this.getCart();
  },

  components:{
    Navbar,
  }
}

</script> 



<style scoped> 
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
  background-color:pink;
  color: #000;
  font-weight: 500;
  z-index: 900;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer; 
}

</style> 