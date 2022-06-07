<template>
      <ion-menu menu-id="app-menu" content-id="main-content">
            <ion-header>
            <ion-toolbar>
                <ion-title class=" font-semibold text-xl">FulFil</ion-title>
            </ion-toolbar>
            </ion-header>
            <ion-content>
            <ion-list>
                <!-- <ion-item @click="menuNavigation('/home')">
                <ion-label><ion-icon :icon="homeOutline" class="mx-4 " /> Home</ion-label>
                </ion-item> -->
                 <ion-item @click="menuNavigation('/select-sales')">
                    <ion-label><ion-icon :icon="cartOutline" class="mx-4"/> Sales</ion-label>
                </ion-item>

                 <ion-item @click="menuNavigation('/customers')">
                    <ion-label><ion-icon :icon="personOutline" class="mx-4"/> Customers</ion-label>
                </ion-item>
                 <!-- <ion-item @click="menuNavigation('/cart')">
                <ion-label><ion-icon :icon="cartOutline" /> Cart</ion-label>
                </ion-item> -->
                 <ion-item @click="menuNavigation('/history')">
                    <ion-label><ion-icon :icon="informationCircleOutline" class="mx-4" />Sale History</ion-label>
                </ion-item>

                <ion-item @click="menuNavigation('/map')">
                    <ion-label> <ion-icon :icon="mapOutline" class=" mx-4"></ion-icon> Map</ion-label>
                </ion-item>
            </ion-list>
            </ion-content>
        </ion-menu>
        </template>
<script>

import {
  IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel,menuController
} from "@ionic/vue";

import { homeOutline , cartOutline, informationCircleOutline, personOutline, mapOutline } from 'ionicons/icons';

export default ({
    components: {
       IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel, 
    },

    data(){
        return{
            homeOutline, cartOutline, informationCircleOutline, personOutline, mapOutline
        }
    },

    methods : {
       menuNavigation(url){
           menuController.close("app-menu")
           this.$router.push(url);
       } 
    }
})
</script>
