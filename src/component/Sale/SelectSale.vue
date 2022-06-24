<template>
    <ion-grid>
        <ion-row>
            <ion-col>
                <ion-card class="my-8 bg-emerald-50 rounded-xl" router-link="/wholesales">
                    <ion-card-header>
                        <ion-card-title class=" text-center">
                            <h3 class=" font-semibold text-md text-gray-800"> WholeSales </h3>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="text-center">
                    
                            <ion-button shape="round" expand=" block" class="my-4" color="secondary"> Start </ion-button>
                            <!-- <button class=" py-3 px-4 rounded-xl text-lg bg-sky-300 text-amber-100 text-center"> Click</button> -->
                        
                    </ion-card-content>
                </ion-card>
            </ion-col>

                <ion-col>
                    <ion-card class="my-8 bg-emerald-50 rounded-xl" router-link="/retails">
                    <ion-card-header>
                        <ion-card-title class=" text-center">
                            <h3 class=" font-semibold text-md text-emerald-900"> RetailSales </h3>
                        </ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                    
                            <ion-button shape="round" expand=" block" class="my-4" color="secondary"> Start </ion-button>
                        
                    </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>

     <ion-grid>
            <ion-row>
                <ion-col>
                     <ion-card class="my-8 bg-emerald-50 rounded-xl" router-link="/customers">
                        <ion-card-header>
                            <ion-card-title class=" text-center">
                                <h2 class=" font-semibold text-2xl text-emerald-900"> <ion-icon :icon="personOutline"></ion-icon> </h2>
                                <h3 class=" font-semibold text-md text-emerald-900"> Customers </h3>
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                        
                                <ion-button shape="round" expand=" block" class="my-4" color="secondary"> Start </ion-button>
                            
                        </ion-card-content>
                    </ion-card>
                </ion-col>

                <ion-col>
                     <ion-card class="my-8 bg-emerald-50 rounded-xl" router-link="/shop">
                        <ion-card-header>
                            <ion-card-title class=" text-center">
                                 <h2 class=" font-semibold text-2xl text-emerald-900"> <ion-icon :icon="storefrontOutline"></ion-icon> </h2>
                                <h3 class=" font-semibold text-md text-emerald-900"> Shop </h3>
                            </ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                        
                                <ion-button shape="round" expand=" block" class="my-4" color="secondary"> Start </ion-button>
                            
                        </ion-card-content>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    
</template>
<script>
import { IonCard, IonCardContent ,IonCardHeader , IonCardTitle, IonButton, IonRow, IonCol, IonGrid, IonIcon } from '@ionic/vue';
import { personOutline, storefrontOutline} from 'ionicons/icons'

export default {
    components: {
        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonCol, IonRow, IonGrid, IonIcon
    },

    data(){
        return {
            personOutline, storefrontOutline
        }
    }
}
</script>

<style>
   
</style>