<template>
<div>
      <Navbar/>
      <loading :active.sync="isLoading" loader="dots"/>
        <div 
        class="my-5 row justify-content-center" 
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
        </div>
</div>
</template>


<script>  
import Navbar from "../component/NavbarCust";
import $ from 'jquery';

    export default {
        data(){
            return{
                cart:{},
                status:{
                    loadingItem:'',
                },
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
        },
        created(){
            this.getCart()
        },
        components:{
            Navbar,
        }
    }

</script>

