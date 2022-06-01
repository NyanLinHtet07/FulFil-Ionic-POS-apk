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

                           <input type="date" class="bg-slate-50 mx-2 px-3 py-2 rounded">
                                   <!-- <Datepicker v-model="date" placeholder="Add Date" ></Datepicker> -->
                           
                             
                        </ion-item>

                        
                      
                        <ion-item>
                             <ion-label> Amount </ion-label>
                            <ion-text> {{invoice.due_amount}}</ion-text>
                        </ion-item>

                        <ion-item>
                            <ion-label> Advence </ion-label>
                            <select>
                                <option value="on" @click="adv"> On</option>
                                <option value=""> off</option>
                            </select>

                            <ion-text v-if=" ! visible"> {{ invoice.customer.advance_balance}}</ion-text>
                        </ion-item>
                    
                       <ion-item>
                            <ion-label>Customer </ion-label>
                            <ion-text> {{ invoice.customer.name}}</ion-text>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Payment Method </ion-label>
                            <select name="" id="" v-model="m">
                                <option v-for="(method,index) in payment_method" :key="index" :value="method" >
                                    {{method}}
                                </option>
                            </select>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Cashier</ion-label>
                            <select name="" id="">
                                <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                                    {{cashier.name}}
                                </option>
                            </select>
                       </ion-item>
                       
                        <ion-item>
                            <ion-label> Category </ion-label>
                            <select name="" id="">
                                <option v-for="category in payment_category" :key="category.id" :value="category.name">
                                    {{category.name}}
                                </option>
                            </select>
                        </ion-item>

                        <ion-item>
                             <ion-label>Reference</ion-label>
                             <ion-input input="text"></ion-input>
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

import { IonContent, IonTitle ,IonHeader, IonItem, IonLabel,  IonText , IonInput,
            } from '@ionic/vue'
//import Datepicker from '@vuepic/vue-datepicker';
//import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components:{
        IonContent,IonTitle, IonHeader,  IonItem, IonLabel, IonText , IonInput,
       //Datepicker
    },

    data(){
        return{
            visiable:false,
            date: null ,
            img:'',
            m:'',
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
        },

        adv(){
            this.visiable = true;
        }

        
    },

    props:["invoice", "cashiers", "payment_category", "payment_method"]
}
</script>