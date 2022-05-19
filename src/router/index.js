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

  // {
  //   path:'/sales_detail/:id',
  //   component:() => import('@/pages/Sale/SaleDetail.vue'),

  // },


  {
    path:'/history',
    component:() => import('@/pages/HistoryPage.vue'),
  },

  {
    path:'/history/:id',
    component: Detail,
    //component:() => import('../pages/HistoryDetail.vue'),
  }
// ]

// }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
