<template>
        <master-layout pageTitle=" Sales History">
        <ion-content v-if="loading">
                <Loader/>
        </ion-content>
       <ion-content v-else>
              <ion-searchbar debounce="500" v-model="search" placeholder=" search invoice ..." animated /> 
                <ion-list> 
                    
                    
                    <ion-card v-for="record in filteredInvoice" :key="record.id" class="my-4">
                        <ion-card-header class="text-white bg-emerald-400/60">
                            
                            <ion-card-title> <h4> Invoice Number - {{ record.invoice_id}} </h4></ion-card-title>
                           
                            <ion-card-subtitle class=" text-gray-700">  Invoice Date - {{ record.invoice_date}}  </ion-card-subtitle>
                            <ion-card-subtitle class=" text-gray-700">  Due Date - {{ record.due_date}}  </ion-card-subtitle>
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
                                <ion-row>
                                    <ion-col>
                                       <ion-label> Customer Name </ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text> {{record.customer.name}} </ion-text>
                                    </ion-col>
                                   
                                </ion-row>

                                 <ion-row>
                                    <ion-col>
                                       <ion-label> Phone </ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text> {{record.customer.phone}} </ion-text>
                                    </ion-col>
                                  
                                </ion-row>

                                 <ion-row>
                                    <ion-col>
                                       <ion-label> Address </ion-label>
                                    </ion-col>
                                    <ion-col>
                                        <ion-text>  {{record.billing_address}} </ion-text>
                                    </ion-col>
                                   
                                </ion-row>

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
                </ion-list>
               
        

       </ion-content>
        </master-layout>
      

  
</template>
<script>
import {  IonContent,
         IonList ,IonLabel,IonText, IonGrid, IonRow, IonCol, IonSearchbar,
        IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/vue';

import Loader from '../component/LoaderComponent.vue'

// import {mapGetters} from 'vuex';

import axios from 'axios';
export default {
    components:{
      
      
        IonContent,
      
        IonLabel,
        IonList,
       IonText,
        IonGrid,
        IonRow, IonCol,
        IonButton,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle,
        IonSearchbar,
        Loader
       
        
    },

    data() {
        return {
          loading: false,
          retails:[],
          posts:[],

          search:'',
        }
    },

    methods:{
       async getData(){
            this.loading = true

            await axios.get('mobile_invoice', {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
            .then( response => {
              this.posts = response.data.allinv
            })

            .finally(() => this.loading = false)
            
        }

    },

    computed:{
        records(){
            return this.$store.state.saleDatas;
        },

        filteredInvoice(){
            return this.posts.filter((post) => {
                return post.invoice_id.toLowerCase().match(this.search.toLowerCase())
            })
        }

         //...mapGetters(['sale.retail_product']),
    },

    // mounted() {
    //     axios.get(`https://www.fulfilmm.com/api/auth/mobile_invoice`)
    //             .then( res => (
    //                     this.retails = res.data
    //                 ))
    // 
       

    //     this.$store.dispatch('fetchPosts')
               
    // },

     created() {
            //      await axios.get('mobile_invoice', {
            //     headers: {
            //     'Authorization': "Bearer" + localStorage.getItem('token'),
            //      },
            //     })
            // .then( response => {
            //   this.posts = response.data.allinv
            // })
            this.getData();
           
        },
}
</script>

<style scope>
    .emptycart{
      margin-top: 60px;
    }
    .text{
        text-align: center;
        font-weight: 400;
        margin-top: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

     ion-card{
        border-radius: 20px;
    }
      ion-searchbar{
        --border-radius:30px;
    }

</style>
