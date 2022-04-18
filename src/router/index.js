import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import Detail from '../pages/HistoryDetail.vue';
import Login from '../pages/Auth/LoginAdmin.vue';
// import SalePage from '../pages/SalePage.vue';
// import HistoryPage from '../pages/HistoryPage.vue';
// import IndexPage from '../pages/IndexPage.vue';

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
  path:'/',
  component: HomePage,
  children : [
  // {
  //     path:'',
  //     redirect:'/sales',
  // },

  {
    path:'/home',
    //component: IndexPage,
    component: () => import('@/pages/IndexPage.vue'),
  },

  {
    path:'/sales',
    //component: SalePage,
    component:() => import('@/pages/SalePage.vue'),
  },

  {
    path:'/history',
    //component: HistoryPage,
    component:() => import('@/pages/HistoryPage.vue'),
  },

  {
    path:'/history/:id',
    component: Detail,
    //component:() => import('../pages/HistoryDetail.vue'),
  }
]

}
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
