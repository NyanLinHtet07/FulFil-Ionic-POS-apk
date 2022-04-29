<template>
   <ion-page>
    <Menu/>
       
             
           

            <!-- <ion-button @click="clickMe" v-if="!view" expand="half" class="icon" shape="rounded">
                Click
            </ion-button>
            <ion-button @click="closeMe" v-if="view" color="danger" class="icon" shape="rounded">
                Close
            </ion-button>

            <ion-content v-if="view">
                Hello
            </ion-content> -->
             <ion-content id="main">
            <ion-button @click="openCustom()" expand="" class="icon" color="secondary" shape="round"> <ion-icon :icon="personOutline" />  
                   <!-- <ion-text> Customer </ion-text> -->
            </ion-button>
           
        
           <ion-toolbar> 
               <ion-title> Sale DashBoard</ion-title>
           </ion-toolbar>

          
               <ion-grid>
                   <ion-row>
                       <ion-col>
                        <ion-col class="ion-align-self-auto">
                            <Barcode/>
                                <!-- <ion-button>
                                    <ion-icon  :icon="barcodeOutline" />
                                </ion-button> -->
                        </ion-col>
                        <ion-col class="ion-align-self-auto">
                                <ion-button color="tertiary">
                                    <ion-label> FOC </ion-label>
                                </ion-button>

                        </ion-col>
                        <ion-col class="ion-align-self-auto">
                                <ion-searchbar debounce="500" v-model="state" @input="filterStates" autocomplete="off"></ion-searchbar>
                                <ion-list>
                                    <ion-item v-for=" data in filteredStates" :key="data.id" @click="addToCart(data)">
                                            {{ data.name }}
                                    </ion-item>
                                </ion-list>
                        </ion-col>
                       </ion-col>
                      
                   </ion-row>
               </ion-grid>
                 
           <ion-content>
            <!-- <ion-list>
                <ion-item v-for="data in products" :key="data.id" @click="addToCart(data)">
                    <ion-button> {{data.name}} </ion-button>
                </ion-item>
            </ion-list> -->

            <ion-grid class="ion-margin table">
                <ion-row class="ion-text-center tableHead">
                    <ion-col> Name </ion-col>
                    <ion-col> Price </ion-col>
                    <ion-col> Quantity  </ion-col>
                    <ion-col> Total </ion-col>
                </ion-row> 
                <ion-row v-for="product in cartItems" :key="product.id" class="ion-text-center cell">
                  
                        <ion-col> {{ product.name }}</ion-col>
                        <ion-col>{{ product.price}}</ion-col>
                        <ion-col> 
                            <ion-button @click="add(product)" shape="round" size="small" class="native"> <ion-icon :icon="addCircleOutline" /> </ion-button>   
                            <ion-text> {{ product.quantity}} </ion-text>
                            <ion-button @click="remove(product)" shape="round" size="small" class="native" color="danger"> <ion-icon :icon="removeCircleOutline" />  </ion-button> 
                        </ion-col>
                        <ion-col>{{ product.price * product.quantity}}</ion-col>
                   
                </ion-row> 
                <ion-row>
                   
                        <ion-col offset-4 class="ion-text-end"> Total </ion-col>
                        <ion-col class="ion-text-center"> {{ getTotal}}</ion-col>
                   
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Discount </ion-col>
                    <ion-col class="ion-align-self-center"> <ion-input v-model="discount" type="number" placeholder="add %"></ion-input> 
                        <ion-text class="inputText">{{addDis}}</ion-text> 
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=""> 
                            <div>
                                <ion-input type="number" v-model="tax" placeholder="add %"></ion-input>
                                <ion-text class="inputText">  {{addTax}} </ion-text>
                            </div>
                    </ion-col>
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Deli </ion-col>
                    <ion-col class="ion-text-center"> <ion-input v-model="deli"></ion-input></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Grand Total</ion-col>
                    <ion-col class="ion-text-center"> {{ addTotal }}</ion-col>
                </ion-row>

            </ion-grid>

            <ion-item>
                <ion-button @click="saveData" expand="block" color="secondary" shape="round" 
                 slot="end" size="" name="star"> 
                    Save 
                 </ion-button>
            </ion-item>

           </ion-content>

        </ion-content>    
   </ion-page>     
</template>
<script>

import { IonPage, IonContent, IonTitle ,
         IonButton , IonIcon,
        IonToolbar, IonSearchbar, IonList,
        IonItem, IonGrid, IonRow, IonCol,
        IonInput, IonText, IonLabel,
        menuController} from '@ionic/vue';
