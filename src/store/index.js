
//import '../axios';
import { createStore } from 'vuex';
//import AuthModule from './modules/auth'; 
import SaleModule from './modules/sale';
import RetailCart from './modules/retailCart'
//import axios from 'axios';




const store = createStore({

    modules: {
        //auth:AuthModule
        sales:SaleModule,
        retailCart: RetailCart
    },

  
    state(){
        return {
          
            cartItemCount: 0,

            cartItems: [],

            saleDatas:[],

            customer:{},

            foc: [],

            finalFoc: [],

         
            
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
            return state.cartItems.reduce((total, lineItem) => total + (lineItem.price * lineItem.quantity)-(((lineItem.price*lineItem.quantity)/100)*lineItem.discount), 0);
        },

        TotalSale : state => {
            return state.saleDatas.reduce((total, records) => total += Number(records.grandTotal) , 0);
        },

        saleRecord(state){
            return(saleId) => {
                return state.saleDatas.find((saleData) =>  saleData.id === saleId );
            };
        },

        finalFocs(state){
            return  state.foc.map( f => ({
                quantity: f.quantity,
                variant_id: f.variant_id,
                unit_id:f.unitId,
            }));
        },

        finalItems(state){
            return state.cartItems.map( c => ({
                qty: c.quantity,
                variant_id: c.variant_id,
                unit_id: c.unitId,
                price: c.price,
                discount: c.discount
            }))
        }
    },

    actions: { 

   
        addToCart: (context, payload) => {
            context.commit("addToCart", payload)
        },
    
        removeItem: (context, payload) => {
          context.commit("removeItem", payload)
        },

        removeProduct: ({commit}, product) => {
            commit('Remove_Product', product)
        },

        addFoc: ( context, payload) => {
            context.commit("addFoc" , payload)
        },

        removeFocItems: ( context, payload) => {
            context.commit("removeFocItems", payload)
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
            item = { ...item, quantity:1 , unitId:0, price:0 , discount:0}
  
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

          Remove_Product(state, product){
                state.cartItems = state.cartItems.filter( item => {
                    return item.id !== product.id;
                })

                state.cartItemCount--;
          },

          addFoc(state, payload){
                let item = payload;
                item = {...item, quantity:1, unitId:0}

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

          removeFocItems(state, payload){
               if(state.foc.length > 0){
                  let bool = state.foc.some( i => i.id === payload.id)

                  if(bool){
                      let index = state.foc.findIndex( el => el.id === payload.id)

                      if(state.foc[index]["quantity"] !== 0 ){
                          state.foc[index]["quantity"] -= 1
                          //state.foc --
    
                      }
                      if(state.foc[index]["qunatity"] === 0){
                          state.foc.splice(index, 1)
                      }
                  }
              }
          },

          removeFoc( state, foc){
            //   if(state.foc.length > 0){
            //       let bool = state.foc.some( i => i.id === payload.id)

            //       if(bool){
            //           let index = state.foc.findIndex( el => el.id === payload.id)

            //           if(state.foc[index]["quantity"] !== 0 ){
            //               state.foc[index]["quantity"] -= 1
    
            //           }
            //           if(state.foc[index]["qunatity"] === 0){
            //               state.foc.splice(index, 1)
            //           }
            //       }
            //   }
            state.foc = state.foc.filter( item => {
                return item.id !== foc.id;
            })
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
