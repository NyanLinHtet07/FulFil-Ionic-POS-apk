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
           
                <ion-header class="bg-sky-100/70 bg-opacity-60 backdrop-blur-md backdrop-filter py-6">
                    <ion-avatar class=" mx-auto block my-10">
                                    <ion-icon v-if="shop.picture == null" :icon=" storefrontOutline" class=" text-emerald-800 text-5xl px-2 py-2 mb-2 rounded-3xl bg-slate-100"></ion-icon>
                                    <ion-img v-else :src="`https://fulfilmm.com/img/profiles/` + shop.picture" alt=""> </ion-img>
                                </ion-avatar>
                </ion-header>
                <ion-content>
                    <ion-list>
                        <ion-item>
                            <ion-icon :icon="storefrontOutline" class=" text-2xl my-2 ml-8"></ion-icon>
                             <ion-label class=" ml-8">  {{shop.name}}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="callOutline" class=" text-2xl my-2 ml-8"></ion-icon>
                            <ion-label class="ml-8">  {{shop.phone}}</ion-label>
                        </ion-item>
                        <ion-item>
                             <ion-icon :icon="navigateOutline" class=" text-2xl my-2 ml-8"></ion-icon>
                             <ion-label class=" ml-8"> {{shop.branch.name}} </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="locateOutline" class=" text-2xl my-2 ml-8"></ion-icon>
                            <ion-label class=" ml-8"> {{shop.region.name}} </ion-label>
                        </ion-item>
                        <ion-item>
                             <ion-icon :icon="compassOutline" class=" text-2xl my-2 ml-8"></ion-icon>
                            <ion-text v-if="shop.zone == null" class=" ml-8"> There is no Zone </ion-text>
                            <ion-text class=" ml-8" v-else> {{shop.zone.name}} </ion-text>
                        </ion-item>
                    </ion-list>
                                       
                             
                </ion-content>
          
           

           
              
                     <!-- <GMapMap
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
                      <div>{{ shop.phone}}</div>
                    </GMapInfoWindow>

                    </GMapMarker>

                  
                    </GMapMap>
             -->
                
  

        </ion-content>
    </ion-page>
</template>
<script>

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonAvatar, IonImg, IonLabel, IonItem, IonList,
         IonText, IonIcon} from '@ionic/vue'

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
        IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonAvatar, IonImg,
       IonText, IonIcon, IonLabel, IonItem, IonList,
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
<style scoped>
    /* ion-icon {
  font-size: 24px;
} */
</style>