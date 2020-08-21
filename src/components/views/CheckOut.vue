<template>
   <div class="mr-4 ml-4">
                <Navbar/>
                <loading :active.sync="isLoading" loader="dots"/>
                <h1>您的訂單</h1>
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
                </div>


   <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder" > <!-- 清除預設的 submit 行為 -->
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email">
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel"
            v-model="form.user.tel" placeholder="請輸入電話">
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input class="form-control" name="address"
          :class="{'is-invalid': errors.has('address')}"
            id="useraddress" v-model="form.user.address" v-validate="'required'"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger" >送出訂單</button>
        </div>
      </form>
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
                isLoading:false,
                coupon_code:'',
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    },
                    message: '',
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
            createOrder() {
                const vm = this;
                const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                const order = vm.form;
                // vm.isLoading = true;
                this.$validator.validate().then((result) => {
                    if (result) {
                    this.$http.post(url, { data: order }).then((response) => {
                        console.log('訂單已建立', response);
                        if (response.data.success) {
                        vm.$router.push(`/store/${response.data.orderId}`);
                        }
                        vm.isLoading = false;
                    });
                    } else {
                    console.log('欄位不完整');
                    }
                });
            },
            goProductIndex(){
                  this.$router.push(`/store/productIndex`);
            },
            closeModal(){  // 關掉 頁面跳轉過來的 modal 灰畫面
                 $('#cartModal').modal('hide') 
            },
        },
        created(){
            this.getCart()
            this.closeModal()
        },
        components:{
            Navbar
        }
    }

</script>


<style scoped>
h1{
    text-align: center;
}
</style>
