<template>
    <ion-page>
        <ion-header>
              
                  <ion-toolbar>
                     <ion-buttons slot="start">
                     <ion-back-button default-href="/wholesales"></ion-back-button>
                     </ion-buttons>
                     <ion-title>Cart Detail</ion-title>
                  </ion-toolbar>
                
            </ion-header>
        <ion-content>
            <Sale/>
        </ion-content>
    </ion-page>
</template>
<script>

import {IonPage, IonContent, IonToolbar,IonHeader, IonButtons, IonBackButton, IonTitle} from '@ionic/vue'
import Sale from '../../../component/Sale/SaleTable.vue'
export default {
    components:{
        IonPage, IonContent, Sale, IonToolbar,
        IonHeader, IonButtons, IonBackButton, IonTitle
    }     
}
</script>
