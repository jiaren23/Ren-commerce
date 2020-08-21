<template> 
     <div>
        <Navbar/>
        <h1>管理員登入</h1>
        <form @submit.prevent="sigin">      
            <div class="login">
                <label for="inputEmail">帳號</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    placeholder="Email address" 
                    required autofocus
                    v-model="user.username">
            </div>
            <div>
                <label for="inputPassword">密碼</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    placeholder="Password" 
                    required
                    v-model="user.password">
            </div>
            <button 
                class="btn"
                type="submit"
                @click="sigin"
                @keydown.enter="sigin">登入</button>
        </form>
    </div>
</template>   

<script>
     import Navbar from "../component/NavbarCust";
     export default{
        name:"Login",
        data() {
            return{
                user:{
                    username:'',
                    password:'',
                }
            }
        },
        methods:{
            sigin(){
                const api = `${process.env.APIPATH}/admin/signin`;
                const vm = this;
                this.$http.post(api,vm.user).then((response)=>{
                    console.log(response.data);
                    if(response.data.success){
                        vm.$router.push('/admin/productList')
                    }
                })

            }
        },
        components:{
            Navbar
        }
    }
</script>

<style scoped lang="scss">   
@import "../../assets/global";
    *{
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    h1{
        text-align: center;
    }
    .login{
        margin: 10px 0;
    }
    form{
        width: 300px;
        margin: auto;
        margin-top: 30px;
        display: block;
        position: relative;
        label{
            width: 40%;
        }
        input{
            padding: 2px;
        }
       .btn{
            margin-top: 5px;
            padding: 5px;
            position: absolute;
            right: 0;
            border-radius:$btn-radius;
            border: solid $btn-border; 
            background-color: #fff;
        }
    }
</style>

