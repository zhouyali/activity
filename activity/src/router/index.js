import Vue from 'vue';
import Router from 'vue-router';

const List = () => import('@/components/list');
const checkOrder = () => import('@/components/checkOrder');
const SubOrder = () => import('@/components/subOrder');
const MyOrder = () => import('@/components/myOrder');
const ItemDetail = () => import('@/components/itemDetail');
const CheckOrder = ()=> import('@/components/checkOrder');
const ListDetail = ()=> import('@/components/ListDetail');

Vue.use(Router);
const $router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'checkOrder',
            component: checkOrder
        },
        {
            path: '/listDetail',
            name: 'listDetail',
            component: ListDetail
        },        
        {
            path: '/list',
            name: 'list',
            component: List
        },
        {
            path: '/suborder',
            name: 'suborder',
            component: SubOrder
        },
        {
            path: '/myorder',
            name: 'myorder',
            component: MyOrder
        },
        {
            path: '/itemdetail',
            name: 'itemdetail',
            component: ItemDetail
        },
        {
            path: '/checkorder',
            name: 'checkorder',
            component: CheckOrder
        }                             
    ]
})


export default $router;