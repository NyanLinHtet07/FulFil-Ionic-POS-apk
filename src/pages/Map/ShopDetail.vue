<template>
    <ion-page>
          <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button default-href="/shop"></ion-back-button>
                    </ion-buttons>
                    <ion-title slot="end"> Shop</ion-title>
                </ion-toolbar>
            </ion-header>
             <ion-content v-if="loading">
            <Loader/>
        </ion-content>
        <ion-content v-else>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-text>Shop</ion-text> <br>
                        <ion-text> Phone </ion-text> <br>
                        <ion-text> Contact </ion-text> <br>
                    </ion-col>
                    <ion-col>
                         <ion-text>{{shop.name}}</ion-text> <br>
                        <ion-text> {{shop.phone}} </ion-text> <br>
                        <ion-text> {{shop.contact}} </ion-text> <br>
                    </ion-col>
                </ion-row>
            </ion-grid>

           
              
                     <GMapMap
                    :center = "{lat: Number(location.lat) , lng: Number(location.lng)}"
                    :zoom="15"
                    map-type-id="terrain"
                    class="mx-auto block w-11/12 h-2/4 px-3 py-2 rounded-lg shadow-md">
                    <GMapMarker
                        :position="{lat: Number(location.lat) , lng: Number(location.lng)}"
                    />
                    </GMapMap>
            
                
  

        </ion-content>
    </ion-page>
</template>
<script>

import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
        IonGrid, IonRow, IonCol, IonText} from '@ionic/vue'
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
    components:{
        IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
        IonGrid, IonRow, IonCol, IonText,
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