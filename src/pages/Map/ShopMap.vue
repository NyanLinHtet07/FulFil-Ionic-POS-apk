<template>
    <master-layout pageTitle="Shops">
        <ion-content v-if="loading">
            <Loader/>
        </ion-content>

             <div v-else>
                 <div v-if="visible" class=" mb-14 pb-3">
             
                    <ion-searchbar debounce="500" v-model="search" placeholder=" search shops ..." animated class="fixed top-16 bg-white z-30 w-full"/> 
                    <div class=" mt-28">

                        <ion-list>
                            <ion-item v-for=" shop in filteredShop" :key="shop.id">
                                <ion-label> <ion-text class=" mr-4 font-medium text-sm text-gray-700 "> {{shop.name}} </ion-text> </ion-label>
                                 <ion-label> <ion-icon :icon="call" class="text-sm text-gray-700"></ion-icon> <ion-text class=" mr-4 font-medium text-sm text-gray-500"> {{shop.phone}} </ion-text></ion-label> 
                                 <ion-button :router-link="`/shops/detail/${shop.id}`" color="primary" shape="round" class=" text-lime-800 font-bold" size="small"> Details </ion-button>
                            </ion-item>
                        </ion-list>
                    <!-- <ion-card v-for=" shop in shops" :key="shop.id" class="mt-6">
                            <ion-card-header class=" text-center border-b-2 border-gray-200 bg-slate-50">
                                
                            
                                <ion-card-title class=" text-lg font-bold text-lime-900/90"> {{shop.name}}</ion-card-title>
                            
                                    <ion-label> <ion-icon :icon="call"></ion-icon> <ion-text class=" mr-4 font-medium"> {{shop.phone}} </ion-text></ion-label> <br/>
                                    <ion-label> <ion-icon :icon="mail"></ion-icon> <ion-text class=" mr-4 font-medium"> {{shop.email}}</ion-text></ion-label>
                                
                            
                            </ion-card-header>
                            <ion-card-content class=" text-center text-white bg-emerald-400/80">
                            
                                    <ion-grid>
                                        <ion-row>
                                        
                                            <ion-col>
                                                <div>
                                                    <ion-text class="font-semibold text-sm"> Vire Detail </ion-text>   <br>   
                                                    <ion-button :router-link="`/customers/invoices/${shop.id}`" color="light" shape="round" class=" text-lime-800 font-bold"> View </ion-button>
                                                </div>
                                            </ion-col>
                                        </ion-row>
                                    </ion-grid>
                            
                            </ion-card-content>
                        </ion-card> -->
                </div>
                
                </div>

                <div  v-if="! visible" class="flex justify-center items-center h-screen mt-12">
                         <ion-content class="ion-padding" > 
                             <GMapMap
                                :center = "center"
                                :zoom="15"
                                map-type-id="terrain"
                                class="mx-auto block w-11/12 h-2/4 px-3 py-2 rounded-lg shadow-md"
                                @click="mark">
                                <GMapMarker
                                    :position="{lat: Number(marker.lat) , lng: Number(marker.lng)}"
                                />
                            </GMapMap>
                            <form @submit.prevent="submit">
                               

                                <ion-item>
                                    <ion-label position="floating"> Enter Name </ion-label>
                                    <ion-input type="text" v-model="form.name" required="required"></ion-input>
                                    <small v-if="! form.name" class="text-sm text-ellipsis text-red-800 font-bold">Shop Name Required</small>
                                </ion-item>
                        
                                <ion-item>
                                    <ion-label position="floating"> Enter Contact</ion-label>
                                    <ion-input type="text" v-model="form.contact" required="required"></ion-input>
                                     <small v-if="! form.contact" class="text-sm text-ellipsis text-red-800 font-bold">Contact Required</small>
                                </ion-item>

                            <ion-item>
                                <ion-label position="floating"> Enter Phone Number</ion-label>
                                    <ion-input type="text" v-model="form.phone" required="required"></ion-input>
                                    <small v-if="! form.phone" class=" text-sm text-ellipsis text-red-800 font-bold">Phone Number Require</small>
                            </ion-item>
                        
                        
                        <ion-item>
                                <ion-label> Select Branch</ion-label>
                                <ion-select v-model="form.branch_id">
                                    <ion-select-option v-for="branch in branches" :key="branch.id" :value="branch.id"> {{branch.name}}</ion-select-option>
                                </ion-select>
                                <small v-if="! form.branch_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Type</small>
                        </ion-item>

                       

                        <ion-item>
                            <ion-label position="floating"> Enter Description</ion-label>
                                    <ion-input type="text" v-model="form.description"></ion-input>
                                    <!-- <small v-if="! form.description" class=" text-sm text-ellipsis text-red-800 font-bold">Customer Phone Number Require</small> -->
                         
                        </ion-item>

                        <ion-item>
                            <ion-label> Input File </ion-label>
                            <input type="file" ref="img" @change="onChangeFileUpload()" />
                            <label class=" text-sm text-ellipsis text-red-800 font-bold"> you can upload files up to 2MB</label>
                        </ion-item>
               
                        <div class="text-center mt-5 mb-36">
                            
                            <ion-button :disabled="posting" type="submit"  shape="round" color="secondary"> Submit </ion-button>
                            <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
                            
                        </div>

                        

                        </form>

                        
                            
                        </ion-content>
                </div>

                <ion-footer class="ion-no-border">
                 <ion-toolbar>
                      <ion-segment  color="secondary">
                        <ion-segment-button @click="shop()">
                            Shop
                        </ion-segment-button>
                        <ion-segment-button @click="add()">
                        Create
                        </ion-segment-button>
                     </ion-segment>
                 </ion-toolbar>

            </ion-footer>
       
             </div>
    
    </master-layout>    
