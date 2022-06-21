<template>
  
    <master-layout pageTitle="SalesWay">
        <ion-content class=" bg-white w-auto h-full">
         <GMapMap
            :center="center"
            :zoom="13"
            map-type-id="terrain"
           class="w-full h-full rounded mx-auto mt-6"
        >
              <GMapMarker
              :key="marker.id"
              v-for="marker in markers"
              :position="marker.position">
                    <GMapInfoWindow
                      :opened="true"
                    >
                      <div> Name : {{marker.name}}</div>
      </GMapInfoWindow>
              </GMapMarker>
        </GMapMap>
    
          
           <div class=" relative inline bottom-20 left-20">
              
                <ion-button @click="openPin()" shape="round" color="secondary"> Lists</ion-button>
               
           </div>
             
           
     
    </ion-content>
    </master-layout>
    

</template>

<script>
import { IonContent,  IonButton, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import Modal from '../../component/Map/PinModel.vue'
// import axios from 'axios';
//import { GoogleMap} from '@capacitor/google-maps'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonButton,
  },

  data(){
    return{
      result:[],
      center: {lat: 16.932521760828777, lng: 96.15880038438864},
      markers: [
        {
          id: 'me',
          name:'Nyan',
          position: {
            lat: 16.932521760828777, lng: 96.15880038438864
          },
        },

        // {
        //   id: 'you',
        //   name:'Loream',
        //   position: {
        //     lat: 17.932521760828777, lng: 96.15880038438864
        //   },
        // }
      ]
    }
  },

  
  methods: {

     async currentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        //console.log('Current position:', coordinates);

        window.alert(coordinates.coords.latitude +','+ coordinates.coords.longitude);
      },

      async openPin(){
        const modal = await modalController.create({
          component: Modal,
          componentProps:{
              markers: this.markers,
          },
          breakpoints:[0,0.3,0.5,0.8],
          initialBreakpoint: 0.5
        });

        await modal.present();
      }

   
  },

  created(){
    //this.getData();
  }
  
});
</script>

<style>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
/* .container{
  width: 100%;
  height: 100%;
} */

</style>
