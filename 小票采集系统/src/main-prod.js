import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css' 
// import 'quill/dist/quill.snow.css' 
// import 'quill/dist/quill.bubble.css' 

// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
//将axios包挂载到vue原型对象上  这样每一个组件都可以通过this直接访问到好$http ,从而发起ajax请求
Vue.prototype.$http = axios
// 配置请求的跟路径 看接口文档
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//设置请求拦截器，有token身份的才能获取数据
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config 固定写法
  return config
})

// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.config.productionTip = false
//将富文本编辑器变成全局可用的组件
Vue.use(VueQuillEditor)

Vue.component('tree-table',TreeTable)
//时间过滤器
Vue.filter('dateFormat',function(originVal){
   const dt = new Date(originVal)

   const y = dt.getFullYear()
   //padstart方法  第一个参数表示字符串不足多少位 用第二位补齐
   const m = (dt.getMonth() + 1 + '').padStart(2,'0')
   const d = (dt.getMonth() + '').padStart(2,'0')
   const hh = (dt.getHours() + '').padStart(2,'0')
   const mm = (dt.getMinutes() + '').padStart(2,'0')
   const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//路由挂载到根实例中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
