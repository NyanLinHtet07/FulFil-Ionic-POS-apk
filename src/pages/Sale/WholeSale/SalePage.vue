<template>
     
    <master-layout pageTitle = "WholeSales">
        <div v-if="loading">
            <Loader/>
        </div>

        
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
                                      <ion-icon :icon="cartOutline"></ion-icon> <span class="ml-1"> {{item}} </span>
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
                                   
                        
                                <ion-item  v-for=" data in filterProducts" :key="data.id"  @click="addToCart(data)" class=" px-3 py-2" button="true">

                                           <ion-avatar class="">
                                            <ion-icon v-if="data.image == null" :icon="person" class="text-sky-700/75 text-3xl px-2 py-2 mb-2 rounded-3xl bg-slate-200"></ion-icon>
                                            <ion-img v-else :src="`https://fulfilmm.com/product_picture/` + data.image" alt=""> </ion-img>
                                        </ion-avatar>

                                        <ion-text class=" ml-5 text-gray-600/90 text-sm font-medium leading-none">
                                            {{ data.product_name}}
                                        
                                        </ion-text>
                                        <ion-text class=" text-emerald-800 text-sm font-medium leading-none ml-3">
                                            {{ data.variant.item_code}}
                                        
                                        </ion-text>
                                        <ion-text slot="end" class="text-sm text-lime-900/80 font-semibold">
                                             {{ data.show_price}} MMK
                                        </ion-text>
                            
                                
                                </ion-item>
            

                <!-- <ion-footer class="ion-no-border text-center" id="foot">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <ion-title class=" text-white text-center"> Cart Items </ion-title>
                        </div>
                        <div>
                            <p class=" text-2xl text-white"> {{item}} <ion-icon :icon="arrowUpCircleOutline"></ion-icon>  </p>
                        </div>
                    </div>
                </ion-footer> -->
                </ion-content>


         </ion-content>
            
        </master-layout>

 
</template>
<script>

import { IonHeader, IonContent, IonSearchbar, IonItem,
         IonGrid, IonRow, IonCol,IonButton,
         IonText, IonChip, alertController, IonAvatar, IonImg, IonIcon} from '@ionic/vue';
import { arrowUpCircleOutline,  barcodeOutline, cartOutline, removeCircle, personAddOutline } from 'ionicons/icons';
// import Sale from '../component/Sale/SaleTable.vue'
//import Barcode from '../../../component/Sale/BarCodeData.vue';
import Loader from '../../../component/LoaderComponent.vue';


import axios from 'axios';

const api_url = "mobile_invoice/create";
export default {
    components: { 
        IonHeader,
        IonContent,
        IonSearchbar,
        IonGrid,
        IonRow,
        IonCol,        
        IonButton,
        IonText,
        IonItem,
        Loader,
        IonChip,
        IonAvatar,
        IonImg,
        IonIcon
    

    },

    setup(){
        return{
            arrowUpCircleOutline, barcodeOutline, cartOutline, removeCircle, personAddOutline
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
           async AlertConfirm() {
            const alert = await alertController
                .create({
                cssClass: 'my-custom-class',
                header: 'Clear Cart',
                message: '<strong>Are You Sure To Destroy All </strong>',
                buttons: [
                    {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler:() => {
                        //console.log('Confirm Cancel:', blah)
                    },
                    },
                    {
                    text: 'Okay',
                    id: 'confirm-button',
                    handler: () => {
                      this.$store.dispatch("clearCart");
                    },
                    },
                ],
                });
            return alert.present();
            },

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
            //if(!confirm('Are You Sure To Cancel')) return;
            this.AlertConfirm();
            
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
     .top{
         position: fixed;
         top: 10;
         background: white;
      
    }

    ion-searchbar{
        --border-radius:30px;

    }
    /* .my-custom-class .alert-wrapper {
        background: #e5e5e5;
        } */

    /* ion-icon{
        font-size: 20px;
    } */

</style>
