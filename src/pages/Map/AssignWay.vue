<template>
    <master-layout page-title="Assign Ways">
        <ion-content v-if="loading">
                <Loader/>
        </ion-content>
        <ion-content v-else>
            <div v-if="! assign.length" class="">
                <img src="/assets/direction.svg" alt="" class=" w-60  mx-auto  mt-32 block">
                <ion-text> <h2 class=" text-center leading-4 space-x-2 font-bold text-gray-600"> There is no Assign Way </h2></ion-text>
            </div>
             <ion-list v-else v-for="a in assign" :key="a.id"> 
                    
                    
                    <ion-card   class="my-4">
                        <ion-card-header class="text-white bg-emerald-400/60">
                            
                            <ion-card-title> <h4> Way Id - {{a.way.way_id}}  </h4></ion-card-title>
                           
                            <ion-card-subtitle class=" text-gray-700">  Start Date -  {{moment(a.start_date).format("MMM Do YYYY")}} </ion-card-subtitle>
                           
                            
                        </ion-card-header>
                        <ion-card-content class=" text-gray-700 font-medium">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                       <ion-label> Way Name </ion-label>
                                    </ion-col>
                                    <ion-col class=" font-semibold">
                                        <ion-text> {{ a.way.name}} </ion-text>
                                    </ion-col>
                                   
                                </ion-row>

                                 <ion-row>
                                    <ion-col>
                                       <ion-label> Assign Type </ion-label>
                                    </ion-col>
                                    <ion-col class=" font-semibold">
                                        <ion-text v-if="a.type == 1"> Group </ion-text>
                                        <ion-text v-if="a.type == 0"> Employee</ion-text>
                                    </ion-col>
                                  
                                </ion-row>

                                 <ion-row>
                                    <ion-col>
                                       <ion-label> Assign Group/ Employee </ion-label>
                                    </ion-col>
                                    <ion-col class=" font-semibold">
                                        <ion-text v-if="a.type == 1"> {{a.group.name}} </ion-text>
                                        <ion-text v-else>{{a.assign_employee.name}}</ion-text>
                                    </ion-col>
                                   
                                </ion-row>

                             
                            </ion-grid> 
                            <div class="text-right">   
                                <ion-button  color="secondary" shape="round" :router-link="`/assign/${a.id}`"> 
                                    Map
                            </ion-button>
                            </div>
                             
                        </ion-card-content>

                    </ion-card>
                </ion-list>
        </ion-content>
    </master-layout>
</template>
<script>
import {  IonContent,
         IonList ,IonLabel,IonText, IonGrid, IonRow, IonCol, 
        IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent} from '@ionic/vue';

import Loader from '../../component/LoaderComponent.vue'
import moment from 'moment';
import axios from 'axios';

export default {
     components:{
      
      
        IonContent,
      
        IonLabel,
        IonList,
       IonText,
        IonGrid,
        IonRow, IonCol,
        IonButton,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle,
        Loader

    },

    data() {
        return {
          loading: false,
          assign:[],
          moment: moment
        }
    },

    methods:{
       async getData(){
            this.loading = true

            await axios.get('assign_saleway', {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
            .then( response => {
              this.assign = response.data.assign_way
            })

            .finally(() => this.loading = false)
            
        }

    },

    created() {
        this.getData()
    },


    }
</script>

<style scoped>
     ion-card{
        border-radius: 20px;
    }
</style>