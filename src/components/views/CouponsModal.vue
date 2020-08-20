<template>
    <div class="mr-4 ml-4">
        <div class="modal fade" id="couponsModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true"> 
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <loading :active.sync="isLoading" loader="dots"/>
                <button type="button" class="close text-right mr-2 mt-1" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button> 
                <h2 class="cart-title text-center ">優惠券</h2>
                <!-- 以下因為同源政策問題 無法用 call API 傳入及時參數 , 因此先註解-->
                <!-- <div 
                    class="my-2 row justify-content-center modal-bgc"
                    v-if=" coupons.code !== 0">   
                    <div class="my-2 row justify-content-center">
                        <table class="table">
                        <thead>
                            <th></th>
                            <th>優惠券</th>
                            <th>優惠碼</th>
                            <th>折扣百分比</th>
                            <th>有效日期</th>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(item, key) in coupons" :key="key">
                                <td class="align-middle">
                                    <button 
                                        type="button" 
                                        class="btn btn-outline-success btn-sm"
                                        v-clipboard:copy="item.code"
                                    >                                 
                                    <i class="fas fa-copy"></i>
                                    </button>
                                </td>
                                <td class="align-middle">
                                    {{ item.title }}
                                </td>
                                <input class="mt-3 " v-model="item.code" type="text">
                              

                                <td class="align-middle">{{ item.percent }}%</td>
                                <td class="align-middle text-right">{{ item.due_date | dateFilter }}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>              
                </div> -->
                <!-- <div 
                    class="my-3 row justify-content-center modal-bgc" 
                    v-if="coupons.code == 0">
                    <h3 class="cart-text">近期無優惠券</h3> 
                 </div> -->
                 <div class="my-2 row justify-content-center modal-bgc">   
                    <div class="my-2 row justify-content-center">
                        <table class="table">
                        <thead>
                            <th></th>
                            <th>優惠券</th>
                            <th>優惠碼</th>
                            <th>折扣</th>
                            <th>有效日期</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="align-middle">
                                    <button 
                                        type="button" 
                                        class="btn btn-outline-success btn-sm"
                                        v-clipboard:copy="mes.fatherDay"
                                    >                                 
                                    <i class="fas fa-copy"></i>
                                    </button>
                                </td>
                                <td class="align-middle">父親節優惠</td>
                                <input class="mt-3 " v-model="mes.fatherDay" type="text">
                                <td class="align-middle">八折</td>
                                <td class="align-middle text-right">2020/08/30</td>
                            </tr>
                        </tbody>
                           <tbody>
                            <tr>
                                <td class="align-middle">
                                    <button 
                                        type="button" 
                                        class="btn btn-outline-success btn-sm"
                                        v-clipboard:copy="mes.fatherDay"
                                    >                                 
                                    <i class="fas fa-copy"></i>
                                    </button>
                                </td>
                                <td class="align-middle">定期活動</td>
                                <input class="mt-3 " v-model="mes.happyDay" type="text">
                                <td class="align-middle">八五折</td>
                                <td class="align-middle text-right">2020/10/01</td>
                            </tr>
                        </tbody>
                           <tbody>
                            <tr>
                                <td class="align-middle">
                                    <button 
                                        type="button" 
                                        class="btn btn-outline-success btn-sm"
                                        v-clipboard:copy="mes.newMember"
                                    >                                 
                                    <i class="fas fa-copy"></i>
                                    </button>
                                </td>
                                <td class="align-middle">新會員首購</td>
                                <input class="mt-3 " v-model="mes.newMember" type="text">
                                <td class="align-middle">九折</td>
                                <td class="align-middle text-right"></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>              
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
                mes:{
                    fatherDay:"888",
                    happyDay:"happy",
                    newMember:"new"

                },
                coupons: {},
                tempCoupon: {
                    title: '',
                    is_enabled: 0,
                    percent: 100,
                    due_date: 0,
                    code: '',
                },
                isLoading:false,
                coupon_code:'',
               
            }
        },
        methods:{ 
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
        },
        created(){
             this.getCoupons();
        },
              
    }

</script>


<style scoped lang="scss">
@import "../../assets/global.scss";
.cart-title{
    color:$text-color-green;
}
.cart-text{
    color:$text-color-sand;
}
        
    .table {
         background-color: #eee !important;
    }
    .row{
        margin-left:0;
        margin-right: 0;
    }
    .input-group{
        width: inherit;
    }
</style>

