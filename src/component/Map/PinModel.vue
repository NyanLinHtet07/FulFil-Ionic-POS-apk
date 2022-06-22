<template>
    <ion-header>
  <ion-toolbar>
    <ion-title>SalesWay</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>

  <ion-list>
      <ion-item v-for=" (m,index) in markers" :key="index">
          <ion-label> {{m.shop.name}}</ion-label>
           <ion-button @click="position(m.id)" :disabled="m.reach == 1">
        <!-- <ion-button @click="position(m.id)"> -->
              check 
        </ion-button>
         <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
        <!-- <ion-label>{{location}}</ion-label> -->
      </ion-item>
  </ion-list>


</ion-content>
</template>
<script>
import {IonHeader, IonToolbar, IonContent, IonLabel,
        IonItem, IonList, IonButton, IonSpinner, alertController} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';

export default defineComponent ({

    data() {
      return {
        location:'',
        posting: false,
      }
    },
    components:{
        IonHeader, IonToolbar, IonContent, IonItem, IonList, IonButton, IonLabel, IonSpinner
    },

    props:{
      markers:{type: Array},
      getData: { type:Function},  
    },

    methods: {
       async presentAlert() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          //header: 'Alert',
          subHeader: 'Location Access',
          message: 'Please Check GPS or try again',
          buttons: ['OK'],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },

      async currentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        //console.log('Current position:', coordinates);
        this.location = coordinates.coords.latitude +','+ coordinates.coords.longitude;

        //window.alert(coordinates.coords.latitude +','+ coordinates.coords.longitude);
        //console.log(location);
      },

      async position(id){
        this.currentPosition();

        //this.posting = true;
        if( this.location == ''){
          // window.alert('Need Data')
          this.presentAlert();
        }
        else{
          this.posting = true;
           await axios.post(`check/in/${id}`, {
                emp_location : this.location,
               
              
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            })
            .then((response) => {
                  console.log(response)
                  this.posting = false;
                  this.getData();
                })
            .catch( error => {
                console.log(error);
                //this.posting = false;
            })

        }
            
            //console.log(response)
        } 
      
    },

    });
</script>