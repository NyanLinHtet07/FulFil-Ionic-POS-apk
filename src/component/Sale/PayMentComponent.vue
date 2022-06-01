<template>
    
        <ion-header>
            <ion-title class="text-center"> <h1 class=" text-gray-800 py-2 px-3 font-bold"> Add Payment </h1> </ion-title>
        </ion-header>

        <ion-content>
           
                        <ion-item>
                             <ion-label> Title </ion-label>
                            <ion-text>{{invoice.title}}</ion-text>
                        </ion-item>
                    
                        <ion-item>

                              <ion-label> Date </ion-label>

                           
                                   <Datepicker v-model="date" placeholder="Add Date" ></Datepicker>
                           
                             
                        </ion-item>

                        
                      
                        <ion-item>
                             <ion-label> Amount </ion-label>
                            <ion-text> {{invoice.grand_total}}</ion-text>
                        </ion-item>
                    
                       <ion-item>
                            <ion-label>Customer </ion-label>
                            <ion-text> {{ invoice.customer.name}}</ion-text>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Payment Method </ion-label>
                            <ion-text> {{ invoice.payment_method}}</ion-text>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Cashier</ion-label>
                            <ion-text>{{ invoice.employee.name}}</ion-text>
                       </ion-item>
                       
                        <ion-item>
                            <ion-label> Category </ion-label>
                        </ion-item>

                        <ion-item>
                             <ion-label>Reference</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating"> Description </ion-label>
                            <ion-input input="text"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label> Input File </ion-label>
                            <input type="file" ref="img" @change="onChangeFileUpload()" />
                        </ion-item>
                     
                    
        </ion-content>

        

</template>
<script>

import { IonContent, IonTitle ,IonHeader, IonItem, IonLabel,  IonText , IonInput
            } from '@ionic/vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components:{
        IonContent,IonTitle, IonHeader,  IonItem, IonLabel, IonText , IonInput,
       Datepicker
    },

    data(){
        return{
            date: null ,
            img:'',
        }
    },

    setup() {
        
    },

    methods: {
        openDate(){
            this.dateData = true;
        },

        closeDate(){
            this.dateData = false;
        },

        onChangeFileUpload(){
            this.img = this.$refs.img.files[0];
        }
    },

    props:["invoice"]
}
</script>