import { personOutline, addCircleOutline, removeCircleOutline,
        barcodeOutline} from 'ionicons/icons';


import { mapGetters } from "vuex";
import Menu from '../component/sideCustomer.vue';
import Barcode from '../component/Sale/BarCodeData.vue';

//import Menu from './sideCustomer.vue';
export default {
    components: {
        IonPage,
        IonContent,
        IonTitle,
        IonButton,
        IonIcon,
        IonToolbar,
        IonSearchbar,
        IonList,
        IonItem,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonText,
        IonLabel,
        Menu,
        Barcode
    
    },

    setup(){
        return{
            personOutline, addCircleOutline, removeCircleOutline ,barcodeOutline
        }
    },

    data() {
        return {
            view: false,

            state:'',
            filteredStates: [],

            tax:'',
            deli:'',
            discount:'',

            saleData: {
                cartItems:'',
                tax:'',
                discount:'',
                deli:'',
                totalPrice:'',
                grandtotal:'',
                customer_name:'',
                customer_address:'',
                customer_phone:'',
                customer_title:'',
                customer_shipping:'',
                customer_description:''
            }
        }
    },


    methods: {

        clickMe(){
            this.view = true;
        },

        closeMe(){
            this.view = false;
        },

        openCustom(){
        //menuController.enable(true, 'custom');
        menuController.open('end');
        },

       

        filterStates(){
            this.filteredStates = this.products.filter(state => {
                return state.name.toLowerCase().startsWith(this.state.toLowerCase());
            })
        },

        //cart System
        addToCart(data){
            this.$store.dispatch("addToCart", data);
        },

        add(product){
            this.$store.dispatch("addToCart", product);
        },

        remove(product){
            this.$store.dispatch('removeItem', product);
        },

        clearCart(cartItems){
            this.$store.dispatch("clearCart" , cartItems);
        },

        saveData(){

                this.saleData.cartItems = this.cartItems,
                this.saleData.tax = this.addTax,
                this.saleData.discount = this.addDis,
                this.saleData.deli = this.deli,
                this.saleData.totalPrice = this.getTotal,
                this.saleData.grandtotal = this.addTotal,
                this.saleData.customer_name = this.customer.name,
                this.saleData.customer_address = this.customer.address,
                this.saleData.customer_phone = this.customer.phone,
                this.saleData.customer_title = this.customer.title,
                this.saleData.customer_shipping = this.customer.shipping_address,
                this.saleData.customer_description = this.customer.description,
                
                this.$store.dispatch('addSale', this.saleData);
                this.clearCart();
                this.addTotal = '' ;
                this.tax = '' ;
                this.discount = '' ;
                this.deli = '';
        }
        

    },

    computed: {
        products(){
        return this.$store.getters.products;
        },

        customer(){
            return this.$store.state.customer;
        },

        //for cart system
        cartItems(){
            return this.$store.getters.cartItems;
        },

        ...mapGetters(["getTotal"]),

        addTotal(){
            let a = Number(this.getTotal);
            let b = Number(this.addTax);
            let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + ( b + d );
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.tax);
            let amt = Number(this.getTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.discount);
            let amt = Number(this.getTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },


        //name filter
        filterName(){
            return this.products.map ((product) => {
                return product.name;
            })
        }
    }
}
</script>

<style scoped>
    .icon{
        display: block;
        position: relative;
        top: 50px;
        right: 10px;
        float: right;
        z-index: 10000;
    }

    .cell{
        border-color: aliceblue;
        border-width: .01em; 
        border-style:solid; margin-bottom : -1px;
        background-color: rgb(241, 238, 238)
    }
    .tableHead{
        background-color: rgb(202, 202, 231);
        padding: 5px;
    }

    .removeIcon{
        color: white;
        background-color: rgb(179, 41, 41);
        margin-left: 15px;
     
        font-size: 20px;
        border-radius: 50%;
    }

    ion-input{
        background-color: rgba(212, 211, 209, 0.918);
        border-radius: 10px;
        width: 100px;
        margin: auto;
        padding: auto;
        text-align: center;
        
    }

    .inputText{
        margin:auto;
        padding: auto;
        font-weight: bold;
        color: rgb(122, 118, 118);
        display: block;
        text-align: center;
    }

    /* ion-icon{
        font-size: 20px;
    } */
   
</style>