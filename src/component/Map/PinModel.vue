<template>
    <ion-header>
  <ion-toolbar>
    <ion-title>SalesWay</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>

  <ion-list>
      <ion-item v-for=" (m,index) in markers" :key="index">
          <ion-label> {{m.name}}</ion-label>
           <ion-button @click="position()">
              check
        </ion-button>
      </ion-item>
  </ion-list>

 

  

</ion-content>
</template>
<script>
import {IonHeader, IonToolbar, IonContent, IonLabel,
        IonItem, IonList, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

export default defineComponent ({
    components:{
        IonHeader, IonToolbar, IonContent, IonItem, IonList, IonButton, IonLabel
    },

    props:{
      markers:{type: Array}  
    },

    methods: {

      async currentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        //console.log('Current position:', coordinates);

        window.alert(coordinates.coords.latitude +','+ coordinates.coords.longitude);
      },

      position(){
        this.currentPosition();
      }
    },

    });
</script>