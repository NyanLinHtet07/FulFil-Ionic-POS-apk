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

                           <input type="date" class="bg-slate-50 mx-2 px-3 py-2 rounded" v-model="form.transaction_date">
                                   <!-- <Datepicker v-model="date" placeholder="Add Date" ></Datepicker> -->
                           
                             
                        </ion-item>

                        
                      
                        <ion-item>
                             <ion-label> Amount </ion-label>
                            <ion-text> {{invoice.due_amount}}</ion-text>
                        </ion-item>

                        <ion-item>
                            <ion-label> Currency</ion-label>
                            <select name="" id="" v-model="form.currency">
                                <option value="MMK"> MMK</option>
                            </select>
                        </ion-item>

                        <ion-item>
                            <ion-label> Advence </ion-label>
                            <select v-model="form.advance">
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
                            <select name="" id="" v-model="form.payment_method">
                                <option v-for="(method,index) in payment_method" :key="index" :value="method" >
                                    {{method}}
                                </option>
                            </select>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Cashier</ion-label>
                            <select name="" id="" v-model="form.approver_id">
                                <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                                    {{cashier.name}}
                                </option>
                            </select>
                       </ion-item>
                       
                        <ion-item>
                            <ion-label> Category </ion-label>
                            <select name="" id="" v-model="form.category">
                                <option v-for="category in payment_category" :key="category.id" :value="category.name">
                                    {{category.name}}
                                </option>
                            </select>
                        </ion-item>

                        <ion-item>
                             <ion-label position="floating">Reference</ion-label>
                             <ion-input input="text" v-model="form.reference"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating"> Description </ion-label>
                            <ion-input input="text" v-model="form.description"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label> Input File </ion-label>
                            <input type="file" ref="img" @change="onChangeFileUpload()" />
                        </ion-item>

                        <ion-button @click="submit()"> Submit </ion-button>

                        
                     
                    
        </ion-content>

        

</template>
<script>

import { IonContent, IonTitle ,IonHeader, IonItem, IonLabel,  IonText , IonInput, IonButton
            } from '@ionic/vue'

import axios from 'axios'
//import Datepicker from '@vuepic/vue-datepicker';
//import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components:{
        IonContent,IonTitle, IonHeader,  IonItem, IonLabel, IonText , IonInput, IonButton
       //Datepicker
    },

    data(){
        return{
            visiable:false,
            date: null ,
            img:'',
            m:'',

            form:{
                transaction_date:'',
                attachmment:'',
                category:'',
                payment_method:'',
                approver_id:'',
                currency:'',
                advance:'',
                reference:'',
                description:'',

            }
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
            this.form.attachmment= this.$refs.img.files[0];
        },

        adv(){
            this.visiable = true;
        },

        async submit(){
            var data = new FormData();
            data.append('title', this.invoice.title);
            data.append('customer_id', this.invoice.customer_id);
            data.append('transaction_date', this.form.transaction_date);
            data.append('amount', this.invoice.due_amount);
            data.append('category', this.form.category);
            data.append('payment_method', this.form.payment_method);
            data.append('approve_id', this.form.approver_id);
            data.append('currency', this.form.currency);
            data.append('invoice_id', this.invoice.id);
            data.append('attachment',  this.form.attachmment);
            data.append('advance', this.form.advance);
            data.append(' reference', this.form.reference);
            data.append('description', this.form.description);

             const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                         'Authorization': "Bearer" + localStorage.getItem('token'),
                        
                    }
                }
            const response = await axios.post(`https://www.fulfilmm.com/api/auth/revenues`, data, config);

            console.log(response);
        }

        
    },

    props:["invoice", "cashiers", "payment_category", "payment_method"]
}
</script>