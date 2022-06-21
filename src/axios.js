import axios  from "axios";
import router from './router';

axios.defaults.baseURL = 'https://www.fulfilmm.com/api/auth/';

// const Api = axios.create({
//     baseURL:'https://www.fulfilmm.com/api/auth/'
// });

axios.defaults.headers.common['Authorization'] = `Bearer` + localStorage.getItem('token');

axios.interceptors.response.use(undefined, function (error) {
    if (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
    
          originalRequest._retry = true;
          //store.dispatch('LogOut')
          localStorage.removeItem('token');
          return router.push('/login')
      }
      if(error.response.status === 422 ){
        return window.alert("Need To Fill Require Data");
      }
      // if(error.response.status === 500 ){
      //   return window.alert("Check Network or Require Field");
      // }
    }
 })

