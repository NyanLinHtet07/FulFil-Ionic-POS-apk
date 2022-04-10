import { createStore } from 'vuex'

const store = createStore({
    state(){
        return {
            customers: [ 
                {id:'1', name:'Mg Mg' , phone:'0922334455' , address:'Yangon'},
                {id:'2', name:'Mg Aung' , phone:'0922557788' , address:'Mawlamyine'},
                {id:'3', name:'Mg Hla' , phone:'0922889955' , address:'Mandalay'},
                
            ],

            products: [
                {id:'1' , name:'apple' , price:'280'},
                {id:'2' , name:'orange' , price:'600'},
                {id:'3', name:'mango' , price:'1000'},
                {id:'4', name:'graps' , price:'1500'},
                {id:'5', name:'coconut', price:'1600'}, 
                //'apple', 'orange'
            ],

            cartItems: [],

            saleDatas:[],

            customer:{},
        };
    },

    mutations: {
        addToCart( state, payload){
            let item = payload;

            item = { ...item, quantity:1}

            if(state.cartItems.length > 0){
                let bool = state.cartItems.some(i => i.id == item.id)

                if(bool){
                    let itemIndex = state.cartItems.findIndex( el => el.id === item.id)

                    state.cartItems[itemIndex]["quantity"] += 1;
                }

                else {
                    state.cartItems.push(item)
                }
            }

            else{
                state.cartItems.push(item)
            }
        },

        removeItem( state, payload){
            if(state.cartItems.length > 0){
                let bool = state.cartItems.some(i => i.id === payload.id)

                if(bool){
                    let index = state.cartItems.findIndex(el => el.id === payload.id)

                    if(state.cartItems[index]["quantity"] !== 0){
                        state.cartItems[index]["quantity"] -= 1
                    }

                    if(state.cartItems[index]["quantity"] === 0){
                        state.cartItems.splice(index,1)
                    }
                }
            }
        },

        clearCart(state , cartItems){
            state.cartItems = cartItems;
        },

        addSale(state, saleData){
            const newSale = {
                id: new Date().toISOString(),
                cartItems: saleData.cartItems,
                tax: saleData.tax,
                discount: saleData.discount,
                totalPrice: saleData.totalPrice,
                title: saleData.customer_title,
                customer: saleData.customer_name,
                phone: saleData.customer_phone,
                address: saleData.customer_address,
                shipping_address: saleData.customer_shipping,
                description: saleData.customer_description,
                created_at: new Date(),
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
         }
        
    },

    getters: {
        customers(state) {
            return state.customers;
        },

        products(state){
            return state.products;
        },

        cartItems(state){
            return state.cartItems;
        },

        getTotal : state => {
            return state.cartItems.reduce((total, lineItem) => total + (lineItem.quantity * lineItem.price), 0);
        },

        saleRecord(state){
            return(saleId) => {
                return state.saleDatas.find((saleData) =>  saleData.id === saleId )
            };
        }
    },

    actions: {
        addToCart: (context, payload) => {
            context.commit("addToCart", payload)
        },
         removeItem: (context, payload) => {
             context.commit("removeItem", payload)
         },

         clearCart({commit}){
             commit('clearCart', [])
         },

         addSale( context, saleData){
             context.commit('addSale', saleData);
         },

         customerData( context, theCustomer){
             context.commit('customerData', theCustomer);
         }
    }
});

export default store;
