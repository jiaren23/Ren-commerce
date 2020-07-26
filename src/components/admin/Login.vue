<template> 
     <div>
        <form @submit.prevent="sigin">
            <h1>Please sign in</h1>
            <div>
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
                type="submit"
                @click="sigin"
                @keydown.enter="sigin">登入</button>
        </form>
    </div>
</template>   

<script>
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
    div{
        margin: 10px 0;
    }
    form{
        width: 300px;
        margin: auto;
        display: block;
        position: relative;
        label{
            width: 40%;
        }
        input{
            padding: 2px;
        }
        button{
            padding: 5px;
            position: absolute;
            right: 0;
            border-radius:$btn-radius;
            border: solid $btn-border; 
            background-color: #fff;
        }
    }
</style>

