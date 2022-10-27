import VueRouter from "vue-router";
import store from "../store/index";

import login from "../components/MyLogin.vue";
import table from "../components/MyTable.vue";
import UserInfo from "../components/UserInfo.vue";
import MySet from "../components/MySet.vue";

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/login',
            component: login,
        },
        {
            name: 'table',
            path: '/table',
            component: table,
        },
        {
            name: 'userInfo',
            path: '/userInfo',
            component: UserInfo
        },
        {
            name: 'set',
            path: '/set',
            component: MySet
        },

    ],
})
// 前置守卫
router.beforeEach((to, from, next) => {
    // console.log(sessionStorage.getItem('code'));
    if (sessionStorage.getItem('code') !== '0' && to.path != "/login") {
        next('/login')
    } else {
        next()
    }
    // console.log(to);
})
// 后置
// router.afterEach((to, from) => {
//     // console.log('to', to)
//     // console.log('from', from)
// })

export default router