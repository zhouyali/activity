// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import FastClick from 'fastclick'

// 引入配置项
import './config/rem'
import axios from './config/service'
console.log('环境变量--'+process.env.NODE_ENV)

Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

//兼容安卓登录注册页面底部logo
let clientHeight = document.body.clientHeight
window.onresize = () => {
    // alert(clientHeight)
    let innerClientHeight = document.body.clientHeight
        // alert(innerClientHeight)
    if (innerClientHeight < (clientHeight - 50)) {
        if (document.querySelector(".logo")) {
            document.querySelector(".logo").style.display = 'none';
        }
    } else {
        if (document.querySelector(".logo")) {
            document.querySelector(".logo").style.display = 'block';
        }
    }
}
