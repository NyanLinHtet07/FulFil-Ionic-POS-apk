<template>
  
        <ion-header>
            <h3 class="p-2"> Add Payment </h3>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-label> Title </ion-label>
                        <ion-input input="text"></ion-input>
                    </ion-col>
                    <ion-col>
                        <ion-label> Date </ion-label>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-label> Amount </ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label>Customer </ion-label>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-label> Payment Method </ion-label>
                    </ion-col>
                    <ion-col>
                        <ion-label> Cashier</ion-label>
                    </ion-col>
                </ion-row>
                    
                <ion-row>
                     <ion-col>
                        Category
                    </ion-col>
                    <ion-col>
                        <ion-label>Reference</ion-label>
                    </ion-col>
                </ion-row>
                
                <ion-row>
                    <ion-col>
                        Description
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

</template>
<script>

import { IonContent, IonHeader, IonGrid, IonRow, IonCol, IonLabel, IonInput} from '@ionic/vue'
export default {
    components:{
        IonContent, IonHeader, IonGrid, IonRow, IonCol , IonLabel, IonInput
    },

    props:["invoice"]
}
</script>