<template>
    
            <ion-menu side="end" type="overlay" menu-id="end" class=" my-custom-menu" content-id="main">
            <ion-header>
                <ion-toolbar color=" tertiary">
                    <ion-title> Customer Info  </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                
                <ion-item>
                    <ion-label> Select Customer</ion-label>
                    <ion-select v-model="theCustomer">
                        <ion-select-option value=""> None </ion-select-option>
                        <ion-select-option v-for="customer in customers" :key="customer.id" :value="customer"> {{ customer.name}} </ion-select-option>
                      
                    </ion-select>
                </ion-item>
                
               
                    <ion-list>
                        <ion-item>
                            <ion-grid>
                                <form></form>
                                <ion-row class="ion-justify-content-center">
                                    <ion-col>
                                        <ion-icon :icon="person" />
                                    </ion-col>
                                    <ion-col>
                                         <ion-text> {{theCustomer.name}}</ion-text>    
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                            
                        </ion-item>
                        <ion-item>
                              <ion-grid>
                                <ion-row class="ion-justify-content-center">
                                    <ion-col>
                                        <ion-icon :icon="callOutline" />
                                    </ion-col>
                                    <ion-col>
                                         <ion-text> {{theCustomer.phone }}</ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        
                           
                        </ion-item>
                        <ion-item>
                             <ion-grid>
                                <ion-row class="ion-justify-content-center">
                                    <ion-col>
                                        <ion-icon :icon="locateSharp" />
                                    </ion-col>
                                    <ion-col>
                                           <ion-text>{{theCustomer.address}}</ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                          
                        </ion-item>  

                        
                        <ion-toolbar> 
                            <ion-title size="small">Add on</ion-title> 
                        </ion-toolbar>

                        <ion-item>
                            <ion-label position="floating">Add Title</ion-label>
                            <ion-input v-model="theCustomer.title"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating"> Add Shipping Address</ion-label>
                            <ion-input v-model="theCustomer.shipping_address"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating"> Add Description </ion-label>
                            <ion-textarea v-model="theCustomer.description"></ion-textarea>
                        </ion-item>

                        <ion-item>
                            <ion-button expand="block" color="secondary" shape="round" 
                            slot="end" size="" name="star" @click="submit()"> 
                                Save 
                            </ion-button>
                        </ion-item>
                    
                    </ion-list>   
                     
            </ion-content>
             
                      
                 
        </ion-menu>
  
</template>

<script>

import {  IonHeader, IonContent, 
         IonMenu, IonToolbar,
         IonSelect, IonSelectOption,
         IonItem, IonLabel , IonList,
         IonText, IonGrid, IonRow, IonCol , 
         IonInput, IonIcon, IonTextarea,
         IonTitle, IonButton  } from '@ionic/vue'

import { person , locateSharp , callOutline } from 'ionicons/icons';
//import { defineComponent} from 'vue';
export default  ({
    components: {
        IonHeader,
        IonContent,
        IonMenu,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonItem,
        IonLabel,
        IonList,
        IonText,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonIcon,
        IonTextarea,
        IonTitle,
        IonButton
    },

    setup(){
        return{
            person,locateSharp,callOutline , 
        }
    },

    data() {
        return {
            //customerInfo:{},

            //openCustomer: false,
            theCustomer:{
                name:'',
                phone:'',
                address:'',
                title:'',
                shipping_address:'',
                description:'',
            },
        }
    },

    computed: {
        customers(){
            return this.$store.getters.customers
        }
    },

    methods: {

        reset(){
             this.theCustomer = {
                name:'',
                phone:'',
                address:'',
                title:'',
                shipping_address:'',
                description:'',
            }
        },
        submit() {
            this.$store.dispatch('customerData', this.theCustomer);
            this.reset();

            //this.$store.dispatch('addSale', this.saleData);
        }
       
    },

    // created() {
    //     this.submit();
    // },

   
    

})
</script>

<style>
    .my-custom-menu{
    --width: 60%;
    --transition-duration: 5s ease in;
}

    .text{
        padding: 20px;
        margin: 10px;
    }
</style>