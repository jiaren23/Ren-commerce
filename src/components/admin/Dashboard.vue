<template>
  <div>
    <Navbar></Navbar>       <!-- Navbar -->
    <Alert/>              <!--  <Alert/>Alert -->
    <div class="container-fluid">
      <div class="row">
        <Sidebar/> <!-- Sidebar -->
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      
        <router-view></router-view>
      
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../component/SidebarAdmin";
import Navbar from "../component/NavbarAdmin";
import Alert from "../component/AlertMessage";

export default {
  components: {
    Sidebar,
    Navbar,
    Alert,

  }
};
</script>