# Vue.js 模擬電商網站 

## 訪客頁面 url : <br>
`/store`   商城首頁  <br>
`/store/productIndex`  產品頁面  <br>
`/store/productIndex/:productId`  單一產品頁面 <br>
`/store/checkOut`  訂單處理頁面 <br>
`/store/:orderId`  付款狀態頁面 <br>
`/login`  管理員登入頁面 <br>

## 管理員頁面 url : <br>
*注意: CORS 問題 將導致直接進入此網址會出錯 - Google Chrome 80 版本後 預設封鎖第三方 Cookie (目前解決辦法 : chrome://flags/ >> search:sameSite >> SameSite by default cookies & Cookies without SameSite must be secure 改為 Disabled)* <br>
`/admin/productList`   產品列表頁面  <br>
`/admin/orderList`  訂單列表頁面  <br>
`/admin/coupons`  優惠券 <br>

<hr>

## 待優化
* 寫 filter - wrap.js 讓 productInfo 的產品規格在街道純文字後根據 " - " 符號 做換行
* productIndex 分類
* coupons - modal 化  ,  並有跑馬燈在 store 打優惠碼資訊
* Vue-Cli2.0 >> Vue-Cli3.0

<hr>

## Branch

* `All folders` : `branch : master` <br>
`git push` 


*   `dist folder` : `branch : gh-pages` <br>
`git push -f https://github.com/jiaren23/Ren-commerce.git master:gh-pages`



