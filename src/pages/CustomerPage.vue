<template>
    <master-layout pageTitle = "Customers">
     <ion-content v-if="loading">
            <Loader/>
     </ion-content>
        <div v-else>
           
            


            <!------------------  visiable data  ---------------->

            <div v-if="visible" class=" mb-20">
                <ion-searchbar debounce="500" v-model="search" placeholder=" search customers ..." animated />  
               
               
                    <ion-card v-for=" cus in filterCustomers" :key="cus.id" class=" my-3">
                        <ion-card-header class=" text-center border-b-2 border-gray-200 bg-slate-50">
                            <ion-avatar class=" mx-auto block">
                                 <ion-icon :icon="person" class="text-sky-900/75 text-3xl"></ion-icon>
                            </ion-avatar>
                           
                            <ion-card-title class=" text-lg font-bold text-lime-900/90"> {{cus.name}}</ion-card-title>
                           
                                <ion-label> <ion-icon :icon="call"></ion-icon> <ion-text class=" mr-4 font-medium"> {{cus.phone}} </ion-text></ion-label> <br/>
                                <ion-label> <ion-icon :icon="mail"></ion-icon> <ion-text class=" mr-4 font-medium"> {{cus.email}}</ion-text></ion-label>
                            
                           
                        </ion-card-header>
                        <ion-card-content class=" text-center text-white bg-sky-900/60">
                           
                                <ion-grid>
                                    <ion-row>
                                        <ion-col>
                                           <div> <ion-text class=" font-bold text-lg">{{ cus.current_credit}}</ion-text> </div>
                                            <ion-label> Current Credit  </ion-label>

                                        </ion-col>
                                        <ion-col>
                                           <div> <ion-text class=" font-bold text-lg"> {{ cus.credit_limit }} </ion-text> </div>
                                            <ion-label>Credit Limit </ion-label>

                                        </ion-col>
                                    </ion-row>
                                </ion-grid>
                         
                        </ion-card-content>
                    </ion-card>
               
            
            
            
            </div>

            <div v-if="! visible" class="flex justify-center items-center h-screen mb-20">
                
                    <ion-content class="ion-padding" > 
                            <form @submit.prevent="submit">
                                <ion-item>
                                    <ion-label position="floating"> Enter Name </ion-label>
                                    <ion-input type="text" v-model="form.name" required="required"></ion-input>
                                </ion-item>
                        
                                <ion-item>
                                    <ion-label position="floating"> Enter Email</ion-label>
                                    <ion-input type="text" v-model="form.email" required="required"></ion-input>
                                </ion-item>
                            
                            <ion-item>
                                <ion-label> Select Company</ion-label>
                                <ion-select v-model="form.company_id" required>
                                    <ion-select-option v-for="c in company" :key="c.id" :value=c.id> {{c.name}}</ion-select-option>
                                </ion-select> 
                            </ion-item>
                        
                        <ion-item>
                            <ion-label position="floating"> Enter Phone Number</ion-label>
                                <ion-input type="text" v-model="form.phone" required="required"></ion-input>
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
                        </ion-content>
          
            </div>

             <ion-footer class="ion-no-border">
                 <ion-toolbar>
                      <ion-segment  color="secondary">
                        <ion-segment-button @click="cus()">
                        <ion-icon :icon="personOutline"></ion-icon>
                        </ion-segment-button>
                        <ion-segment-button @click="add()">
                        <ion-icon :icon="personAddOutline"></ion-icon>
                        </ion-segment-button>
                     </ion-segment>
                 </ion-toolbar>

            </ion-footer>
       
        </div>
  
    </master-layout>
</template>
<script>
import {IonAvatar,IonContent, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonSegment, IonSegmentButton, IonSearchbar,
         IonButton, IonSpinner, IonFooter, IonToolbar, IonIcon,
         IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonGrid, IonRow, IonCol } from '@ionic/vue';

import { personAddOutline, personOutline , person, mail, call} from 'ionicons/icons';
import Loader from '../component/LoaderComponent.vue'
import axios from 'axios';
export default {
    //props:['close'],

    setup() {
        return{
            personAddOutline, personOutline , person , mail, call
        }
        
    },  
    
    data() {
        return {
            loading: false,
            posting: false,
            visible: false,
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
            customers:[],
            search:'',

            
        }
    },

   

    components:{
         IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonAvatar,
         IonButton, IonSpinner, Loader, IonContent, IonSegment, IonSegmentButton, IonFooter, IonToolbar, IonIcon,
         IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonText, IonGrid, IonRow, IonCol
    },
 
    methods:{

        cus(){
            this.visible = true;
        },

        add(){
            this.visible = false;
        },  

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
                                this.customers = res.data.allcustomers;
                        })
                        .finally(() => this.loading = false)
        },

        // async getCus(){
        //     this.loading = true
        //     await axios.get(`api_customers`)
        //                 .then( res => {
        //                     this.customers = res.data.customer
        //                 })
        // },

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
            this.getData();
            //window.location.reload();
            //console.log(response)
        } 
    },

    computed:{
        filterCustomers(){
            return this.customers.filter((cus) => {
                return cus.name.toLowerCase().match(this.search.toLowerCase())
            })
        }
    },

    created(){
        this.getData();
        //this.getCus();
    }
}
</script>
<style scoped>
      .top{
         position: fixed;
         top: 10;
         background: white;
      
    }
    ion-searchbar{
        --border-radius:30px;
    }

    ion-footer{
         position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: white;
    }

    ion-card{
        border-radius: 20px;
    }
</style>