<template>
    <ion-content>
        <!-- <ion-card class=" bg-green-200">
            <ion-card-header>
                <ion-card-title>
                    Customer Info
                </ion-card-title>
                
            </ion-card-header>
            <ion-card-content>
               
            </ion-card-content>
        </ion-card> -->

                 <!-- <ion-searchbar debounce="500" v-model="search" @input="filterSearch" autocomplete="off" placeholder="search foc ..."></ion-searchbar>
                    <ion-item v-for="data in filteredSearch" :key="data.id" @click="addData(data)">
                            <ion-label> {{data.name}}</ion-label>
                    </ion-item> -->
                    <input type="text" v-model="search"  @input="filterCustomer" autocomplete="off" class=" bg-rose-200">
                    <ion-item v-for="data in filteredCustomer" :key="data.id" @click="addData(data)">
                            <ion-label :value="data"> {{data.name}}</ion-label>
                    </ion-item> 
                     <ion-item>
                         <ion-label> {{getCustomer.name}}</ion-label>
                     </ion-item>
                     <ion-item>
                         <ion-label>{{getCustomer.email}}</ion-label>
                     </ion-item>
                     <ion-item>
                         <ion-label>{{getCustomer.phone}}</ion-label>
                     </ion-item>
                     <ion-item>
                         <ion-label>{{getCustomer.address}}</ion-label>
                     </ion-item>
                     <ion-item>
                         <ion-label position="floating"> Add Shipping Address </ion-label>
                         <ion-input input="text" v-model="getCustomer.shipping"></ion-input>
                     </ion-item>
                          <ion-item>
                            <ion-label position="floating"> Add Description </ion-label>
                            <ion-textarea v-model="getCustomer.infomation"></ion-textarea>
                        </ion-item>
                     
                  
                     
    </ion-content>
</template>
<script>

import axios from "axios";

import { IonContent,IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSearchbar, IonInput, IonTextarea,
        IonItem, IonLabel } from "@ionic/vue";
//import {mapGetters } from "vuex";

export default {
    compontent:{
        IonContent,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonSearchbar,
        IonItem, IonLabel, IonInput, IonTextarea,
       
    },

    data(){
        return {
          search:'',
          customers:[],
          filteredCustomer:[],

          getCustomer :{
              name:'',
              email:'',
              phone:'',
              address:'',
              shipping:'',
              title:'',
              infomation:'',
          }
        }
    },

    methods:{
       async customer(){
           await axios.get('http://54.169.124.45/api/auth/mobile_invoice/create')
                        .then( res => {
                            this.customers = res.data.allcustomers
                        })
        },

        // filterSearch(){
        //     this.filteredSearch = this.customers.filter(state => {
        //         return state.name.toLowerCase().startsWith(this.search.toLowerCase());
        //     })
        // }

         filterCustomer(){
            this.filteredCustomer = this.customers.filter( state => {
                return state.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
        },

        addData(data){
            // this.getCustomer.id = data.id,
            // this.getCustomer.name = data.name,
            //console.log(data);
                this.getCustomer.name = data.name;
                this.getCustomer.phone = data.phone;
                this.getCustomer.email = data.email;
                this.getCustomer.address = data.address;
                // this.getCustomer.name = data.name;
        }
    
    
    },

    created(){
        this.customer();
    }
    
    }
</script>