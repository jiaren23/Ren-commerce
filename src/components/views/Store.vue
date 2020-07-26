<template>
  <div>
         <Navbar></Navbar>         <!--  <Alert/>Alert -->
    <div class="container-fluid">
      <div class="row">
    
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        
        <router-view></router-view>
      
        </main>
      </div>
    </div>
  </div>
</template>


<script>  
  import Navbar from "../component/NavbarCust";

  export default {
    components:{
      Navbar,
    }
  }
</script>  