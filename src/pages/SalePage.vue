<template>
   <ion-page>
    <Menu/>
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
                                            <ion-label> {{ data.product_name }} </ion-label>
                                    </ion-item>
                                </ion-list>
                        </ion-col>
                       </ion-col>

                   </ion-row>
               </ion-grid>

               <ion-content>
                   <ion-list>
                       <ion-item v-for=" data in retails" :key="data.id">
                            <span class=" text-red-400"> {{ data .product_name }} </span> - {{ data.variant.product_code }}
                            <!-- <ion-item>
                                <ion-label> Select Unit</ion-label>
                                    <ion-select v-model="unitId">
                                        <ion-select-option v-for="u in data.unit" :key="u.id" :value="u.id">
                                                    {{ u.unit}}
                                        </ion-select-option>
                                    </ion-select>



                                 </ion-item> -->

                            </ion-item>
                            <ion-item>
                             <!-- <ion-label v-for="p in sellingPrices" :key="p.id">
                                        <div v-if="p.unit_id == this.unitId" :value="p.id">
                                            <h3> {{ p.price}} </h3>
                                        </div>
                             </ion-label> -->
                           <ul>
                               <li v-for="d in result" :key="d.id"> 
                                   {{d.variant.product_name}}
                                   <select name="" id="" v-model="uId">
                                       <option v-for="(u,index) in d.unit" :key="index" :value="u.id">
                                           {{u.unit}}
                                       </option>
                                   </select>
                                     <!-- <input type="text" v-model="qty[index]" class="bg-slate-500"> -->
                                 </li>
                                  <li v-for="d in result" :key="d.id">
                                   <div v-for="p in price" :key="p.id">
                                       <p v-if="d.variant.id == p.product_id">
                                           <span v-if="d.variant.pricing_type == p.multi_price">

                                               <span v-if="p.unit_id == uId">
                                                       <!-- {{p.rule}} || {{p.min}} {{p.max}} ||{{p.price}} -->
                                                       {{p}}
                                               </span>



                                           </span>

                                       </p>
                                   </div>
                                  </li>


                           </ul>

                           <ul>
                               <li v-for="(j,index) in p" :key="index">
                                    {{ j.variant.product_name }}
                               </li>
                           </ul>


                            </ion-item>

                   </ion-list>
               </ion-content>





        </ion-content>
   </ion-page>
</template>
<script>

import { IonPage, IonContent, IonTitle ,
         IonButton , IonIcon,
        IonToolbar, IonSearchbar, IonList,
        IonItem, IonGrid, IonRow, IonCol,

        menuController} from '@ionic/vue';
import { personOutline,
        barcodeOutline} from 'ionicons/icons';



import Menu from '../component/sideCustomer.vue';
// import Sale from '../component/Sale/SaleTable.vue'
import Barcode from '../component/Sale/BarCodeData.vue';


import axios from 'axios';

const api_url = "http://54.169.124.45/api/auth/mobile_invoice/create";
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
        // IonSelect, IonSelectOption,



        Menu,
        Barcode,
        //Sale

    },

    setup(){
        return{
            personOutline,barcodeOutline
        }
    },

    data() {
        return {
            view: false,

            state:'',
            filteredStates: [],
            retails:[],
            sellingPrices:[],
            p:[],

            uId:[],
            //unitId:[],
            priceId:'',




        }
    },


    methods: {

        // add(){
        //     this.unitId.push(this.uId);
        // },

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
            this.filteredStates = this.retails.filter(state => {
                return state.product_name.toLowerCase().startsWith(this.state.toLowerCase());
            })
        },

        //cart System
        addToCart(data){
            this.$store.dispatch("addToCart", data);
        },



         finals(){
           const t = "hello"
           return t ;
        }



    },

    computed: {
        products(){
        var r
        //return this.$store.getters.product
        this.retails.map( x => {
            this.sellingPrices.map( y => {
                if(x.variant_id === y.product_id) {
                    if(x.variant.pricing_type === y.multi_price){
                         this.r =  this.p.push(Object.assign(x,y));
                        //  if(x.unit_id === y.unit_id) {
                        //      y.map(object => object.children = [{object}, {object}])
                        //  }
                    }
                }
            })
        })

        return r ;
        },

        customer(){
            return this.$store.state.customer;
        },

        result(){
            return this.retails.map((data) => {
                return data;
            })
        },

        price(){
            return this.sellingPrices.map((data) => {
                return data;
            })
        },





        //for cart system


        //name filter
        // filterName(){
        //     return this.products.map ((product) => {
        //         return product;
        //     })
        // }
    },

    created() {
        this.finals();
    },

    async mounted() {
       await axios.get(api_url)
                    .then(res => {
                        this.retails = res.data.aval_product;
                        this.sellingPrices = res.data.prices
                    })


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

    /* ion-icon{
        font-size: 20px;
    } */

</style>
