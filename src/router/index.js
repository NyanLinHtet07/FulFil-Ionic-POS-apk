import { createRouter, createWebHistory } from '@ionic/vue-router';
//import HomePage from '../views/HomePage.vue';
import Detail from '../pages/HistoryDetail.vue';
import Login from '../pages/Auth/LoginAdmin.vue';


const routes = [
{
  path:'/',
  redirect:'/login',
},
{
  path:'/login',
  component: Login,
},
{
  path:'/select-sales',
  component: () => import('@/pages/Sale/CartChoose.vue'),
},


// {
//   path:'/',
//   component: HomePage,
//   children : [
  // {
  //     path:'',
  //     redirect:'/sales',
  // },

  {
    path:'/test',
    component:() => import('@/pages/testComponent.vue'),
  },
 
  {
    path:'/home',
    //component: IndexPage,
    component: () => import('@/pages/HomePage.vue'),
  },

  {
    path:'/wholesales',
    component:() => import('@/pages/Sale/WholeSale/SalePage.vue'),
  },

  
  {
    path:'/cart',
    component:() => import('@/pages/Sale/WholeSale/CartAdd.vue'),
  },

  {
    path:'/retails',
    component:() => import('@/pages/Sale/RetailSale/SalePage.vue'),
  },
  {
    path:'/retails-cart',
    component:() => import('@/pages/Sale/RetailSale/CartAdd.vue'),
  },
  {
    path:'/customers',
    component:() => import('@/pages/CustomerPage.vue'), 
  },

  {
    path:'/customers/invoices/:id',
    name: 'customer.detail',
    component:() => import('@/pages/CustomerInv.vue'),
  },

  {
    path:'/invoice-detail/:id',
    name: 'invoice.detail',
    component:() => import('@/pages/Sale/InvoiceDetail.vue'),
  },

  {
    path:'/history',
    component:() => import('@/pages/HistoryPage.vue'),
  },

  {
    path:'/history/:id',
    component: Detail,
    //component:() => import('../pages/HistoryDetail.vue'),
  },

  //for map 
  {
    path:'/map',
    component:() => import('@/pages/Map/mapComponent.vue'),
  },

  {
    path:'/map/assign_way',
    component:() => import('@/pages/Map/AssignWay.vue'),
  },

  {
    path:'/assign/:id',
    component:() => import('@/pages/Map/mapMark.vue'),
  },

  //for shop
  {
    path:'/shop',
    component:() => import('@/pages/Map/ShopMap.vue'),
  },
  {
    path:'/shops/detail/:id',
    component:() => import('@/pages/Map/ShopDetail.vue'),
  }
// ]

// }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
