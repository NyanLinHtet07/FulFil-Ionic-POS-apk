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
                            <ion-select name="" id="" v-model="form.currency" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <ion-select-option value="MMK" selected> MMK</ion-select-option>
                            </ion-select>
                             <small v-if="! form.currency" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Currency</small>
                        </ion-item>

                        <ion-item>
                            <ion-label> Advence </ion-label>
                            <ion-select v-model="form.advance" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <ion-select-option value="on"> On</ion-select-option>
                                <ion-select-option value=""> off</ion-select-option>
                            </ion-select>
                             <!-- <small v-if="! form.advance" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select advance</small> -->

                            <!-- <ion-text v-if=" ! visible"> {{ invoice.customer.advance_balance}}</ion-text> -->
                        </ion-item>
                    
                       <ion-item>
                            <ion-label>Customer </ion-label>
                            <ion-text> {{ invoice.customer.name}}</ion-text>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Payment Method </ion-label>
                            <ion-select name="" id="" v-model="form.payment_method" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <ion-select-option v-for="(method,index) in payment_method" :key="index" :value="method" >
                                    {{method}}
                                </ion-select-option>
                            </ion-select>
                             <small v-if="! form.payment_method" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Payment Method</small>
                       </ion-item>
                       
                       <ion-item>
                            <ion-label> Cashier</ion-label>
                            <ion-select name="" id="" v-model="form.approver_id" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <ion-select-option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                                    {{cashier.name}}
                                </ion-select-option>
                            </ion-select>
                             <small v-if="! form.approver_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Cashier</small>
                       </ion-item>
                       
                        <ion-item>
                            <ion-label> Category </ion-label>
                            <ion-select name="" id="" v-model="form.category" class="block appearance-none text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <ion-select-option v-for="category in payment_category" :key="category.id" :value="category.id">
                                    {{category.name}}
                                </ion-select-option>
                            </ion-select>
                             <small v-if="! form.category" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Category</small>
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
                            <label class=" text-sm text-ellipsis text-red-800 font-bold"> you can upload files up to 2MB</label>
                        </ion-item>
                        
                        <div class="text-right my-2">
                           
                             <ion-button @click="modalController.dismiss()" color="danger" shape="round" class="mx-3"> close</ion-button>
                             <ion-button  :disabled="posting" type="submit" shape="round"> Submit </ion-button>  <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
                            
                        </div>
                       
                    </form>
                        
                     
                    
        </ion-content>

        

</template>
<script>

import { IonContent, IonTitle ,IonHeader, IonItem, IonLabel,  IonText , IonInput, IonButton,
          IonSelect, IonSelectOption, modalController, alertController  } from '@ionic/vue'

import axios from 'axios'
import moment  from 'moment'
//import Datepicker from '@vuepic/vue-datepicker';
//import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components:{
        IonContent,IonTitle, IonHeader,  IonItem, IonLabel, IonText , IonInput, IonButton, IonSelect, IonSelectOption
       //Datepicker
    },

     setup(){
        return{
            modalController,
        }
    },


    data(){
        return{
            posting:false,
            visiable:false,
            date: null ,
            img:'',
            err:'',
            due_amt:'',
            moment: moment,

            form:{
                transaction_date:moment().format('YYYY-MM-DD'),
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

   

    methods: {
         async presentAlert() {
                const alert = await alertController
                    .create({
                    cssClass: 'my-custom-class',
                    header: 'Success Message',
                    //subHeader: 'Subtitle',
                    message: 'Sucessfully, Data uploaded',
                    buttons: ['OK'],
                    });
                await alert.present();

                const { role } = await alert.onDidDismiss();
                console.log('onDidDismiss resolved with role', role);
                },

        reset(){
            this.form = {
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
        },
         async closeModal(){
            await modalController.dismiss();
         },

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
            await axios.post(`revenues`, data, config)
                    .then( response => {
                        this.err = response.message;
                       
                           this.posting = false;
                           this.reset();
                           this.closeModal();
                           window.location.reload();
                    })
                    .catch( error => {
                        console.log(error);
                        this.posting = false;
                    });
           
            
           
        }

        
    },

    created(){
        this.amount();
    },

    props:["invoice", "cashiers", "payment_category", "payment_method", "allData"]
}
</script>