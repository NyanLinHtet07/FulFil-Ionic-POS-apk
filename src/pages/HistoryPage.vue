<template>
   <ion-page>
       <ion-content>
            <ion-toolbar>
                    <ion-title class="ion-margin"> Sale History  </ion-title>
            </ion-toolbar>
          
                <ion-list>
                    
                    <!-- <ion-item v-for=" record in records" :key="record.id"  class="ion-margin ion-padding-vertical">
                        <ion-grid>
                            <ion-row>
                                <ion-col>
                                    <ion-label color="secondary">Customer - {{ record.customer}}</ion-label>
                                    <ion-label color="secondary">Phone - {{ record.phone}}</ion-label>
                                    <ion-label color="primary">Total - {{ record.totalPrice }}</ion-label>
                                </ion-col>
                                <ion-col>
                                    
                                        <ion-label>Date- {{record.created_at}}</ion-label>
                                </ion-col>
                                 
                            </ion-row>
                        </ion-grid>
                         <ion-item>
                            <ion-button expand="block" color="secondary" shape="round" 
                            slot="end" size="" name="star" :router-link="`/history/${record.id}`"> 
                                Detail
                            </ion-button>
                        </ion-item>
                       
                    </ion-item> -->
                    <ion-card v-for="record in records" :key="record.id">
                        <ion-card-header>
                            <ion-card-subtitle>INV - {{ record.id}}</ion-card-subtitle>
                            <ion-card-title> Date - {{ record.created_at}} </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-item>
                                 <ion-label> Customer - {{record.customer}}</ion-label>
                            </ion-item>

                            <ion-item>
                                <ion-label> Phone - {{record.phone}}</ion-label>
                            </ion-item>

                            <ion-item>
                                <ion-label> Shipping Address - {{record.shipping_address}}</ion-label>
                            </ion-item>
                           
                            
                            

                            <ion-button expand="block" color="secondary" shape="round" 
                            slot="end" :router-link="`/history/${record.id}`"> 
                               Order Detail
                            </ion-button>
                        </ion-card-content>

                    </ion-card>
                </ion-list>
        

       </ion-content>

   </ion-page>
</template>
<script>
import { IonPage, IonTitle, IonContent,
        IonToolbar , IonList ,IonLabel, IonItem,
        IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/vue';

import axios from 'axios';
export default {
    components:{
        IonPage,
        IonTitle,
        IonContent,
        IonToolbar,
        IonLabel,
        IonList,
        IonItem,
        // IonGrid,
        // IonRow, IonCol,
        IonButton,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle
        
    },

    data() {
        return {
            products:[],
        }
    },

    methods:{
        view(){
            axios.get(`http://54.169.124.45/api/auth/api_products`)
                .then(response => {
                    this.products = response.data
                })
        }
    },

    computed:{
        records(){
            return this.$store.state.saleDatas;
        }
    },

     created() {
    //   axios.get('http://54.169.124.45/api/auth/api_products')
    //         .then( response => {
    //           this.products = response.data
    //         });
    this.view();
  },
}
</script>
