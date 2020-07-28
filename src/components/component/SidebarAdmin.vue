<template>
  <div>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">前台</h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
             <router-link 
              to="/store/productIndex"
              class="nav-link">
             首頁
            </router-link>
          </li>
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">後台</h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link 
              to="/admin/productList"
              class="nav-link">
             產品列表
            </router-link>
          </li>
           <li class="nav-item">
              <router-link 
                to="/admin/orderList"
                class="nav-link">
              訂單列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                to="/admin/coupons"
                class="nav-link">
              優惠券
              </router-link>
            </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
