<template>
      <ion-menu menu-id="app-menu" content-id="main-content">
            <ion-header>
            <ion-toolbar>
                <ion-title>FulFil</ion-title>
            </ion-toolbar>
            </ion-header>
            <ion-content>
            <ion-list>
                <ion-item @click="menuNavigation('/home')">
                <ion-label><ion-icon :icon="homeOutline" /> Home</ion-label>
                </ion-item>
                 <ion-item @click="menuNavigation('/sales')">
                <ion-label><ion-icon :icon="cartOutline" /> Sales</ion-label>
                </ion-item>
                 <ion-item @click="menuNavigation('/cart')">
                <ion-label><ion-icon :icon="cartOutline" /> Cart</ion-label>
                </ion-item>
                 <ion-item @click="menuNavigation('/history')">
                <ion-label><ion-icon :icon="informationCircleOutline" /> History</ion-label>
                </ion-item>
            </ion-list>
            </ion-content>
        </ion-menu>
        </template>
<script>

import {
  IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel,menuController
} from "@ionic/vue";

export default ({
    components: {
       IonMenu,IonHeader,IonContent,IonToolbar,IonTitle,IonItem,IonList,IonLabel, 
    },

    methods : {
       menuNavigation(url){
           menuController.close("app-menu")
           this.$router.push(url);
       } 
    }
})
</script>
