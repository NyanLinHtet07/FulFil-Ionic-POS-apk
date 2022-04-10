<template>
   <ion-page>
      <ion-content>
       
            <ion-header>
                 <ion-toolbar>
                
               
                  <ion-title> Order Detail</ion-title>
                </ion-toolbar>
            </ion-header>

              <ion-buttons slot="start">
                        <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                  </ion-buttons>
        
       
      </ion-content>
   </ion-page>
</template>
<script>

import { IonPage , IonContent, IonHeader,IonTitle, IonToolbar,IonButtons,
         IonBackButton} from '@ionic/vue';

export default {

   props:["pageDefaultBackLink"],

   components:{
         IonPage,
         IonContent,
         IonHeader,
         IonTitle,
         IonToolbar,
         IonButtons,
         IonBackButton
   },
    data(){
       return {
          saleId:null
       }
    },

    computed:{
       loadedSale(){
          return this.$store.getters.saleRecord(this.saleId);
       }
    },

    watch:{
       '$route'(currentRoute){
          this.saleId = currentRoute.params.id;
       }
    }
}
</script>
