<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                Add Unit
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-label> <h3> SBC </h3></ion-label>
            <ion-item>
                 <ion-label> Select Unit</ion-label>
                    <ion-select v-model="unitId">
                        <ion-select-option value=""> None </ion-select-option>
                        <ion-select-option v-for="u in unit" :key="u.id"  :value="u.id"> {{ u.unit}} </ion-select-option>
                      
                    </ion-select>
            </ion-item>
            <!-- <ion-item v-model="priceId">
               <ion-item v-for="p in sellingPrices" :key="p.id" :value="p.id">
                   <ion-label v-if="p.unit_id == this.unitId"> 
                       <h3> {{ p.price}} </h3>
                    </ion-label>
                    <ion-label v-else> Noop </ion-label>
               </ion-item>
            </ion-item> -->

            <ion-item>
                 <ion-label> Select Unit</ion-label>
                    <ion-select v-model="priceId">

                        <ion-select-option v-for="p in sellingPrices" :key="p.id"  :value="p.id"> 
                            <p v-if="p.unit_id == this.unitId"> {{ p.price}}  </p> 
                            <p v-else> Nan</p> 
                        </ion-select-option>
                      
                    </ion-select>

            </ion-item>
            
        </ion-content>


       
    </ion-page>
   
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent ,
        IonSelect, IonSelectOption, IonLabel } from "@ionic/vue";
import axios from 'axios';

const api_url = "http://54.169.124.45/api/auth/mobile_invoice/create";
export default {

    data() {
        return {
            unit:[],
            sellingPrices:[],

            unitId: '',
            priceId:'',

        }
    },
    components:{
        IonPage,
        IonHeader, IonToolbar ,IonContent,
        IonSelect, IonSelectOption, IonLabel,
      
        
    },

    methods: {
         async unitdata(){
            await axios.get( api_url )
                    .then( res => (
                        this.unit = res.data.unit
                    ))
        },

        async prices(){
            await axios.get( api_url )
                        .then( res => (
                            this.sellingPrices = res.data.prices
                        ))
        }

    },

    created(){
        this.unitdata();
        this.prices();
    }
}
</script>