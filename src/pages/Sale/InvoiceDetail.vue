<template>
    <master-layout pageTitle="Invoice Detail">
        <ion-content>
            <div class=" flex mx-3">
                <ion-button class="mx-2"> Mark Send </ion-button>
                <ion-button class="mx-2"> Make Paymeny </ion-button>
                <ion-button @click="edit()" v-if=" !visible"> Edit </ion-button>
                <ion-button @click="detail()" v-if="visible"> Detail </ion-button>
                <ion-button> Stock Out </ion-button>
            </div>
            
            <div class=" bg-zinc-50 rounded-md shadow-md px-3 py-2 mx-3" v-if="! visible">
                    <div class=" text-gray-800 font-semibold">
                        <div>
                            <span> Customer Name</span> :
                        </div>
                        <div>
                            <span> Customer Phone</span> : {{invoice.email}}
                        </div>
                        <div>
                            <span> Customer Address</span> : {{ invoice.customer_address}}
                        </div>
                        <div>
                            <span> Customer Billing Address</span> : {{ invoice.billing_address}}
                        </div>
                    </div>
                    <div class="text-sm">
                            <div class=" text-gray-600"> <span> Invoice Date - </span>  {{moment(invoice.invoice_date).format("MMM Do YYYY")}} </div>
                            <div class=" text-gray-600"> <span> Due Date - </span> {{moment(invoice.due_date).format("MMM Do YYYY")}} </div>
                    </div>

                    
                <div class="flex justify-center items-center">

                    <table class="table-auto px-4 mx-2 w-5/6 py-2 my-3">
                        <thead class=" text-center font-bold text-cyan-900 bg-sky-300 rounded-lg">
                            <th class=" py-5"> Name </th>
                            <th> Unit </th> 
                            <th> Price </th>
                            <th> Quantity  </th>
                            <th> Discount </th>
                            <th> Total </th>
                            <th> Sub </th>
                        
                        </thead>

                        <tbody v-for="product in items" :key="product.id" class="border-b-2 border-b-slate-300">
                            <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 ">
                            
                                <td class="py-3"> {{ product.variant.product_name }}</td>
                                <td class="py-3">                             
                                                    <div v-for="u in units" :key="u.id">
                                                        <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                                    </div>
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
                                <td class="py-3">
                                    {{product.unit_price * product.quantity}}
                                </td>
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
                        <tfoot class="text-gray-700 bg-sky-100">
                            <tr class=" my-2">
                                <td colspan="5" class=" text-right"> Total </td>
                                <td colspan="2" class=" text-center"> {{ invoice.total}}</td>
                            </tr>

                            <tr class="my-2">
                                <td colspan="5" class=" text-right"> Tax </td>
                                <td colspan="2" class="text-center"> {{ invoice.tax_amount}} %</td>
                            </tr>
                            <tr class=" my-5 font-semibold">
                                <td colspan="5" class=" text-right py-3"> Grand Total</td>
                                <td colspan="2" class="text-center">{{ invoice.grand_total }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <Edit v-if="visible" :invoice="invoice" :items="items" :prices="prices" :units="units" :itemDiscounts="itemDiscounts" :amount_discount="amount_discount"/>
              
          
        </ion-content>
    </master-layout>
        
   
</template>
<script>
import { IonContent, IonButton} from '@ionic/vue'
import axios from 'axios'
import moment from 'moment'
import Edit from '../../component/Sale/editInvoice.vue'

export default {
    components:{
        IonContent, IonButton, Edit
    },

    data(){
        return{
            visible:false,
            product:{},
            items: [],
            units:[],
            prices:[],
            amount_discount:[],
            itemDiscounts:[],
            invoice:{},
            moment: moment,
        }
    },

    methods:{
        async Data(){
            await axios.get(`https://www.fulfilmm.com/api/auth/mobile_invoice/${this.$route.params.id}/edit` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) .then (res => {
                    this.product = res.data
                    this.items = res.data.invoice_item
                    this.invoice = res.data.invoice
                    this.units = res.data.unit
                    this.prices = res.data.price
                    this.amount_discount = res.data.amount_discount
                    this.itemDiscounts = res.data.discount
                })
            
        },

        edit(){
            this.visible = true
        },

        detail(){
            this.visible = false
        }
    },

    computed:{
        getName(){
            return this.invoice.customer.name;
        }
    },

    created() {
        this.Data();
    }
}
</script>