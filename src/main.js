import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

import {validateTokenUrls} from './assets/js/url'


import { 
  Tabbar,
  TabbarItem,
  Search,
  Toast,
  NavBar,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Form,
  Field,
  Button,
  Swipe, 
  SwipeItem,
  Checkbox,
   CheckboxGroup,
   Grid, 
   GridItem,
   Icon,
   RadioGroup,
    Radio,
    SwipeCell,
    ActionSheet ,
    Tab, 
    Tabs,
    AddressEdit ,
    SubmitBar,
    Popup ,
    AddressList ,
    Card ,
 } from 'vant';
 
 import { Tag } from 'vant';
 import { Uploader } from 'vant';

Vue.use(Uploader);

 Vue.use(Tag);
Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Toast)
  .use(NavBar)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Grid)
  .use(GridItem)
  .use(Icon)
  .use(RadioGroup)
  .use(SwipeCell)
  .use(Radio)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(AddressEdit)
  .use(SubmitBar)
  .use(Popup )
  .use(AddressList )
  .use(Card  )


//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

//axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么

  // 

  //发送请求之前，显示加载中
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  });

  // 

  let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

  let token = sessionStorage.getItem('token');
  // 

  if (config.method === 'post') {

    //进行post请求参数序列化
    config.data = config.data || {};
    let dataString = '';
    for (let key in config.data) {
      dataString += `${key}=${config.data[key]}&`
    }

    config.data = dataString + 'appkey=' + appkey;

    //找到则需要验证token
    if (validateTokenUrls.indexOf(config.url) > -1) {
      config.data += `&tokenString=${token}`;
    }

  } else if (config.method === 'get') {
    config.params = config.params || {};
    config.params.appkey = appkey;

    //找到则需要验证token
    if (validateTokenUrls.indexOf(config.url) > -1) {
      config.params.tokenString = token;
    }
  }


  return config;

}, error => {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  //服务器响应数据后，关闭加载提示
  Toast.clear();
  return response;
}, error => {
  // 对响应错误做点什么
  Toast.clear();
  return Promise.reject(error);
});

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
