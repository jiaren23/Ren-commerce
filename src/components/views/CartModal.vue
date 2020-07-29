<template>
    <div class="mr-4 ml-4">
        <div class="modal fade" id="cartModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true"> 
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <loading :active.sync="isLoading" loader="dots"/>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h1>購物車</h1>
                <div 
                    class="my-5 row justify-content-center modal-bgc" 
                    v-if="cart.total !== 0">    <!-- 這裡判斷如果都沒加進購物車 則 此表格隱藏 -->
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
                                    @click="removeOneCart(item.id)"
                                >
                                <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                            <td class="align-middle">
                                {{ item.product.title }}
                                <div 
                                    class="text-success" 
                                    v-if="item.coupon"> 已套用優惠券 </div>
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
                                v-model="coupon_code"
                            >
                            <div class="input-group-append">
                                <button 
                                    class="btn btn-outline-secondary" 
                                    type="button"
                                    @click="addCouponCode"
                                >
                                套用優惠碼
                                </button>
                            </div>
                        </div>
                    </div>
                    <button><router-link :to="`/store/checkOut`">下一步</router-link></button>                           
                </div>
            </div>
            </div>    
        </div>
    </div>
</template>

<script>  
// import Navbar from "../component/NavbarCust";
import $ from 'jquery';

    export default {
        data(){
            return{
                cart:{},
                isLoading:false,
                coupon_code:'',
            }
        },
        methods:{
            getCart(){
                const vm = this;
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;   // 多加 參數 id 
                 vm.isLoading = true;
                this.$http.get(url).then((response) => {
                    vm.isLoading = false;
                    vm.cart = response.data.data;
                    console.log(response.data.data.carts);
                });
            },  
            removeOneCart(id){
                const vm = this;
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;   // 多加 參數 id 
                vm.isLoading = true;
                this.$http.delete(url).then((response) => {
                    console.log(response.data.message);
                    vm.isLoading = false;
                    vm.getCart();
                });
            },
            addCouponCode(){
                const vm = this;
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;   // 多加 參數 id 
                const coupon = {
                    code : vm.coupon_code,
                };
                  vm.isLoading = true;
                this.$http.post(url,{data:coupon}).then((response) => {
                    // console.log(response.data.message);
                    vm.isLoading = false;
                    vm.getCart();
                    $('#cartModal').modal('hide') 
                    console.log('折扣馬',response.data.message);

                });

            },
        },
        created(){
            this.getCart()
        },
    }

</script>


<style>
.table {
   background-color: #eee !important;
}

</style>

