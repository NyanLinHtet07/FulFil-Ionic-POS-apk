<template>
    <master-layout pageTitle = "Customers">
     <ion-content v-if="loading">
            <Loader/>
     </ion-content>
        <div v-else>
           
            


            <!------------------  visiable data  ---------------->

            <div v-if="visible" class="">
                <ion-searchbar debounce="500" v-model="search" placeholder=" search customers ..." animated />  
               
               
                    <ion-card>
                        <ion-card-header class=" text-center">
                            <ion-icon :icon="person" class="text-gray-700/75 text-3xl"></ion-icon>
                            <ion-card-title class=" text-lg font-bold text-lime-900/90"> Maung Hla</ion-card-title>
                           
                        </ion-card-header>
                        <ion-card-content class=" text-center">
                            <ion-item>
                                <ion-text> <ion-icon :icon="call"></ion-icon> <ion-label class=" mr-3 font-medium"> 09772996663 </ion-label></ion-text> <br/>
                                <ion-text> <ion-icon :icon="mail"></ion-icon> <ion-label class=" mr-3 font-medium">  mgmg@gmail.com</ion-label></ion-text>
                            </ion-item>

                            <ion-item>
                                <ion-grid>
                                    <ion-row>
                                        <ion-col>
                                            Hola
                                        </ion-col>
                                        <ion-col>
                                            Hola
                                        </ion-col>
                                    </ion-row>
                                </ion-grid>
                            </ion-item>  
                        </ion-card-content>
                    </ion-card>
               
            
            
            
            </div>

            <div v-if="! visible" class="flex justify-center items-center h-screen">
                
                    <ion-content class="ion-padding" > 
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
import { IonContent, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonSegment, IonSegmentButton, IonSearchbar,
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

            
        }
    },

   

    components:{
            IonInput, IonSelect, IonSelectOption, IonItem, IonLabel,
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
                        })
                        .finally(() => this.loading = false)
        },

        async getCus(){
            this.loading = true
            await axios.get(`api_customer`)
                        .then( res => {
                            this.customers = res.data
                        })
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
        this.getCus();
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