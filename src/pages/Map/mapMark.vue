<template>
    <ion-page>
          <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/map/assign_way"></ion-back-button>
                    </ion-buttons>
                    <ion-title slot="end"> Sale Ways</ion-title>
                </ion-toolbar>
            </ion-header>
             <ion-content v-if="loading">
                <Loader/>
            </ion-content>
        <ion-content v-else class=" bg-white w-auto h-full">
            <h1>Helo</h1>
         <!-- <GMapMap
            :center="center"
            :zoom="13"
            map-type-id="terrain"
           class="w-full h-full rounded mx-auto mt-6 relative"
        >
              <GMapMarker
              :key="s.id"
              v-for="s in shops"
              :position="{lat: parseFloat(s.lat) , lng: parseFloat(s.lng)}">
                    <GMapInfoWindow
                      :opened="true"
                    >
                      <div> Name : {{s.shop.name}}</div>
        </GMapInfoWindow>
                </GMapMarker>
          </GMapMap> -->
      
            
            <div class=" absolute bg-slate-800">
                
                  <ion-button @click="openPin()" shape="round" color="secondary"> <ion-icon :icon="storefrontOutline"></ion-icon> </ion-button>
                
            </div>
              
            
      
      </ion-content>
    </ion-page>


</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,  IonButton, 
         modalController, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import Modal from '../../component/Map/PinModel.vue'
import { storefrontOutline} from 'ionicons/icons';
import axios from 'axios';
import Loader from '../../component/LoaderComponent.vue'
//import { GoogleMap} from '@capacitor/google-maps'

export default defineComponent({
  name: 'MapPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    Loader
  },

   setup() {
        return{
            storefrontOutline
        }
    },

  data(){
    return{
      loading: false,
      result:[],
      shops:[],
      assign:{},
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

     async getData(){
            this.loading = true;
            await axios.get(`assign_saleway/${this.$route.params.id}` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                  this.shops = res.data.shop;
                  this.assign = res.data.assignway;
                })
                .finally(() => this.loading = false)
        },

     async currentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();

        //console.log('Current position:', coordinates);

        window.alert(coordinates.coords.latitude +','+ coordinates.coords.longitude);
      },

      async openPin(){
        const modal = await modalController.create({
          component: Modal,
          componentProps:{
              markers: this.shops,
              getData:() => this.getData(),
          },
          breakpoints:[0,0.3,0.5,0.8],
          initialBreakpoint: 0.5
        });

        await modal.present();
      }

   
  },

  created(){
    this.getData();
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
