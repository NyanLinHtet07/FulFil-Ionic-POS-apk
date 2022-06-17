<template style=" background: transparent;">
        <master-layout style=" background: transparent;">
             <ion-content>
                 <capacitor-google-map id="map">    
                </capacitor-google-map>
            </ion-content>
        </master-layout>
            
        <!-- <ion-button @click="createMap()"> Click</ion-button> -->
 
   
</template>
<script>

import { GoogleMap } from '@capacitor/google-maps'
import {IonContent } from '@ionic/vue'
export default {
    components:{
     IonContent
    },  

    data() {
        return {
            newMap:  GoogleMap,

        }
    },
    methods:{
     

        async createMap(){
                const mapRef = document.getElementById('map')
                this.newMap = await GoogleMap.create({
                    id: 'my-cool-map',
                    element: mapRef,
                    apiKey: 'AIzaSyCM0ZdauyzVy2mYk0SeH9SUGIeQwF045vM' ,
                    config: {
                        center: {
                        lat: 33.6,
                        lng: -117.9,
                        },
                        zoom: 8,
                    },
                    });
                //console.log(newMap)


            //     const newMap = await GoogleMap.create({
            //     id: 'my-map', // Unique identifier for this map instance
            //     element: mapRef, // reference to the capacitor-google-map element
            //     apiKey: 'AIzaSyCM0ZdauyzVy2mYk0SeH9SUGIeQwF045vM', // Your Google Maps API Key
            //     config: {
            //         center: {
            //         // The initial position to be rendered by the map
            //         lat: 33.6,
            //         lng: -117.9,
            //         },
            //         zoom: 8, // The initial zoom level to be rendered by the map
            //     },
            //     });

            // console.log(newMap);
        }
    },

    mounted() {
        this.createMap()
    },
}
</script>

<style  scoped>
  
    capacitor-google-map{
        display: block !important;
        width: 400px;
        height: 100vh;
        z-index: 1000;
        /* border: 1px solid; */
    }

  
        ion-content{
        --background: none !important;
    }
    
</style>