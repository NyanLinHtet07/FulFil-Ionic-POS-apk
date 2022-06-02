<template>
    
        <ion-header>
            <ion-title class="text-center"> <h1 class=" text-gray-800 py-2 px-3 font-bold"> Add Payment </h1> </ion-title>
        </ion-header>

        <ion-content>
                <form @submit.prevent="submit()">
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
                             <ion-label position="floating"> Amount </ion-label>
                            <ion-input v-model="due_amt" v-if=" due_amt <= invoice.due_amount"></ion-input>

                            <ion-input v-else readonly value="Please fill valid amount" class=" text-red-700 font-bold"></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-label> Currency</ion-label>
                            <select name="" id="" v-model="form.currency" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="MMK" selected> MMK</option>
                            </select>
                        </ion-item>

                        <ion-item>
                            <ion-label> Advence </ion-label>
                            <select v-model="form.advance" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="on"> On</option>
                                <option value=""> off</option>
                            </select>

                            <!-- <ion-text v-if=" ! visible"> {{ invoice.customer.advance_balance}}</ion-text> -->
                        </ion-item>
                    
                       <ion-item>
                            <ion-label>Customer </ion-label>
                            <ion-text> {{ invoice.customer.name}}</ion-text>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Payment Method </ion-label>
                            <select name="" id="" v-model="form.payment_method" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option v-for="(method,index) in payment_method" :key="index" :value="method" >
                                    {{method}}
                                </option>
                            </select>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Cashier</ion-label>
                            <select name="" id="" v-model="form.approver_id" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                                    {{cashier.name}}
                                </option>
                            </select>
                       </ion-item>
                       
                        <ion-item>
                            <ion-label> Category </ion-label>
                            <select name="" id="" v-model="form.category" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option v-for="category in payment_category" :key="category.id" :value="category.id">
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

                        <ion-button type="submit"> Submit </ion-button>
                    </form>
                        
                     
                    
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
            due_amt:'',

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

        amount(){
            this.due_amt = this.invoice.due_amount;
        },

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
           
            data.append('customer_id', this.invoice.customer_id);
            data.append('title', this.invoice.title);

            if( this.due_amt > this.invoice.due_amount){
                 data.append('amount', 0);
            }

            else {
                 data.append('amount', this.due_amt);
            }
           
            data.append('invoice_id', this.invoice.id);
            data.append('payment_method', this.form.payment_method);
            data.append('category', this.form.category);
            data.append('approver_id', this.form.approver_id);
            data.append('transaction_date', this.form.transaction_date);
            data.append('currency', this.form.currency);
            data.append('advance', this.form.advance);
            data.append('attachment',  this.form.attachmment);
            data.append('reference', this.form.reference);
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

    created(){
        this.amount();
    },

    props:["invoice", "cashiers", "payment_category", "payment_method"]
}
</script>