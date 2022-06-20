<template>
    <div v-if="loading">
        <Loader/>
    </div>
    <ion-header v-else>
        <ion-toolbar>
        <ion-title> Create New Customer</ion-title>
        </ion-toolbar>
    </ion-header> 
    <ion-content class="ion-padding"> 
         <form @submit.prevent="submit">
             <ion-item>
                                        <ion-label> Region</ion-label>
                                        <ion-text v-for=" r in region" :key="r.id" class=" font-bold">{{r.name}}</ion-text>
                                        <!-- <ion-select v-model="form.region_id">
                                            <ion-select-option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}} </ion-select-option>
                                            
                                        </ion-select> -->
                                        <!-- <small v-if="! form.region_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Region</small> -->
                </ion-item>

            <ion-item>
                <ion-label position="floating"> Enter Name </ion-label>
                 <ion-input type="text" v-model="form.name"  required="required"></ion-input>
                 <small v-if="! form.name" class=" text-sm text-ellipsis text-red-800 font-bold">Customer Name Require</small>

            </ion-item>
       
            <ion-item>
                <ion-label position="floating"> Enter Email</ion-label>
                <ion-input type="text" v-model="form.email"  required="required"></ion-input>
                <small v-if="! form.email" class=" text-sm text-ellipsis text-red-800 font-bold">Customer Email Require</small>
            </ion-item>
        
      
        
       <ion-item>
           <ion-label position="floating"> Enter Phone Number</ion-label>
            <ion-input type="text" v-model="form.phone"  required="required"></ion-input>
            <small v-if="! form.phone" class=" text-sm text-ellipsis text-red-800 font-bold">Customer Phone Number Require</small>
       </ion-item>

         <ion-item>
            <ion-label> Select Shop</ion-label>
            <ion-select v-model="form.company_id">
                <ion-select-option v-for="c in company" :key="c.id" :value=c.id> {{c.name}}</ion-select-option>
            </ion-select> 
            <small v-if="! form.company_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Shop</small>
        </ion-item>
      
      <ion-item>
            <ion-label> Select Customer Type</ion-label>
            <ion-select v-model="form.customer_type">
                <ion-select-option value="customer"> Customer </ion-select-option>
            </ion-select>
             <small v-if="! form.customer_type" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Type</small>
      </ion-item>

      <ion-item>
            <ion-label> Select Gender</ion-label>
            <ion-select v-model="form.gender">
                <ion-select-option value="male"> Male </ion-select-option>
                 <ion-select-option value="female"> Female </ion-select-option>
            </ion-select>
             <small v-if="! form.gender" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Gender</small>
      </ion-item>

      <ion-item>
            <ion-label> Select Zone</ion-label>
            <ion-select v-model="form.zone_id">
                <ion-select-option v-for="z in zone" :key="z.id" :value=z.id> {{z.name}} </ion-select-option>
                
            </ion-select>
             <small v-if="! form.zone_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Zone</small>
      </ion-item>

     
      
        <!-- <select v-model="form.zone_id">
           <option v-for="z in zone" :key="z.id" :value=z.id> {{z.name}}</option>
       </select> <br> -->

        <!-- <ion-item>
            <ion-label> Select Region</ion-label>
            <ion-select v-model="form.region_id">
                <ion-select-option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}} </ion-select-option>
                
            </ion-select>
             <small v-if="! form.region_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Region</small>
      </ion-item> -->

     
        <!-- <select v-model="form.region_id">
           <option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}}</option>
       </select> <br> -->

    <div class="text-right">
         <ion-button @click="modalController.dismiss()" color="danger" shape="round" class="mx-3"> close</ion-button>
         
         <ion-button :disabled="posting" type="submit"  shape="round" color="secondary"> Submit </ion-button>
         <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
        
    </div>
      

    </form>
    </ion-content>
</template>

<script>
 import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel,
         IonButton, IonSpinner, modalController, alertController } from '@ionic/vue';
import axios from 'axios';
import Loader from '../LoaderComponent.vue'
export default {
    props:{
        datas:{type: Function}
    },

    setup(){
        return{
            modalController,
        }
    },

    data() {
        return {
            loading: false,
            posting: false,
            form:{
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                //region_id:'',
            },

            err:'',

            company:[],
            zone:[],
            region:[],
            errors:[],

            
        }
    },

   

    components:{
        IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel,
         IonButton, IonSpinner, Loader
    },
 
    methods:{

        // closeM(){
        //     this.$emit('close', {
        //         foo: 'bar'
        //     })
        //     this.close();
        // },  
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
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                //region_id:'',
            }
        },

        async closeModal(){
            await modalController.dismiss();
         },

        async getData(){
             this.loading = true
            await axios.get(`mobile_invoice/create` , {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            })
                        .then( res => {
                                this.company = res.data.companies;
                                this.zone = res.data.zone;
                                this.region = res.data.region;
                        })
                        .finally(() => this.loading = false)
        },

       async submit(){
           this.posting = true;
             await axios.post(`api_customers`, {
                name: this.form.name,
                email: this.form.email,
                company_id: this.form.company_id,
                phone: this.form.phone,
                customer_type: this.form.customer_type,
                gender: this.form.gender,
                zone_id: this.form.zone_id,
                //region_id: this.form.region_id
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            })
            .then((response) => {
                     this.err = response.message
                     this.posting = false;
                     this.reset();
                     this.datas();
                    
                     this.presentAlert();
                     this.closeModal();
                     
                })
            .catch( error => {
                console.log(error);
                this.posting = false;
            })

            //console.log(response)
        } 
    },

    created(){
        this.getData();
    }
}
</script>