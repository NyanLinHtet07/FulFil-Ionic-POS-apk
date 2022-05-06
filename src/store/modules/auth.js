const state= () => ({
    authData: {
        token:"",
        refreashToken:"",
        tokenExp:"",
        userId:"",
        userEmail:"",
    },

    loginStatus: 'success'
});




import {jwtDecrypt} from "../../share/helper";

const mutations = {
    saveAuthToken(state, payload){
        const jwtDecodeUserInfo = jwtDecrypt(payload.access_token);
        const newAuthData = {
            token: payload.access_token,
            refreashToken: payload.refreash_token,
            tokenExp: jwtDecodeUserInfo.exp,
            userId: jwtDecodeUserInfo.sub,
            userName: jwtDecodeUserInfo.username,
        };
        state.authData = newAuthData;
    },

    saveLoginStatus(state, status){
        state.loginStatus = status;
    }
   
};

import { Plugins } from "@capacitor/core";

const {Storage} = Plugins;

const actions = {
    async loginUser({commit}, payload){
        console.log(payload);
        const response = {
            access_token: localStorage.getItem('token'),
            refreash_token: "fake_refresh_token"
        };

        await Storage.set({
            key: "access_token",
            value: response.refreash_token
        });

        commit('saveAuthToken' , response);
        commit('saveLoginStatus', 'success');
    }
};

const getters = {
    getLoginStatus(state){
        return state.loginStatus;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}