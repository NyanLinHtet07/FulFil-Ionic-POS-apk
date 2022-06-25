const state = () => ({

    retailItemCount : 0,
    retailItems: [],
    retailFoc:[],

});

const getters = {
    retailItemCount(state){
        return state.retailItemCount;
    },

    retailItems(state){
        return state.retailItems;
    },

    retailFocs (state){
        return state.retailFoc;
    },

    getRetailTotal : state => {
        return state.retailItems.reduce((total, lineItem) => total + (lineItem.price * lineItem.quantity) - (((lineItem.price*lineItem.quantity)/100)*lineItem.discount), 0);
    },

    finalRetailFocs(state){
        return state.retailFoc.map(f => ({
            quantity: f.quantity,
            variant_id: f.variant_id,
            unit_id: f.unitId,
        }));
    },

    finalRetailItems(state){
        return state.retailItems.map( c => ({
            qty: c.quantity,
            variant_id: c.variant_id,
            unit_id: c.unitId,
            price: c.price,
            discount: c.discount
        }))
    }



    };

const actions = {
    addToRetail: (context, payload) => {
        context.commit("addToRetail", payload)
    },

    removeRetail: (context, payload) => {
        context.commit('removeRetail', payload)
    },
 
    removeRetailProduct: ({commit}, product) => {
        commit('Remove_Retail', product)
    },

    removeRetailFoc: ({commit}, foc) => {
        commit('Remove_Retail_Foc', foc)
    },

    addRetailFoc : (context, payload) => {
        context.commit("addRetailFoc", payload)
    },

    removeRetailItemFoc: (context, payload) => {
        context.commit('removeRetailFoc', payload)
    },

    clearRetailCart({commit}){
        commit('clearRetailCart', []);
    }
};

const mutations = {
    addToRetail(state , payload){

        let item = payload;
        item = { ...item, quantity:1 , unitId:0, price:0 , discount:0}

        if( state.retailItems.length > 0 ) {
          let bool = state.retailItems.some (i => i.id == item.id)
          if(bool) {
            let itemIndex = state.retailItems.findIndex (el => el.id === item.id)
            state.retailItems[itemIndex]["quantity"] += 1;
           }
           else{
             state.retailItems.push(item)
           }
        } 
          else {
            state.retailItems.push(item)
          }
        state.retailItemCount ++
      },

      removeRetail( state, payload){
          if( state.retailItems.length > 0) {
            let bool = state.retailItems.some(i => i.id === payload.id)

            if(bool) {
              let index = state.retailItems.findIndex(el => el.id === payload.id)

              if(state.retailItems[index]["quantity"] !== 0){
                state.retailItems[index]["quantity"] -= 1
                state.retailItemCount --
              }

              if( state.retailItems[index]["quantity"] === 0){
                state.retailItems.splice(index, 1)
              }

            
            }
          }
      },

      Remove_Retail(state, product){
            state.retailItems = state.retailItems.filter( item => {
                return item.id !== product.id;
            })
            state.retailItemCount --
      },

      Remove_Retail_Foc(state, foc){
        state.retailFoc = state.retailFoc.filter( item => {
            return item.id !== foc.id;
        })
      },

      addRetailFoc(state, payload){
            let item = payload;
            item = {...item, quantity:1, unitId:0}

            if(state.retailFoc.length > 0){
                let bool = state.retailFoc.some(i => i.id == item.id)
                if(bool) {
                    let itemIndex = state.retailFoc.findIndex ( el => el.id === item.id)
                    state.retailFoc[itemIndex]["quantity"] += 1;
                }
                else{
                    state.retailFoc.push(item)
                }
            }
            else{
                state.retailFoc.push(item)
            }
      },

      removeRetailFoc( state, payload){
          if(state.retailFoc.length > 0){
              let bool = state.retailFoc.some( i => i.id === payload.id)

              if(bool){
                  let index = state.retailFoc.findIndex( el => el.id === payload.id)

                  if(state.retailFoc[index]["quantity"] !== 0 ){
                      state.retailFoc[index]["quantity"] -= 1

                  }
                  if(state.retailFoc[index]["qunatity"] === 0){
                      state.retailFoc.splice(index, 1)
                  }
              }
          }
      },

      clearRetailCart(state, cartItems){
          state.retailItems = cartItems;
          state.retailItemCount = 0;
      },
};

export default {
    namespance: true,
    state,
    getters,
    actions,
    mutations
}