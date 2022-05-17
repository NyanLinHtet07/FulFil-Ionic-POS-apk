
//import '../axios';
import { createStore } from 'vuex';
//import AuthModule from './modules/auth'; 
import SaleModule from './modules/sale';




const store = createStore({

    modules: {
        //auth:AuthModule
        sales:SaleModule
    },

  
    state(){
        return {
            customers: [ 
                {id:'1', name:'Mg Mg' , phone:'0922334455' , address:'Yangon'},
                {id:'2', name:'Mg Aung' , phone:'0922557788' , address:'Mawlamyine'},
                {id:'3', name:'Mg Hla' , phone:'0922889955' , address:'Mandalay'},
                
            ],

          

            cartItemCount: 0,

            cartItems: [],

            saleDatas:[],

            customer:{},

            foc: [],

         
            
        };
    },

    getters: {

      
        customers(state) {
            return state.customers;
        },

        cartItems(state){
            return state.cartItems;
        },

       

        focs(state){
            return state.foc;
        },

        getTotal : state => {
            return state.cartItems.reduce((total, lineItem) => total + (lineItem.quantity * lineItem.price), 0);
        },

        TotalSale : state => {
            return state.saleDatas.reduce((total, records) => total += Number(records.grandTotal) , 0);
        },

        saleRecord(state){
            return(saleId) => {
                return state.saleDatas.find((saleData) =>  saleData.id === saleId );
            };
        }
    },

    actions: {

        // async fetchUsers({ commit }) {
        //     try {
        //       const d = await axios.get("http://54.169.124.45/api/auth/retail/invoice");
        //         commit('set_retails', d.data);
        //       }
        //       catch (error) {
        //           alert(error)
        //           console.log(error)
        //       }
        //   },

       



        addToCart: (context, payload) => {
            context.commit("addToCart", payload)
        },
    
        removeItem: (context, payload) => {
          context.commit("removeItem", payload)
        },

        addFoc: ( context, payload) => {
            context.commit("addFoc" , payload)
        },

        removeFoc: (context, payload) => {
            context.commit("removeFoc", payload)
        },
    
        clearCart ({commit}){
            commit('clearCart', []);
        },

         addSale( context, saleData){
             context.commit('addSale', saleData);
         },

         customerData( context, theCustomer){
             context.commit('customerData', theCustomer);
         }
    },

    mutations: {
        addToCart(state , payload){

            let item = payload;
            item = { ...item, quantity:1 , unitId:0, price:0 }
  
            if( state.cartItems.length > 0 ) {
              let bool = state.cartItems.some (i => i.id == item.id)
              if(bool) {
                let itemIndex = state.cartItems.findIndex (el => el.id === item.id)
                state.cartItems[itemIndex]["quantity"] += 1;
               }
               else{
                 state.cartItems.push(item)
               }
            } 
              else {
                state.cartItems.push(item)
              }
            state.cartItemCount ++
          },
  
          removeItem( state, payload){
              if( state.cartItems.length > 0) {
                let bool = state.cartItems.some(i => i.id === payload.id)
  
                if(bool) {
                  let index = state.cartItems.findIndex(el => el.id === payload.id)
  
                  if(state.cartItems[index]["quantity"] !== 0){
                    state.cartItems[index]["quantity"] -= 1
                    state.cartItemCount --
                  }
  
                  if( state.cartItems[index]["quantity"] === 0){
                    state.cartItems.splice(index, 1)
                  }
   
                
                }
              }
          },

          addFoc(state, payload){
                let item = payload;
                item = {...item, quantity:1}

                if(state.foc.length > 0){
                    let bool = state.foc.some(i => i.id == item.id)
                    if(bool) {
                        let itemIndex = state.foc.findIndex ( el => el.id === item.id)
                        state.foc[itemIndex]["quantity"] += 1;
                    }
                    else{
                        state.foc.push(item)
                    }
                }
                else{
                    state.foc.push(item)
                }
          },

          removeFoc( state, payload){
              if(state.foc.length > 0){
                  let bool = state.foc.some( i => i.id === payload.id)

                  if(bool){
                      let index = state.foc.findIndex( el => el.id === payload.id)

                      if(state.foc[index]["quantity"] !== 0 ){
                          state.foc[index]["quantity"] -= 1
    
                      }
                      if(state.foc[index]["qunatity"] === 0){
                          state.foc.splice(index, 1)
                      }
                  }
              }
          },
  
          clearCart(state, cartItems){
              state.cartItems = cartItems;
              state.cartItemCount = 0;
          },

        addSale(state, saleData){
            const newSale = {
                id: new Date().toISOString(),
                cartItems: saleData.cartItems,
                tax: saleData.tax,
                discount: saleData.discount,
                deli:saleData.deli,
                totalPrice: saleData.totalPrice,
                grandTotal:saleData.grandtotal,
                title: saleData.customer_title,
                customer: saleData.customer_name,
                phone: saleData.customer_phone,
                address: saleData.customer_address,
                shipping_address: saleData.customer_shipping,
                description: saleData.customer_description,
                created_at: new Date().toLocaleDateString(),
            };

            state.saleDatas.unshift(newSale);
        },

        customerData(state, theCustomer){
            //const newCustomer = {
                state.customer.id = new Date().toISOString(),
                state.customer.name = theCustomer.name
                state.customer.phone = theCustomer.phone
                state.customer.address = theCustomer.address
                state.customer.title = theCustomer.title
                state.customer.shipping_address= theCustomer.shipping_address
                state.customer.description= theCustomer.description
            //};

            //state.customer.unshift(newCustomer);
         },


         //api datas
        //  set_retails(state, data) {
        //     state.products = data;
        // }

       
        
    },

    

    
});

export default store;
