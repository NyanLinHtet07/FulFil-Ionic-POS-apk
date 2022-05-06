<template>
    <ion-page>
        <ion-content>
            <Sale/>
        </ion-content>
    </ion-page>
</template>
<script>

import {IonPage, IonContent} from '@ionic/vue'
import Sale from '../../component/Sale/SaleTable.vue'
export default {
    components:{
        IonPage, IonContent, Sale
    }    
}
</script>
