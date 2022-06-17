<template>
  
    <master-layout pageTitle="SalesWay">
        <ion-content class=" bg-white">
         <GMapMap
            :center="center"
            :zoom="20"
            map-type-id="terrain"
           class=" w-5/6 h-5/6 rounded mx-auto mt-6"
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
    
            <!-- <capacitor-google-map id="map"></capacitor-google-map> -->
            <div class="inline bottom-10 left-0">
               <ion-button @click="printCurrentPosition"> Click</ion-button>
            </div>
     
    </ion-content>
    </master-layout>
    

</template>

<script>
import { IonContent,  IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
// import axios from 'axios';
//import { GoogleMap} from '@capacitor/google-maps'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonButton
  },

  data(){
    return{
      result:[],
      center: {lat: 16.932521760828777, lng: 96.15880038438864},
      markers: [
        {
          id: 'Me',
          name:'Nyan',
          position: {
            lat: 16.932521760828777, lng: 96.15880038438864
          },
        },

        {
          id: 'You',
          name:'Moe',
          position: {
            lat: 17.932521760828777, lng: 96.15880038438864
          },
        }
      ]
    }
  },

  methods: {

     async printCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        console.log('Current position:', coordinates);

        window.alert(coordinates.coords.latitude);
      },

    //  async getData(){
    //         //this.loading = true;
    //         await axios.get(`shops` , {
    //             headers: {
    //             'Authorization': "Bearer" + localStorage.getItem('token'),
    //              },
    //             }) 
    //             .then( (res) => {
    //               this.result = res.data.shops;
    //             })
    //             //.finally(() => this.loading = false)
    //     }
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
