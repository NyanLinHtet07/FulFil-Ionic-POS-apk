 <template>
    <ion-page>
        <ion-content>
            <ion-button @click="getCurrentPosition()"> Click Me </ion-button>
             <GMapMap
                    :center = "center"
                    :zoom="16"
                    map-type-id="terrain"
                    class="mx-auto block w-11/12 h-3/4 px-3 py-2 rounded-lg shadow-md">
                    <GMapMarker
                        :position="{lat: lat , lng: lng}"
                    >
                    </GMapMarker>
            </GMapMap>
        </ion-content>
    </ion-page>
 </template>

 <script>
    import {IonPage, IonContent, IonButton} from '@ionic/vue'
    import { Geolocation } from '@capacitor/geolocation';

    export default {

        data(){
            return{
                lat:'',
                lng:'',

                center:{
                    lat:0,
                    lng:0,
                }
            }

        },

        components:{
            IonPage, IonContent, IonButton
        },

        methods:{
            async getCurrentPosition() {
                const coordinates = await Geolocation.getCurrentPosition();
                console.log('Current', coordinates);
                this.lat = coordinates.coords.latitude;
                this.lng = coordinates.coords.longitude;
            },
             getPosition() {
                Geolocation.getCurrentPosition().then(position => {
                console.log('Current', position)
                this.position = position
               this.center = Object.assign({}, this.center, {
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