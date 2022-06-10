<template>
    <master-layout pageTitle="Invoice Detail">
        
            <ion-content v-if="loading">
                    <Loader/>
            </ion-content>
            <ion-content v-else> 
                <ion-item v-if=" invoice.cancel == 1">
                    <ion-text class=" text-red-700 font-bold text-xl"> This invoice was canceled</ion-text>
                </ion-item>
                <ion-item v-else>
                    <ion-button class="mx-2" @click="markSent()" :disabled="invoice.mark_sent == 1"> Mark Send </ion-button>
                
                    <ion-button @click="openPayment()" class="mx-2" color="tertiary"> Make Paymeny </ion-button>
                    
                    <div v-if="invoice.mark_sent == 0">
                        <ion-button @click="edit()" v-if=" !visible"  color="secondary"> Edit </ion-button>
                        <ion-button @click="detail()" v-if="visible" color="warning"> Detail </ion-button>
                    </div>
                    <div v-else>
                        <ion-button disabled color="medium"> Disable To edit</ion-button>
                    </div>
                    
                    <ion-button color="medium"> Stock Out </ion-button>
                    <ion-button @click="print()" color="success"> print </ion-button>

                    <ion-button @click="destroy()" shape="round" color="danger"> <ion-icon :icon="closeCircleOutline"></ion-icon></ion-button>

                </ion-item>
                
                <div class=" bg-white rounded-md shadow-md px-3 py-6 mx-3" v-if="! visible" id="print-wrapper">
                            <div class=" flex justify-between mb-5">
                                <div>
                                     <img :src= "`https://fulfilmm.com/img/profiles/` + company.logo" class="" />

                                      <div class=" mt-3 px-3 ml-5">
                                    
                                      
                                  
                                        <div class="text-lime-900 text-sm">
                                            <div class=" font-semibold py-2">
                                            <div class=" my-1">
                                                 <ion-icon :icon="storefrontOutline"></ion-icon>
                                                  <span class="my-1 ml-4"> {{company.name}}</span>
                                            </div>
                                            <div class="my-1">
                                                <ion-icon :icon="callOutline"></ion-icon>
                                                 <span class="my-1 ml-4"> {{company.phone}}</span>
                                            </div>
                                            <div class="my-1">
                                                 <ion-icon :icon="phonePortraitOutline"></ion-icon>
                                                 <span class="my-1 ml-4">  {{company.mobile_phone}}</span>
                                            </div>
                                            <div class="my-1">
                                                <ion-icon :icon="sendOutline"></ion-icon>
                                                 <span class="my-1 ml-4">  {{company.fax}}</span>
                                            </div>
                                            <div class="my-1">
                                                <ion-icon :icon="mailOpenOutline"></ion-icon>
                                                <span class="my-1 ml-4">  {{company.email}}</span>
                                            </div>
                                            <div class="my-1">
                                                 <ion-icon :icon="globeOutline"></ion-icon>
                                               
                                                 <span class="my-1 ml-4">  {{company.web_link}}</span>

                                            </div>
                                            <div class="my-1">
                                                <ion-icon :icon="locateOutline"></ion-icon>
                                                <span class="my-1 ml-4">  {{company.address}}</span>
                                            </div>
                                           
                                           

                                    </div>
                                    <!-- <div class=" font-semibold py-2">
                                    </div> -->


                                           
                                        
                                        </div>

                                    </div>
                                </div>

                                <div class=" mt-8 mr-6 px-3 text-emerald-800 grid grid-cols-2">
                                    <div class="col-span-2">
                                        <h2 class="text-emerald-900 font-thin text-2xl">{{invoice.invoice_id}}</h2>
                                    </div>
                                     <div class="col-span-2">
                                          <h3 class=" text-emerald-700  font-semibold text-2xl font-serif"> To</h3>
                                    </div>
                                     <div class="">
                                                 <p class="my-1"> Name</p> 
                                                 <p class="my-1"> Phone.No</p>
                                                 <p class="my-1"> Email</p>
                                                 <p class="my-1"> Address</p>
                                                 <p class="my-1"> Billing </p>
                                            </div>
                                            <div class=" font-bold">
                                                <p class="my-1">{{cus.name}}</p>
                                                <p class="my-1">{{cus.phone}}</p>
                                                <p class="my-1">{{invoice.email}}</p>
                                                <p class="my-1">{{invoice.customer_address}}</p>
                                                <p class="my-1">{{invoice.billing_address}}</p>
                                            </div>

                                    <div class="col-span-2 text-sm text-lime-800">
                                        <div class=" font-sans"> <span> Invoice Date - </span>  {{moment(invoice.invoice_date).format("MMM Do YYYY")}} </div>
                                        <div class="font-sans"> <span> Due Date - </span> {{moment(invoice.due_date).format("MMM Do YYYY")}} </div>
                                    </div>
                                       
                                </div>
       
                            </div>
                      
                           
                      

                        
                    <div class="flex justify-center items-center">

                        <table class="table-auto w-full mx-2 py-2">
                            <thead class=" text-center font-bold text-cyan-900 bg-emerald-300/60 rounded-lg">
                                <th class=" py-5"> Name </th>
                                <th> Unit </th> 
                                <th> Price </th>
                                <th> Quantity  </th>
                                <th> Discount </th>
                                <th> Total </th>
                                <!-- <th> Sub </th> -->
                             
                            </thead>

                            <tbody v-for="product in items" :key="product.id" class="border-b-2 border-b-slate-300">
                                <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 ">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                    <!-- <td class="py-3">                             
                                                        <div v-for="u in units" :key="u.id">
                                                            <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                                        </div>
                                    </td> -->
                                    <td class="py-3">
                                        {{product.unit.unit}}
                                    </td>
                                    <td class="py-3">
                                        {{product.unit_price}}
                                    </td>

                                    <td class="py-3">                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td class="py-3">
                                        {{product.discount_promotion}} %
                                    </td>
                                    <!-- <td class="py-3">
                                        {{product.unit_price * product.quantity}}
                                    </td> -->
                                    <td class="py-3">
                                    {{product.total}}
                                    </td>
                                
                                </tr>

                                
                                <tr  v-if="product.foc == 1"  class=" text-center text-sm font-bold text-gray-900">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                    <td>                             
                                                        <div v-for="u in units" :key="u.id">
                                                            <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                                        </div>
                                    </td>
                                    <td>
                                        Foc Item
                                    </td>

                                    <td>                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td colspan="3">
                                        {{product.description}}
                                    </td>
                                </tr>
                            
                            </tbody>
                            <tfoot class="text-gray-700 bg-emerald-50">
                                <tr class=" my-2">
                                    <td colspan="5" class=" text-right"> Total </td>
                                    <td colspan="2" class=" text-center"> {{ invoice.total}}</td>
                                </tr>

                                <tr class=" my-2">
                                    <td colspan="5" class=" text-right"> Discount </td>
                                    <td colspan="2" class=" text-center"> {{ invoice.discount}}</td>
                                </tr>

                                <tr class="my-2">
                                    <td colspan="5" class=" text-right"> Tax </td>
                                    <td colspan="2" class="text-center"> {{ invoice.tax_rate}} %</td>
                                </tr>
                                <tr class=" my-5 font-semibold">
                                    <td colspan="5" class=" text-right py-3"> Grand Total</td>
                                    <td colspan="2" class="text-center">{{ invoice.grand_total }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
               

            <!-------------------------------------- Display Data End --------------------------------------------------------------->


            <!---------------------------------------------------- edit field start -------------------------------------------------->
                <!-- <Edit v-if="visible" :invoice="invoice" :items="items" :prices="prices" :units="units" :itemDiscounts="itemDiscounts" :amount_discount="amount_discount" :taxes="taxes"/> -->
                <div v-if="visible" class=" px-2 my-5">
                    
                        <ion-title class=" font-bold text-gray-800 my-5"> Edit Datas </ion-title>
                    
                                <div class="flex justify-center items-center">
                                    <table class="table-auto px-4 mx-2 w-full py-2 my-3 rounded-md">
                                            <thead class=" text-center font-bold text-emerald-900 bg-emerald-300 rounded-lg">
                                                <th> Name </th>
                                                <th> Unit </th> 
                                                <th> Price </th>
                                                <th> Quantity  </th>
                                                <th> Discount </th>
                                                <th> Total </th>
                                                <th> Sub </th>
                                            
                                            </thead>

                                            <tbody v-for="product in items" :key="product.id" class="border-b-2 border-b-slate-300 bg-sky-50">
                                                <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 mx-2 my-2">
                                                
                                                    <td> {{ product.variant.product_name }}</td>
                                                    <td>                             
                                                            <!-- <div  v-for="(u,index) in units" :key="index">
                                                                    <span v-if="u.product_id == product.variant.product_id">
                                                                        <select v-model="product.sell_unit" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white">
                                                                                                        <option  :value="u.id">
                                                                                                                {{u.unit}}
                                                                                                        </option>
                                                                                        </select>
                                                                    </span>
                                                            </div> -->
                                                             <select v-model="product.sell_unit" class="mx-1 block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white">
                                                                 <option v-for="(u,index) in product.all_unit" :key="index" :value="u.id">{{u.unit}}</option>
                                                             </select>
                                                           
                                                                                        
                                                    
                                                                        
                                                    </td>
                                                    <td>
                                                        <div v-for="(p,index) in prices" :key="index">
                                                            <span v-if="product.variant.id == p.product_id">
                                                            <span v-if="p.unit_id === product.sell_unit"> 
                                                                <span v-if="product.variant.pricing_type == p.multi_price">
                                                                
                                                                        <span v-if=" p.multi_price == 0">
                                                            
                                                                            <select v-model="product.unit_price" class=" mx-1 block appearance-none w-full  text-gray-700 py-2 px-3 pr-5 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                                                <option :value="p.price">{{p.price}}</option>
                                                                            </select>
                                                                        <!-- <ion-input type="text" v-model="product.unit_price" readonly><p :value="p.price"></p> </ion-input> -->
                                                                            
                                                                        </span>
                                                                        <span v-else>
                                                                            <span v-if="p.min <= product.quantity && ( p.max >= product.quantity || p.max == null ) "> 
                                                                            
                                                                            <!-- <ion-input type="text" v-model="product.unit_price" readonly><p :value="p.price"></p> </ion-input> -->
                                                                                    <select v-model="product.unit_price" class="mx-1 block appearance-none w-full  text-gray-700 py-2 px-3 pr-5 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                                                    
                                                                                        <option :value="p.price">{{p.price}}</option>
                                                                                    </select>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                            </span>
                                                            </span>
                                                            
                                                        <!-- </p> -->
                                                    
                                                    </div>
                                                    
                                                    </td>

                                                    <td>                           
                                                        <input type="text" v-model="product.quantity" class="mx-1 block appearance-none w-full  text-gray-700 py-2 px-3 pr-5 rounded leading-tight focus:outline-none bg-white text-center"> 
                                                    </td>
                                                    <td>
                                                        <div v-for="(dis,index) in itemDiscounts" :key="index">
                                                            <span v-if="product.variant.id == dis.variant_id">

                                                                            <select v-model="product.discount_promotion" class="mx-1 block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                                                <option :value="0"> 0 %</option>
                                                                                <option :value="dis.rate">{{dis.rate}} %</option>
                                                                            </select>
                                                    </span>
                                                </div>
                                                    
                                                    </td>
                                                    <td>
                                                        {{product.unit_price * product.quantity}}
                                                    </td>
                                                    <td>
                                                    {{ (product.unit_price * product.quantity)-(((product.unit_price*product.quantity)/100)*product.discount_promotion)}}
                                                    </td>
                                                
                                                </tr>

                                                
                                                <tr  v-if="product.foc == 1"  class=" text-center text-sm font-bold text-gray-900 mx-2 my-2">
                                                
                                                    <td> {{ product.variant.product_name }}</td>
                                                    <td>                             
                                                                    <div  v-for="(u,index) in units" :key="index">
                                                                    <span v-if="u.product_id == product.variant.product_id">
                                                                        <select v-model="product.sell_unit" class=" rounded-md w-3/6 bg-white px-2 py-2 mx-auto block">
                                                                                                        <option  :value="u.id">
                                                                                                                {{u.unit}}
                                                                                                        </option>
                                                                                        </select>
                                                                    </span>
                                                            </div>
                                                    </td>
                                                    <td>
                                                        Foc Item
                                                    </td>

                                                    <td>                           
                                                        {{ product.quantity}} 
                                                    </td>
                                                    <td colspan="3">
                                                        {{product.description}}
                                                    </td>
                                                </tr> 
                                            
                                            </tbody>
                                            <tfoot class="text-sky-900 bg-white">
                                                <tr class=" my-2">
                                                    <td colspan="5" class=" text-right"> Total </td>
                                                    <td colspan="2" class=" text-center"> {{ getTotal}}</td>
                                                </tr>

                                                <tr>
                                                
                                                        <td colspan="5" class=" text-right"> Discount </td>
                                                
                                                    <td>
                                                        <div v-for="cartDis in amount_discount" :key="cartDis.id">
                                                            <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                                                            
                                                                    
                                                                        <select v-model="invoice.discount" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                                                            <option value="0"> None </option>
                                                                            <option :value="cartDis.rate">{{cartDis.rate}} %</option>
                                                                        </select>
                                                                        <p class="inputText">{{addDis}}</p> 
                                                                    
                                                            </div>
                                    
                                                    </div>
                                                
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan="5" class=" text-right my-3"> Tax </td>
                                                    <td colspan="2" class="text-center"> 
                                                        <select name="" id="" v-model=" invoice.tax_rate" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                                            <option v-for="t in taxes" :key="t.id" :value="t.rate"> {{t.name}} </option>
                                                        </select>
                                                            <p>  {{addTax}} </p>
                                                    
                                                    </td>
                                                </tr>
                                                <tr class="text-lg font-thin">
                                                    <td colspan="5" class=" text-right"> Grand Total</td>
                                                    <td colspan="2" class="text-center">{{ addTotal }}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                    

            <!-------------------- customer data ----------------------------------------->
            <div class="flex justify-center items-center">
                    <ion-card class=" w-full rounded-lg mx-3 my-4  px-2 py-3 bg-gradient-to-t from-sky-200 to to-lime-50">
                        <ion-card-header>
                            <ion-searchbar debounce="500" v-model="search" @input="filterCustomer" autocomplete="off" placeholder="search customer ..."></ion-searchbar>
                             <ion-list v-if="!(search == '')">
                            <ion-item v-for="data in filteredCustomer" class=" my-2 rounded" :key="data.id" @click="addData(data)">
                                    <ion-label :value="data"> {{data.name}}</ion-label>
                            </ion-item> 
                            </ion-list>
                        </ion-card-header>

                        <ion-card-content>
                            <!-- <input type="text" v-model="invoice.email" /> -->
                            <ion-item class="my-2 mx-3 rounded-lg ring ring-sky-100">
                                <ion-label position="floating"> Customer Name</ion-label>
                            <ion-input type="text" v-model="cus.name"></ion-input>
                            </ion-item>

                            <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100"> 
                                <ion-label position="floating"> Customer Email </ion-label>
                                <ion-input type="text" v-model="invoice.email"></ion-input>
                            </ion-item>

                            <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                                <ion-label position="floating"> Customer Pnone </ion-label>
                                <ion-input type="text" v-model="cus.phone"></ion-input>
                            </ion-item>

                            <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                                <ion-label position="floating"> Customer Address </ion-label>
                                <ion-input type="text" v-model="invoice.customer_address"></ion-input>
                            </ion-item>

                            <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                                <ion-label position="floating"> Shipping Address </ion-label>
                                <ion-input type="text" v-model="invoice.billing_address"></ion-input>
                            </ion-item>

                                <!-- <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                                    <ion-label position="floating"> Add Description </ion-label>
                                    <ion-input input="text" v-model="saleData.description"></ion-input>
                                </ion-item> -->
                    
                            <div class="flex justify-center items-center">

                                <div class=" px-3 py-2 rounded-xl w-full mt-2 bg-white">
                                    <ion-card-title>
                                    <h4 class="font-bold text-gray-800"> Add On </h4>
                                    </ion-card-title>
                                    <ion-item>
                                            <ion-label position="floating"> Add Title </ion-label>
                                            <ion-input input="text" v-model="invoice.title"></ion-input>
                                            <!-- <input type="text" v-model="invoice.title"/> -->
                                        </ion-item>
                                        <ion-item>
                                        <ion-label> Select Payment Method </ion-label>
                                        <ion-select v-model="invoice.payment_method">
                                            <ion-select-option v-for="(p,index) in payment_method" :key="index" :value="p"> {{p}}</ion-select-option>
                                        </ion-select>
                                    </ion-item>

                                    <ion-item>
                                        <ion-label> Select Invoice Type</ion-label>
                                        <ion-select v-model="invoice.invoice_type">
                                            <ion-select-option value="General Invoice"> General Invoice</ion-select-option>
                                            <ion-select-option value=" Cash On Delivery"> Cash On Delivery</ion-select-option>
                                        </ion-select>
                                    </ion-item>

                                    <ion-item>
                                        <ion-label> Select Zone</ion-label>
                                        <ion-select v-model="invoice.zone_id">
                                            <ion-select-option v-for="z in zones" :key="z.id" :value="z.id"> {{z.name}}</ion-select-option>
                                        </ion-select>
                                    </ion-item>
                                </div>
                            </div>
                                
                            </ion-card-content>
                            <div class=" text-right">
                                <ion-button :disabled="posting" type="submit" @click="submitData()" shape="round" > Submit </ion-button>
                                <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
                            </div>
                            
                    </ion-card>
                </div>
                </div>

            <!------------------- end --------------------->
                
            
            </ion-content>
        
        
       
    </master-layout>
        
   
</template>
<script>
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonInput,
        IonSelect, IonSelectOption, IonSearchbar,IonTitle, IonIcon, IonList,modalController} from '@ionic/vue'
