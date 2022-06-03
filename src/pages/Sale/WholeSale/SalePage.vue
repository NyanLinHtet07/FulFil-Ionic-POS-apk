<template>
     
    <master-layout pageTitle = "WholeSales DashBoard">
        <div v-if="loading">
            <Loader/>
        </div>

        
             <ion-content v-else>
               <ion-grid>
                   <ion-row>
                      
                        <ion-col class="ion-align-self-auto">
                             <ion-button @click="scan()">  <ion-icon  :icon="barcodeOutline" /> </ion-button>
                        </ion-col>
                       
                        <!-- <ion-col class="ion-align-self-auto">
                                <ion-searchbar debounce="500" v-model="state" @input="filterStates" autocomplete="off"></ion-searchbar>
                              
                                <ion-list>
                                    <ion-item v-for=" data in filteredStates" :key="data.id" @click="addToCart(data)">
                                            <ion-label> {{ data.product_name }} </ion-label>
                                    </ion-item>
                                </ion-list>
                        </ion-col> -->
                    
                   
                         <ion-searchbar debounce="500" v-model="search" placeholder=" search products ..."/>                          
                              <div class=" grid grid-cols-2 gap-4 w-full">
                                 
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
                                 
                              </div>
                  

                                   
                       

                   </ion-row>
               </ion-grid>
                
      

        <ion-footer class="ion-no-border text-center" id="foot">
            <!-- <div class="grid grid-cols-2 gap-4">
                <div>
                    <ion-title class=" text-white text-center"> Cart Items </ion-title>
                </div>
                <div>
                    <p class=" text-2xl text-white"> {{item}} <ion-icon :icon="arrowUpCircleOutline"></ion-icon>  </p>
                </div>
            </div> -->

            <ion-button  class="text-center text-white" router-link="/cart">
                   <ion-title> Cart Items | {{item}} </ion-title>
            </ion-button>
            
               
        </ion-footer>
         </ion-content>
            
        </master-layout>

 
</template>
<script>

import { IonContent, IonSearchbar,
         IonGrid, IonRow, IonCol, IonFooter,IonTitle,  IonButton,
          IonLabel } from '@ionic/vue';
import { arrowUpCircleOutline,  barcodeOutline } from 'ionicons/icons';
// import Sale from '../component/Sale/SaleTable.vue'
//import Barcode from '../../../component/Sale/BarCodeData.vue';
import Loader from '../../../component/LoaderComponent.vue';


import axios from 'axios';

const api_url = "mobile_invoice/create";
export default {
    components: { 
       
        IonContent,
        IonSearchbar,
        IonGrid,
        IonRow,
        IonCol,
        IonFooter,
        IonTitle,
        IonButton,
        IonLabel, 

        Loader,
     

    },

    setup(){
        return{
            arrowUpCircleOutline, barcodeOutline
        }
    },

    data() {
        return {
            view: false,

            loading: false,

            state:'',
            filteredStates: [],
            wholeSales:[],

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

                    this.filterProducts = this.wholeSales.filter( s => {
                        return s.variant.item_code.match(this.code);
                    })

                    this.product = this.filterProducts[0];

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
            this.$store.dispatch("addToCart", data);
        },

        async getData(){ 
            this.loading = true
             await axios.get(api_url,  { 
                         headers: {
                                    'Authorization': "Bearer" + localStorage.getItem('token'),
                                    },
                                    })
                    .then(res => {
                        this.wholeSales = res.data.aval_product;
                        
                    })

                    .finally(() => this.loading = false)

        }

 

    },

    computed: {
      

        customer(){
            return this.$store.state.customer;
        },


        filterProducts(){
            return this.wholeSales.filter((wholeSale) => {
                return wholeSale.product_name.toLowerCase().match(this.search.toLowerCase())
            })
        },

        item(){
            return this.$store.state.cartItemCount;
        }

       





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
    #foot{
         position: fixed;
        bottom: 33px;
        width: 100%;
        justify-content : center;
      
    }

    /* ion-icon{
        font-size: 20px;
    } */

</style>
