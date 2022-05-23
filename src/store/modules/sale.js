import axios from 'axios';

const state = () => ({
    retail_products:[],
    customers:[],
    discounts:[],
    companies:[],
    dis_promo:[],
    focs:[],
    //retailprices:[],
    region:[],
    status:[],        
    taxes:[],
    unit:[],
    warehouse:{},
    zone:[],
});

const getters = {
    retail_product(state){
        return state.retail_products;
    },


};

const actions = {
    async fetchPosts({commit}){
        try{
            const response =  await axios.get("http://54.169.124.45/api/auth/retail/invoice",  { 
                headers: {
                           'Authorization': "Bearer" + localStorage.getItem('token'),
                           },
                           });
            commit('saveproduct' , response.data.aval_product);
            commit('savecustomer' , response.data.allcustomers);
            commit('savediscount', response.data.amount_discount);
            commit('savecompanies', response.data.companies);
            commit('savedis_promo', response.data.dis_promo);
            commit('savefocs', response.data.focs);
            //commit('saveprices', response.data,prices);
            commit('saveregion', response.data.region);
            commit('savestatus', response.data.status);
            commit('savetaxes', response.data.taxes);
            commit('saveunit', response.data.unit);
            commit('savezone', response.data.zone);
        }

        catch(error){
            console.log(error);
        }
       
    },
};

const mutations = {
    saveproduct(state, payload){
        state.retail_products = payload;
    },

    savecustomer(state, payload){
        state.customers = payload;
    },

    savediscount( state, payload){
        state.discounts = payload;
    },

    savecompanies( state, payload){
        state.companies = payload;
    },

    savedis_promo(state, payload){
        state.dis_promo = payload;
    },

    savefocs( state, payload){
        state.focs = payload;
    },

    // saveprices( state, payload){
    //     state.retailprices = payload;
    // },

    saveregion(state, payload){
        state.region = payload;
    },

    savestatus( state, payload){
        state.status = payload;
    },

    savetaxes(state, payload){
        state.taxes = payload;
    },

    saveunit( state, payload){
        state.unit = payload;
    },

    savezone( state, payload){
        state.zone = payload;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
}