</template>
<script>
import {IonContent, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonSegment, IonSegmentButton, IonSearchbar,
         IonButton, IonSpinner, IonFooter, IonToolbar, IonIcon, IonList,
         IonText } from '@ionic/vue';

import Loader from '../../component/LoaderComponent.vue'

import { mail, call} from 'ionicons/icons';

import axios from 'axios';

export default {
    data(){
        return {
            center: {lat: 16.932521760828777, lng: 96.15880038438864},
            posting: false,
            loading: false,
            visible: true,
            shops:[],
            branches:[],
            search:'',
            marker:{
                lat:'',
                lng:'',
            },
            form:{
                name:'',
                pictrue:'',
                contact:'',
                phone:'',
                branch_id:'',
                description:'',
            },
            img:'',
            m:'',
        }
    },

    setup() {
        return{
             mail, call
        }
        
    },  

    components:{
         IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonList,
         IonButton, IonSpinner, Loader, IonContent, IonSegment, IonSegmentButton, IonFooter, IonToolbar, IonIcon,
         IonSearchbar, IonText, 
    },

    methods: {

        reset(){
            this.form = {
                name:'',
                img:'',
                contact:'',
                phone:'',
                branch_id:'',
                description:'',
            }
        },

         async getData(){
            this.loading = true;
            await axios.get(`shops` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                  this.shops = res.data.shops;
                  this.branches = res.data.branch;
                })
                .finally(() => this.loading = false)
        },

        shop(){
            this.visible = true;
        },

        add(){
            this.visible = false;
        },  

        mark(event){
            //  console.log(event.latLng.lat());
            // console.log(event.latLng.lng());

            this.marker.lat = event.latLng.lat();
            this.marker.lng = event.latLng.lng();

             //console.log(this.marker.lat +','+ this.marker.lng);
           
        },

        onChangeFileUpload(){
            this.form.img = this.$refs.img.files[0];
        },

        async submit(){
             this.posting = true
             
            let location = this.marker.lat +','+ this.marker.lng;
            var data = new FormData();

            data.append('name' , this.form.name);
            data.append('location', location);

            if(! this.form.img){
                 data.append('picture', 0);
            }
            else{
                 data.append('picture', this.form.img);
            }
           
            data.append('contact', this.form.contact);
            data.append('phone', this.form.phone);
            data.append('branch_id', this.form.branch_id);
            data.append('description', this.form.description);

           
               await axios.post(`shops`, data,{
             headers: {
                 'content-type': 'multipart/form-data',
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },}).then(
                (res) => {
                    this.m = res.message;
                     this.posting = false;
                     this.reset();
                     this.shop();
                     this.getData();
                    
                        this.marker = {
                            lat :'',
                            lng:'',
                        }
                }
            ).catch( error => {
                console.log(error);
                this.posting = false;
            });
           

            //console.log(res);
        }
    },

    computed:{
        filteredShop(){
            return this.shops.filter( (s) => {
               return  s.name.toLowerCase().match(this.search.toLowerCase());
            })
        }
    },

    created() {
        this.getData();
      
    },

}

</script>
<style scoped>
     .top{
         position: fixed;
         top: 30;
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