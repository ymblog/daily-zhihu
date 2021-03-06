import Vue from 'vue';
import Router from 'vue-router';
import Util from '@/assets/js/util';
import common from '@/assets/js/common';
import store from '@/store/index.js';//使用vuex 不使用请删除掉
//组件统一懒加载引入
const index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index');
const article = r => require.ensure([], () => r(require('@/pages/article/article')), 'article');
Vue.use(Util);
Vue.use(Router);
/* 需要验证登录的加上
meta:{
    requiresAuth:true
}
*/
const router = new Router({
    //设置列表位置
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (to.meta.keepAlive) {
                to.meta.savedPosition = document.body.scrollTop;
            }
        }
    },
    routes: [
        {
            path: '/',
            component: index
        },
         {
            name:'article',
            path: '/article/:id',
            component: article,
            meta:{
                keepAlive:true
            }
        }
    ]
});
//登录验证 包括存储用户信息 不使用请删除掉
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (common.cookie.get('token')) {
            if(store.state.token){
                next();
            }else{
                store.commit('SET_NAME',common.cookie.get('name'));
                store.commit('SET_TOKEN',common.cookie.get('token'));
                store.commit('SET_ROLE',common.cookie.get('role'));
                next();
            }    
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});
export default router;