import { closeCircleOutline, storefrontOutline, phonePortraitOutline, callOutline, mailOpenOutline, locateOutline,
            globeOutline, sendOutline} from 'ionicons/icons';
import axios from 'axios'
import moment from 'moment'
import Payment from '../../component/Sale/PayMentComponent.vue'
import Loader from '../../component/LoaderComponent.vue'
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';
//import Edit from '../../component/Sale/editInvoice.vue'

export default {
    components:{
        IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonSearchbar, IonSelect, IonSelectOption,
        IonTitle, IonInput, IonIcon, IonList,
        Loader
    },

    setup(){
        return{
            closeCircleOutline, storefrontOutline, phonePortraitOutline, callOutline, mailOpenOutline, locateOutline, globeOutline, sendOutline
        }
    },

    data(){
        return{
            posting:false,
            loading:false,
            visible:false,
            product:{},
            items: [],
            units:[],
            prices:[],
            taxes:[],
            amount_discount:[],
            itemDiscounts:[],
            invoice:{},
            customers:[],
            zones:[],
            cashiers:[],
            payment_category:[],
            payment_method:[],
            company:{},

            search:'',
            filteredCustomer:[],
            moment: moment,
            cus:{},

            res:'',

            //pdf
            pdfGenerator : PDFGenerator,
        }
    },

    methods:{
        

        async openPayment(){
            const modal = await modalController.create({
                component: Payment,

                componentProps:{
                    invoice : this.invoice,
                    cashiers : this.cashiers,
                    payment_category : this.payment_category,
                    payment_method : this.payment_method
                },
            });

            return modal.present();
        },

        async Data(){
            this.loading = true
            await axios.get(`mobile_invoice/${this.$route.params.id}/edit` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) .then (res => {
                    this.product = res.data
                    this.items = res.data.invoice_item
                    this.invoice = res.data.invoice
                    this.cus = res.data.invoice.customer
                    this.units = res.data.unit
                    this.prices = res.data.price
                    this.amount_discount = res.data.amount_discount
                    this.itemDiscounts = res.data.discount
                    this.taxes = res.data.tax
                    this.customers = res.data.customers
                    this.zones = res.data.zones
                    this.cashiers = res.data.cashier
                    this.payment_category = res.data.payment_category
                    this.payment_method = res.data.payment_method
                    this.company = res.data.base_company
                })
                .finally(() => this.loading = false)
            
        },

        edit(){
            this.visible = true
        },

        detail(){
            this.visible = false
        },

         filterCustomer(){
            this.filteredCustomer = this.customers.filter( state => {
                return state.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
        },

        addData(data){
                this.invoice.customer_id = data.id;
                this.invoice.customer.name = data.name;
                this.invoice.customer.phone = data.phone;
                this.invoice.email = data.email;
                this.invoice.customer_address = data.address;
               
        },

        async markSent(){
                if(! confirm('Are You Sure to Mark Sent')) return;
                await axios.put(`mobile_invoice/${this.$route.params.id}`, {
                mark_sent : 1,
            }, {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
            });
            this.Data();
            this.detail();
             //window.location.reload();
             //this.detail();
            //console.log(response)
        },

        async submitData(){
                let itemary = JSON.stringify(this.items);
                this.posting = true;
                    await axios.put(`mobile_invoice/${this.$route.params.id}` ,{
                    title: this.invoice.title,
                    client_id : this.invoice.customer_id,
                    inv_date : this.invoice.invoice_date,
                    due_date : this.invoice.due_date,
                    client_address : this.invoice.customer_address,
                    bill_address : this.invoice.billing_address,
                    payment_method : this.invoice.payment_method,
                    order_items : itemary,
                    client_email : this.invoice.email,
                    inv_grand_total : this.addTotal,
                    tax_rate : this.invoice.tax_rate,
                    total : this.getTotal,
                    invoice_type: this.invoice.invoice_type,
                    delivery_fee: 0 ,
                    warehouse_id: this.invoice.warehouse_id,
                    sale_type: this.invoice.inv_type,
                   
                   
                    discount: this.addDis,
                    zone_id: this.invoice.zone_id 
                }, { 
                 headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
             
                });
                    this.posting = false ;
                    //window.location.reload();
                    this.Data();
                    this.detail();
                  
                  //console.log(response)

        },

        async destroy(){
            if(!confirm('Are You Sure To Cancel')) return;
            await axios.post(`invoice/cancel/${this.$route.params.id}`,{
                headers : {
                    'Authorization': "Bearer" + localStorage.getItem('token'),
                }
            });
            this.Data();

            //window.location.reload();
            //console.log(response);
        },

         print(){
           
            this.content = document.getElementById('print-wrapper').innerHTML;
                    let options = {
                    documentSize: 'A4',
                    type: 'share',
                    // landscape: 'portrait',
                    fileName: 'Invoice.pdf'
                    };
                    this.pdfGenerator.fromData(this.content, options)
                    .then((base64) => {
                        console.log('OK', base64);
                    }).catch((error) => {
                        console.log('error', error);
                    });
                            
            
        }
    

        
    },

    computed:{
       

            getTotal(){
             let sum = 0
                this.items.map( x => {
                    sum = sum + ((x.unit_price * x.quantity)-(((x.unit_price*x.quantity)/100)*x.discount_promotion))
                })
               
               return sum
  
        },

          addTotal(){
            let a = Number(this.getTotal);
            let b = Number(this.addTax);
            // let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + b;
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.invoice.tax_rate);
            let amt = Number(this.getTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.invoice.discount);
            let amt = Number(this.getTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },

        isDisable(){
            return this.invoice.status !== 'Paid'; 
        }
    },

    created() {
        this.Data();
    }
}
</script>

<style scoped>
        
     ion-searchbar{
        --border-radius:30px;

    }
</style>