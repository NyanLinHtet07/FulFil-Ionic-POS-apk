<template>
    <master-layout pageTitle = "Customer Create">
     <div v-if="loading">
            <Loader/>
        </div>
        <div v-else class="flex justify-center items-center h-screen bg-gradient-to-b from-white to-blue-100">
        <ion-card class=" w-4/6 rounded-lg">
                <ion-card-content class="ion-padding" > 
                        <form @submit.prevent="submit">
                            <ion-item>
                                <ion-label position="floating"> Enter Name </ion-label>
                                <ion-input type="text" v-model="form.name"></ion-input>
                            </ion-item>
                    
                            <ion-item>
                                <ion-label position="floating"> Enter Email</ion-label>
                                <ion-input type="text" v-model="form.email"></ion-input>
                            </ion-item>
                        
                        <ion-item>
                            <ion-label> Select Company</ion-label>
                            <ion-select v-model="form.company_id">
                                <ion-select-option v-for="c in company" :key="c.id" :value=c.id> {{c.name}}</ion-select-option>
                            </ion-select> 
                        </ion-item>
                    
                    <ion-item>
                        <ion-label position="floating"> Enter Phone Number</ion-label>
                            <ion-input type="text" v-model="form.phone"></ion-input>
                    </ion-item>
                    
                    <ion-item>
                            <ion-label> Select Customer Type</ion-label>
                            <ion-select v-model="form.customer_type">
                                <ion-select-option value="customer"> Customer </ion-select-option>
                            </ion-select>
                    </ion-item>

                    <ion-item>
                            <ion-label> Select Gender</ion-label>
                            <ion-select v-model="form.gender">
                                <ion-select-option value="male"> Male </ion-select-option>
                                <ion-select-option value="female"> Female </ion-select-option>
                            </ion-select>
                    </ion-item>

                    <ion-item>
                            <ion-label> Select Zone</ion-label>
                            <ion-select v-model="form.zone_id">
                                <ion-select-option v-for="z in zone" :key="z.id" :value=z.id> {{z.name}} </ion-select-option>
                                
                            </ion-select>
                    </ion-item>

                    
                    
                        <!-- <select v-model="form.zone_id">
                        <option v-for="z in zone" :key="z.id" :value=z.id> {{z.name}}</option>
                    </select> <br> -->

                        <ion-item>
                            <ion-label> Select Region</ion-label>
                            <ion-select v-model="form.region_id">
                                <ion-select-option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}} </ion-select-option>
                                
                            </ion-select>
                    </ion-item>

                    
                        <!-- <select v-model="form.region_id">
                        <option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}}</option>
                    </select> <br> -->

                    <div class="text-center mt-5">
                        
                        <ion-button :disabled="posting" type="submit"  shape="round" color="secondary"> Submit </ion-button>
                        <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
                        
                    </div>
                    

                    </form>
                    </ion-card-content>
        </ion-card>
        </div>
  
    </master-layout>
</template>
<script>
import { IonCard, IonCardContent , IonInput, IonSelect, IonSelectOption, IonItem, IonLabel,
         IonButton, IonSpinner } from '@ionic/vue';
import Loader from '../component/LoaderComponent.vue'
import axios from 'axios';
export default {
    //props:['close'],

    
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
                region_id:'',
            },

            company:[],
            zone:[],
            region:[],

            
        }
    },

   

    components:{
            IonCard,IonCardContent, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel,
         IonButton, IonSpinner, Loader
    },
 
    methods:{

        // closeM(){
        //     this.$emit('close', {
        //         foo: 'bar'
        //     })
        //     this.close();
        // },  

        reset(){
            this.form = {
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                region_id:'',
            }
        },

       
        async getData(){
            this.loading = true
            await axios.get(`mobile_invoice/create`)
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
                region_id: this.form.region_id
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            });
            this.reset();
            this.posting = false;

            //console.log(response)
        } 
    },

    created(){
        this.getData();
    }
}
</script>