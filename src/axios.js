import axios  from "axios";

//axios.defaults.baseURL = 'http://localhost:8100';

axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');