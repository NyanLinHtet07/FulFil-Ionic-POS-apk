<template>
    <master-layout pageTitle="test">
        <ion-content>
             <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)"  pull-factor="0.5" pull-min="100" pull-max="200">
            <ion-refresher-content>
                <div class=" bg-red-600">
                    <input type="text"  v-model="loream" ref="data" id="data" name="data">
                    {{text}}
                </div>
            </ion-refresher-content>
            </ion-refresher>
        </ion-content>
       
   
        
    </master-layout>
   
</template>
<script>
import {  IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons'

export default {
    components:{
        IonRefresher, IonRefresherContent
    },

    setup(){
        const doRefresh = (event) => {
            //console.log('Begin async');

            setTimeout(() => {
                //console.log('Async operation has ended');
                event.target.complete();
            }, 2000 );
        }

        return {chevronDownCircleOutline, doRefresh}
    },

    data(){
        // let loream = 'noob'; 
        return{
            text:'',
            loream:'noo',
        }
    },

    // methods:{
    //     dat(){
    //          this.text = this.$refs.data.value
    //     }
    // },
    computed:{
        // result(){
        //      return { this.text : };
        // }
       
    },

    mounted(){
        this.text = this.$refs.data.value
    }

  
}
</script>