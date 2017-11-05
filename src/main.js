import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Vuerify from 'vuerify'
import MintUI from 'mint-ui'
import './config/rem'
import axios from 'axios'
import MyMethods from './config/methods'
import Api from './config/apiconfig'

Vue.use(Vuerify)
Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.$md = MyMethods

window.$Api = Api

//微信初始化
// $.ajax({
//   url: '/xzdd/getUrlConfig',
//   type: 'GET',
//   dataType: 'json',
//   data: {
//       url: window.location.href.substring(0, window.location.href.lastIndexOf('#'))
//   },
//   success: function (data) {
//     if (data && data.code == 0) {
//         MyMethods.WXConfigInit(data.data);
//     } else {
//         console.log(data.msg);
//     }
//   }
// });
// axios({
//   url: '/xzdd/getUrlConfig',
//   method: 'get',
//   dataType: 'json',
//   params: {
//     url: window.location.href.substring(0, window.location.href.lastIndexOf('#'))
//   }
// }).then(function(data) {
//     if (data && !data.code) {
//       MyMethods.WXConfigInit(data.data);
//     } else {
//       console.log(data.msg);
//     }
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
