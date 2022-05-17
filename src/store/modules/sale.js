import axios from 'axios';
const state = () => ({
    posts:[]

});

const getters = {
    posts(state){
        return state.posts;
    },
};

const actions = {
    async fetchPosts({commit}){
        const response =  await axios.get('https://jsonplaceholder.typicode.com/posts');
        commit('savePost' , response.data);
    },
};

const mutations = {
    savePost(state, payload){
        state.posts = payload;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}