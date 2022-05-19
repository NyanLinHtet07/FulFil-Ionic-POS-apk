import axios  from "axios";

//axios.defaults.baseURL = 'http://localhost:8100';

//axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

axios.defaults.headers.common['Authorization'] = `Bearer` + localStorage.getItem('token');

// const setAuthHeader = (token) => {
//     if(token){
//         axios.defaults.headers = {
//             Authorization: token,

//         }
//     }
//     else{
//         delete axios.defaults.headers.Authorization;
//     }
// };

// export default setAuthHeader;