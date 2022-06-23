<template>
    <ion-page>
          <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/shop"></ion-back-button>
                    </ion-buttons>
                    <ion-title slot="end"> Shop Detail</ion-title>
                </ion-toolbar>
            </ion-header>
             <ion-content v-if="loading">
            <Loader/>
        </ion-content>
        <ion-content v-else>
            <ion-grid class=" mt-3">
                <ion-row class="justify-content-between text-sm font-semibold">
                    <ion-col>
                        <ion-text class=" mx-4"> <ion-icon :icon="storefrontOutline"></ion-icon></ion-text>  <ion-text class=" text-gray-700">{{shop.name}}</ion-text> <br>
                        <ion-text class=" mx-4"> <ion-icon :icon="callOutline"></ion-icon> </ion-text> <ion-text class=" text-gray-700"> {{shop.phone}} </ion-text><br>
                        <ion-text class=" mx-4"> <ion-icon :icon="businessOutline"></ion-icon> </ion-text>  <ion-text class=" text-gray-700"> {{shop.contact}} </ion-text> <br>
                    </ion-col>

                    <ion-col>
                         <ion-text class=" mx-4"> <ion-icon :icon="navigateOutline"></ion-icon></ion-text>  <ion-text class=" text-gray-700">{{shop.branch.name}}</ion-text> <br>
                        <ion-text class=" mx-4"> <ion-icon :icon="locateOutline"></ion-icon> </ion-text> <ion-text class=" text-gray-700"> {{shop.region.name}} </ion-text><br>
                        <ion-text class=" mx-4"> <ion-icon :icon="compassOutline"></ion-icon> </ion-text>  <ion-text class=" text-gray-700"> {{shop.zone.name}} </ion-text> <br>
                    </ion-col>
             
                </ion-row>
            </ion-grid>

           
              
                     <GMapMap
                    :center = "{lat: parseFloat(location.lat) , lng:  parseFloat(location.lng)}"
                    :zoom="16"
                    map-type-id="terrain"
                    class="mx-auto block w-11/12 h-3/4 px-3 py-2 rounded-lg shadow-md">
                    <GMapMarker
                        :position="{lat: parseFloat(location.lat) , lng: parseFloat(location.lng)}"
                    >

                           <GMapInfoWindow
                      :opened="true"
                    >
                      <div> {{shop.name}}</div>
                    </GMapInfoWindow>

                    </GMapMarker>

                  
                    </GMapMap>
            
                
  

        </ion-content>
    </ion-page>
</template>
<script>

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
        IonGrid, IonRow, IonCol, IonText, IonIcon} from '@ionic/vue'

import { storefrontOutline, callOutline, businessOutline, locateOutline, navigateOutline, compassOutline} from 'ionicons/icons';
import Loader from '../../component/LoaderComponent.vue'
import axios from 'axios'

export default {
    data() {
        return {
           
            loading: false,
            shop:{},
            location:{},
        }
    },

    setup() {
        return{
            storefrontOutline, callOutline, businessOutline , navigateOutline, locateOutline, compassOutline
        }
    },

    components:{
        IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
        IonGrid, IonRow, IonCol, IonText, IonIcon,
        Loader
    },

    methods: {
         async getData(){
            this.loading = true;
            await axios.get(`shops/${this.$route.params.id}` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                    this.shop = res.data.shop;
                    this.location = res.data.location;
                })
                .finally(() => this.loading = false)
        },

    },

  

    created() {
        this.getData();
        
    },
}
</script>