<template>
  
    <master-layout pageTitle = "Retail Sales">
         <ion-content v-if="loading">
            <Loader/>
         </ion-content>

      
             <ion-content v-else>
                 <ion-header class="top ion-no-border">

               
                        <ion-grid>
                            <ion-row>
                                
                                    <ion-col class="ion-align-self-auto">
                                        <ion-button @click="scan()">  <ion-icon  :icon="barcodeOutline" /> </ion-button>
                                    </ion-col>

                                    <ion-col class="flex justify-end">
                                                <ion-chip router-link="/customers" color="success">
                                                    <ion-icon :icon="personAddOutline"></ion-icon> 
                                                </ion-chip>

                                                 <ion-chip router-link="/cart" color="tertiary">
                                                    <ion-icon :icon="cartOutline"></ion-icon>  <span class="ml-1">  {{retailItemCount}} </span>
                                                </ion-chip>
                                               

                                                    <ion-button @click="destroy()" shape="round" color="danger" fill="clear"> 
                                                        <ion-icon :icon="removeCircle" slot="icon-only"></ion-icon>
                                                    </ion-button>
                                    </ion-col>

                                    <ion-searchbar debounce="500" v-model="search" placeholder=" search products ..." animated/>                          

                            </ion-row>
                        </ion-grid>
                 </ion-header>

                 <ion-content class=" top-32">
                       <!-- <div class=" grid grid-cols-2 gap-4 w-full">
                                 
                                      <button @click="addToCart(data)"  v-for=" data in filterProducts" :key="data.id" 
                                            class=" px-3 py-2 rounded-lg my-3 mx-2 bg-white text-sky-600 shadow-lg
                                                 ring-1 ring-sky-300
                                                  hover:bg-sky-500 hover:text-white hover:shadow-inner
                                                 transition-colors duration-300">
                                                <ion-label> 
                                                    <h4> {{ data.product_name }} </h4>
                                                    <h5> {{ data.variant.product_code}} </h5>

                                                </ion-label>
                                               
                                      </button>
                                 
                              </div> -->
                                  <ion-item  v-for=" data in filterProducts" :key="data.id"  @click="addToCart(data)" class=" px-3 py-2" button="true">
                                    
                                        <ion-text class=" text-gray-800/90 text-sm font-medium leading-none">
                                            {{ data.product_name}}
                                        
                                        </ion-text>
                                        <ion-text slot="end" class="text-sm text-lime-900/80 font-semibold">
                                            {{ data.show_price}} MMK
                                        </ion-text>
                            
                                
                                </ion-item>
                 </ion-content>
                
       
        <!-- <ion-footer class="ion-no-border text-center" id="foot">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <ion-title class=" text-white text-center"> Cart Items </ion-title>
                </div>
                <div>
                    <p class=" text-2xl text-white"> {{item}} <ion-icon :icon="arrowUpCircleOutline"></ion-icon>  </p>
                </div>
            </div>

            <ion-button  class="text-center text-white" router-link="/retails-cart">
                   <ion-title> Cart Items | {{retailItemCount}} </ion-title>
            </ion-button>
            
               
        </ion-footer> -->
         </ion-content>

            
        </master-layout>

 
</template>
<script>

import { IonHeader,IonContent, IonSearchbar,
         IonGrid, IonRow, IonCol,IonText,  IonButton, IonChip } from '@ionic/vue';
import { arrowUpCircleOutline, barcodeOutline, cartOutline, removeCircle, personAddOutline } from 'ionicons/icons';

import Loader from '../../../component/LoaderComponent.vue'

import axios from 'axios';
import { mapGetters } from "vuex";

const api_url = "retail/invoice";
export default {
    components: { 
        IonHeader,
        IonContent,
        IonSearchbar,
        IonGrid,
        IonRow,
        IonCol,
        IonText,
        IonButton,
        IonChip,
        Loader

        //Sale

    },

    setup(){
        return{
            arrowUpCircleOutline, barcodeOutline, cartOutline,removeCircle, personAddOutline
        }
    },

    data() {
        return {
            view: false,
            loading: false,

            state:'',
            filteredStates: [],
            retails:[],

            search:"",
            products:[],

            uId:[],
            
            priceId:'',

            //for barcode
             code:'',
             product:{},
             filteredProducts:[],



        }
    },


    methods: {

         scan() {
     
                window.cordova.plugins.barcodeScanner.scan(
                    result => {
                    console.log(result);
                    this.code = result.text;

                    this.filteredProducts = this.wholeSales.filter( s => {
                        return s.variant.item_code.match(this.code);
                    })

                    this.product = this.filteredProducts[0];

                    this.$store.dispatch("addToCart", this.product);


                    },
                    error => {
                    alert("Scanning failed: " + error);
                    },
                    {
                    preferFrontCamera: true, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt: "Place a barcode inside the scan area", // Android
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: false, // iOS
                    disableSuccessBeep: false // iOS and Android
                    }
                );
                },

        clickMe(){
            this.view = true;
        },

        closeMe(){
            this.view = false;
        },

        destroy(){
            if(!confirm('Are You Sure To Cancel')) return;
            this.$store.dispatch("clearRetailCart");
        },

        // openCustom(){
        // //menuController.enable(true, 'custom');
        // menuController.open('end');
        // },


        //we will use in search  
        // filterStates(){
        //     this.filteredStates = this.wholeSales.filter(state => {
        //         return state.product_name.toLowerCase().match(this.state.toLowerCase());
        //     })
        // },

        //cart System
        addToCart(data){
            this.$store.dispatch("addToRetail", data);
        },

        // message(){
        //     window.alert('success');
        // },

        async getData(){
             this.loading = true
             await axios.get(api_url,  { 
                         headers: {
                                    'Authorization': "Bearer" + localStorage.getItem('token'),
                                    },
                                    })
                    .then(res => {
                        this.retails = res.data.aval_product;
                        
                    })
                    .finally(() => this.loading = false)
                    //this.message();

        }

 

    },

    computed: {
      

        customer(){
            return this.$store.state.customer;
        },


        filterProducts(){
            return this.retails.filter((retail) => {
                return retail.product_name.toLowerCase().match(this.search.toLowerCase())
            })
        },

         ...mapGetters(["retailItemCount"]),

        // item(){
        //     return this.$store.state.retailItemCount;
        // }

       





    },

    created() {
       this.getData();
         //setInterval(this.getData, 5000);
    },

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
     .top{
         position: fixed;
         top: 10;
         background: white;
      
    }

    ion-searchbar{
        --border-radius:30px;

    }

    /* ion-icon{
        font-size: 20px;
    } */

</style>
