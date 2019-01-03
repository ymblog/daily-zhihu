/**
 * 工具函数注册
 * @author lk 2018-11-08
 */ 
import axios from 'axios';
import Vue from 'vue';
import store from '@/store/index.js';
import common from '@/assets/js/common';
import toastComponent from '@/components/toast'
//axios
const service = axios.create({
    baseURL: 'https://zhihu-agent.herokuapp.com/get?api=', // api 的 base_url
    timeout: 5000 // 请求超时时间   
});
// response 拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        Vue.prototype.$toast();
    }
)
export default {
    install(Vue) {
        //ajax
        Vue.prototype.$ajax = service;
        //弹窗
        let instance = '',
            timer = '';
        Vue.prototype.$toast = (content='系统繁忙,请重试',time=2000) => {
            timer && clearTimeout(timer);
            if(instance == ''){
                let toastConstructor  = Vue.extend(
                    toastComponent
                );
                //生成组件
                instance = new toastConstructor({
                    data:{
                        content:content,
                        isShowToast:true
                    }
                });
                document.body.appendChild(instance.$mount().$el);
            }else{
                instance.isShowToast = true;
                instance.content = content;
            }
            setTimeout(() => { // 延迟2秒后移除该提示
                instance.isShowToast = false;
            },time);
        }
    }
}