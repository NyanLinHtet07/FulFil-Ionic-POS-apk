<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons @click="openMenu()" slot="start">
                        <ion-icon :icon="menu" slot="start" class=" text-gray-700"></ion-icon>
                </ion-buttons>
                <ion-title class=" text-right font-bold text-gray-600">{{pageTitle}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            
           <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
                <ion-refresher-content>
                </ion-refresher-content>
            </ion-refresher>
             <slot></slot>
               
            <!-- <div class=" z-40 fixed bottom-0 right-0 shadow-lg shadow-slate-100 mx-3 my-2 ">
                <ion-button @click="rotate()"> rotate</ion-button>
            </div> -->
            
           
        </ion-content>
    </ion-page>
    
</template>
<script>

import {
    IonPage, IonHeader, IonContent, IonTitle, IonToolbar,
    IonButtons, IonIcon, IonRefresher, IonRefresherContent,
    menuController
} from '@ionic/vue';

//import { ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation'

import { chevronDownCircleOutline } from 'ionicons/icons'

import {menu} from "ionicons/icons"
export default {
    components: {
        IonPage, IonHeader, IonContent, IonTitle, IonToolbar, 
        IonButtons, IonIcon, IonRefresher, IonRefresherContent
    },

    props: ["pageTitle"],

    data(){
        return {
            menu,
           
        }
    },

     setup() {
    const doRefresh = (event) => {

            //this.$router.go();
            setTimeout(() => {
                event.target.complete();
            }, 2000);

            window.location.reload();
            }
            return { chevronDownCircleOutline, doRefresh }
        },

    methods: {
         openMenu(){
            menuController.open("app-menu");
        },
    },

    
}
</script>