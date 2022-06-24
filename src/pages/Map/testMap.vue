 <template>
    <ion-page>
        <ion-content>
            
             <GMapMap
                    :center = "center"
                    :zoom="20" 
                    map-type-id="terrain"
                    class="mx-auto block w-11/12 h-3/4 px-3 py-2 rounded-lg shadow-md">
                    <GMapMarker
                        :position="{lat: current.lat , lng: current.lng}"
                    >
                    </GMapMarker>
            </GMapMap>
        </ion-content>
    </ion-page>
 </template>

 <script>
    import {IonPage, IonContent} from '@ionic/vue'
    import { Geolocation } from '@capacitor/geolocation';

    export default {

        data(){
            return{
                current:{
                     lat:0,
                    lng:0,
                },
               

                center:{
                    lat:0,
                    lng:0,
                }
            }

        },

        components:{
            IonPage, IonContent
        },

        methods:{
           
             getPosition() {
                Geolocation.getCurrentPosition().then(position => {
                console.log('Current', position)
                this.position = position
               this.center = Object.assign({}, this.center, {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    })
                
                 this.current = Object.assign({}, this.center, {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                    })

                })
            },
        
        }, 

        mounted() {
            this.getPosition();
        }
    }
 </script>