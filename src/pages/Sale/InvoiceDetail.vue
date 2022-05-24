<template>
    <master-layout pageTitle="Invoice Detail">
        <ion-content>
            <div class=" flex">
                <ion-button> Mark Send </ion-button>
                <ion-button> Edit </ion-button>
                <ion-button>  </ion-button>
            </div>
            <div>
                <div class=" text-sky-900 font-semibold"> <span> Invoice Date </span> {{invoice.invoice_date}} </div>
                <div class=" text-sky-900 font-semibold"> <span> Due Date </span> {{invoice.due_date}} </div>
            </div>
            
           <div class="flex justify-center items-center">

            <table class="table-auto px-4 mx-2 w-5/6 py-2 my-3">
                <thead class=" text-center font-bold text-cyan-900 bg-sky-400 rounded-lg">
                    <th> Name </th>
                    <th> Unit </th> 
                    <th> Price </th>
                    <th> Quantity  </th>
                    <th> Discount </th>
                    <th> Total </th>
                    <th> Sub </th>
                  
                </thead>

                <tbody>
                    <tr v-for="product in items" :key="product.id" class="border-b-slate-200 border-b-2 text-center text-sm font-bold text-sky-900 mx-2 my-2">
                         <td> {{ product.variant.product_name }}</td>
                        <td>                             
                                            <div v-for="u in units" :key="u.id">
                                                <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                            </div>
                        </td>
                        <td>
                            {{product.unit_price}}
                        </td>

                        <td>                           
                             {{ product.quantity}} 
                        </td>
                         <td>
                             {{product.discount_promotion}} %
                         </td>
                        <td>
                             {{product.unit_price * product.quantity}}
                        </td>
                        <td>
                           {{product.total}}
                        </td>
                    </tr>
                </tbody>
                <tfoot class="text-sky-900">
                    <tr class=" my-2">
                        <td colspan="5" class=" text-right"> Total </td>
                        <td colspan="2" class=" text-center"> {{ invoice.total}}</td>
                    </tr>

                     <tr class="my-2 border-b-2 border-slate-500">
                        <td colspan="5" class=" text-right"> Tax </td>
                        <td colspan="2" class="text-center"> {{ invoice.tax_amount}} %</td>
                    </tr>
                    <tr class=" my-2 font-semibold">
                        <td colspan="5" class=" text-right"> Grand Total</td>
                        <td colspan="2" class="text-center">{{ invoice.grand_total }}</td>
                    </tr>
                </tfoot>
            </table>
           </div>
        </ion-content>
    </master-layout>
        
   
</template>
<script>
import { IonContent, IonButton} from '@ionic/vue'
import axios from 'axios'

export default {
    components:{
        IonContent, IonButton
    },

    data(){
        return{
            product:{},
            items: [],
            units:[],
            invoice:{},
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
                })
            
        }
    },

    created() {
        this.Data();
    }
}
</script>