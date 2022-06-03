<template>
        <master-layout pageTitle=" Sales History">
        <div v-if="loading">
                <Loader/>
        </div>
       <ion-content v-else>
            
                <ion-list>
                    
                    
                    <ion-card v-for="record in posts" :key="record.id">
                        <ion-card-header>
                            <ion-card-subtitle>  Invoice Date - {{ record.invoice_date}}  </ion-card-subtitle>
                            <ion-card-title>Invoice Number - {{ record.invoice_id}}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-item>
                                 <ion-label> Customer - {{record.customer.name}}</ion-label>
                            </ion-item>

                            <ion-item>
                                <ion-label> Phone - {{record.customer.phone}}</ion-label>
                            </ion-item> 

                            <ion-item>
                                <ion-label> Shipping Address - {{record.billing_address}}</ion-label>
                            </ion-item>
              
                            <ion-button  color="secondary" shape="round" 
                            slot="end" :router-link="`/invoice-detail/${record.id}`"> 
                               Invoice Detail
                            </ion-button>
                        </ion-card-content>

                    </ion-card>
                </ion-list>
               
        

       </ion-content>
        </master-layout>
      

  
</template>
<script>
import {  IonContent,
         IonList ,IonLabel, IonItem,
        IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/vue';

import Loader from '../component/LoaderComponent.vue'

// import {mapGetters} from 'vuex';

import axios from 'axios';
export default {
    components:{
      
      
        IonContent,
      
        IonLabel,
        IonList,
        IonItem,
        // IonGrid,
        // IonRow, IonCol,
        IonButton,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle,
        Loader
       
        
    },

    data() {
        return {
          loading: false,
          retails:[],
          posts:[],
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
</style>
