<template>
       
             <ion-content>
                 <capacitor-google-map id="map">    
                </capacitor-google-map>
            </ion-content>
        
       
        
      
        <!-- <ion-button @click="createMap()"> Click</ion-button> -->
 
    
           
       
            
            

   
</template>
<script>

import { GoogleMap } from '@capacitor/google-maps'
//import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native'
import {IonContent } from '@ionic/vue'
export default {
    components:{
     IonContent
    },  
    methods:{
     

        async createMap(){
            const mapRef = document.getElementById('map');

             await GoogleMap.create({
                id:'my-map',
                element: mapRef,
                apiKey: 'AIzaSyCM0ZdauyzVy2mYk0SeH9SUGIeQwF045vM',
                //apiKey: '0l4sCTTyRmXTNo7k8DREHvEaLar2UmHGwnhZVHQ', 
                
                config: {
                    center: {
                        lat: 33.6,
                        lng: -117.9,
                    },

                    zoom:8
                }
            })

            //console.log(newMap);
        }
    },

    mounted() {
        this.createMap()
    },
}
</script>

<style scoped>    
    capacitor-google-map{
        display: inline-block;
        width: 300px;
        height: 100vh;
        border: 1px solid;
    }

  
        ion-content{
        --background: none !important;
    }
    
    
    
</style>