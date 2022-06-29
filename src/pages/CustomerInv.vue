<template>
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/customers"></ion-back-button>
                    </ion-buttons>
                    <ion-title slot="end"> Customer Invoices</ion-title>
                </ion-toolbar>
            </ion-header>
             <ion-content v-if="loading">
            <Loader/>
        </ion-content>
        
        <ion-content v-else>
            <div class=" w-full min-h-screen bg-lime-50 px-3 py-2">
                <div class="fixed top-14 bg-lime-50 min-w-full z-20 p-2">
                     <div>
                        <ion-searchbar debounce="500" v-model="search" placeholder=" search invoice ..." animated/> 
                    </div>
                </div>
                <div class=" flex justify-between mt-16 px-6">
                   
                    <div>
                         <div class=" text-gray-700 my-2">
                           <ion-label class=" font-bold mr-3"><ion-icon :icon="personOutline"></ion-icon> </ion-label> <ion-text class=" font-semibold"> {{customer.name}} </ion-text>
                        </div>
                          <div class=" text-gray-700 my-2">
                            <ion-icon :icon="cardOutline" class="font-bold mr-3"> </ion-icon><ion-text class=" font-semibold"> {{customer.customer_id}} </ion-text>
                        </div>
                        <div class=" text-gray-700 my-2">
                            <ion-icon :icon="callOutline" class=" font-bold mr-3"></ion-icon> <ion-text class=" font-semibold"> {{ customer.phone}}</ion-text>
                        </div>
                         <div class=" text-gray-700 my-2">
                            <ion-label> Current Credit  </ion-label> <ion-text class=" font-semibold"> {{ customer.current_credit}}</ion-text>
                        </div>
                         <div class=" text-gray-700 my-2">
                             <ion-label>Credit Limit </ion-label> <ion-text class=" font-semibold"> {{ customer.credit_limit }}</ion-text>
                        </div>
                    </div>
                    <div>
                          <div class=" text-gray-700 my-2">
                            <ion-label class=" font-semibold"> Total Paid - </ion-label> <ion-text class=" font-thin text-lg"> {{paid_total}} </ion-text>
                        </div>
                          <div class=" text-gray-700 my-2">
                            <ion-label class=" font-semibold"> Open Amt - </ion-label> <ion-text class=" font-thin text-lg"> {{open}} </ion-text>
                        </div>
                          <div class=" text-gray-700 my-2">
                            <ion-label class=" font-semibold"> Over Due - </ion-label> <ion-text class=" font-thin text-lg"> {{overdue}} </ion-text>
                        </div>
                    </div>
                </div>
                
                 
            
               <div v-if="! invoice.length" class="bg-white min-h-screen">
                    <img src="assets/icon/empty.gif" alt="" class=" mx-auto d-block pt-10">
               </div>
              
                     <ion-card v-for="record in filteredInv" :key="record.id" class="my-4" v-else>
                        <ion-card-header class="text-white bg-emerald-400/60">
                            
                            <ion-card-title> <h4> Invoice Number - {{ record.invoice_id}} </h4></ion-card-title>
                           
                            <ion-card-subtitle class=" text-gray-700">  Invoice Date - {{moment(record.invoice_date).format("MMM Do YYYY")}}  </ion-card-subtitle>
                            <ion-card-subtitle class=" text-gray-700">  Due Date - {{moment(record.due_date).format("MMM Do YYYY")}}  </ion-card-subtitle>
                            <div class=" flex ion-justify-content-between">
                                 <ion-text class="text-gray-600 font-bold"> {{record.inv_type}} </ion-text> 
                                <div>
                                    <ion-text v-if="record.cancel == 1 " class="text-right text-red-800 font-bold"> Canceled</ion-text>
                                    <ion-text v-else class="text-right text-gray-800 font-bold"> {{record.status}}</ion-text>
                                </div>
                            </div>
                        </ion-card-header>
                        <ion-card-content class=" text-gray-700 font-medium">
                            <ion-grid>
                                 

                                  <ion-row class="font-bold text-lg">
                                    <ion-col>
                                       <ion-label> Total </ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text>  {{record.grand_total}} MMK </ion-text>
                                    </ion-col>
                                   
                                </ion-row>

                                <ion-row class="font-bold text-lg">
                                    <ion-col>
                                       <ion-label> Due Amount </ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text>  {{record.due_amount}} MMK </ion-text>
                                    </ion-col>
                                   
                                </ion-row>
                            </ion-grid> 
                             <div class="text-right">   
                                <ion-button  color="secondary" shape="round"  :router-link="`/invoice-detail/${record.id}`"> 
                               Invoice Detail
                            </ion-button>
                            </div>
                            
                             
                        </ion-card-content>
                        </ion-card>
                </div>
                   
              
               
         
        </ion-content>
        </ion-page>
       
    
</template>
<script>

import {IonPage,IonHeader,IonToolbar, IonButtons, IonBackButton,IonTitle, IonContent, 
        IonCard , IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, 
        IonLabel, IonText, IonSearchbar, IonIcon, IonButton} from '@ionic/vue'
import { cardOutline, personOutline, callOutline } from 'ionicons/icons';
import Loader from '../component/LoaderComponent.vue'
import axios from 'axios'
import moment from 'moment'
export default {
    data() {
        return {
            search:'',
            loading: false,
            customer:{},
            invoice:[],
            paid_total :'',
            overdue: '',
            open:'',
            moment: moment,
        }
    },

    setup(){
        return{
            personOutline, cardOutline, callOutline
        }
    },

    components:{
        IonContent,
        IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
        IonCard , IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, 
        IonLabel, IonText, IonSearchbar, IonIcon, IonButton,
        Loader
    },

    methods:{
        async getData(){
            this.loading = true;
            await axios.get(`api_customers/${this.$route.params.id}` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                    this.customer = res.data.customer;
                    this.invoice = res.data.invoice;
                    this.paid_total = res.data.paid_total;
                    this.overdue = res.data.overdue;
                    this.open = res.data.open
                })
                .finally(() => this.loading = false)
        }
    },

    computed:{
        filteredInv(){
            return this.invoice.filter((inv) => {
                return inv.invoice_id.toLowerCase().match(this.search.toLowerCase()) ||
                        inv.status.toLowerCase().match(this.search.toLowerCase())
            })
        }
    },

    created() {
        this.getData();
    },
    
}
</script>

<style scoped>
     ion-card{
        border-radius: 20px;
    }
     ion-searchbar{
        --border-radius:30px;
    }
</style>
