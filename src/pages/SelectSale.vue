<template>
<ion-page>
    <ion-card class="my-6 bg-slate-50 rounded-xl" router-link="/sales">
        <ion-card-header>
            <ion-card-title class=" text-center">
                <h3 class=" font-semibold text-md text-gray-800"> WholeSales </h3>
            </ion-card-title>
        </ion-card-header>
        <ion-card-content class="text-center">
          
                <ion-button shape="round" expand=" block" class="my-4" color="tertiary"> Click </ion-button>
                <!-- <button class=" py-3 px-4 rounded-xl text-lg bg-sky-300 text-amber-100 text-center"> Click</button> -->
            
        </ion-card-content>
    </ion-card>

     <ion-card class="my-8 bg-sky-50 rounded-xl shadow-md">
        <ion-card-header>
            <ion-card-title class=" text-center">
                <h3 class=" font-semibold text-md text-emerald-900"> RetailSales </h3>
            </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          
                <ion-button shape="round" expand=" block" class="my-4" color="tertiary"> Click </ion-button>
            
        </ion-card-content>
    </ion-card>
</ion-page>
</template>
<script>
import { IonCard, IonCardContent ,IonCardHeader , IonCardTitle, IonButton, IonPage } from '@ionic/vue';
export default {
    components: {
        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonPage
    }
}
</script>

<style>
   
</style>