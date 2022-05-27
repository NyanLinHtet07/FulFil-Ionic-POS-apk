<template>
    <div>
        <table class="table-auto px-4 mx-2 w-5/6 py-2 my-3 rounded-md">
                        <thead class=" text-center font-bold text-cyan-900 bg-sky-300 rounded-lg">
                            <th> Name </th>
                            <th> Unit </th> 
                            <th> Price </th>
                            <th> Quantity  </th>
                            <th> Discount </th>
                            <th> Total </th>
                            <th> Sub </th>
                        
                        </thead>

                        <tbody v-for="product in items" :key="product.id" class="border-b-2 border-b-slate-300">
                            <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 mx-2 my-2">
                            
                                <td> {{ product.variant.product_name }}</td>
                                <td>                             
                                        <div  v-for="(u,index) in units" :key="index">
                                                <span v-if="u.product_id == product.variant.product_id">
                                                    <select v-model="product.sell_unit" >
                                                                                    <option  :value="u.id">
                                                                                               {{u.unit}}
                                                                                     </option>
                                                                    </select>
                                                </span>
                                        </div>
                                                                    
                                  
                                                       
                                </td>
                                <td>
                                     <div v-for="(p,index) in prices" :key="index">
                                         <span v-if="p.unit_id === product.sell_unit"> 
                                            <span v-if="product.variant.pricing_type == p.multi_price">
                                            
                                                    <span v-if=" p.multi_price == 0">
                                           
                                                        <select v-model="product.unit_price" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            <option :value="p.price">{{p.price}}</option>
                                                        </select>
                                                        
                                                    </span>
                                                    <span v-else>
                                                        <span v-if="p.min <= product.quantity && ( p.max >= product.quantity || p.max == null ) "> 
                                                   
                                                                <select v-model="product.unit_price" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                                  
                                                                    <option :value="p.price">{{p.price}}</option>
                                                                </select>
                                                        </span>
                                                    </span>
                                                </span>
                                        </span>
                                          
                                    <!-- </p> -->
                                  
                                </div>
                                   
                                </td>

                                <td>                           
                                    <input type="text" v-model="product.quantity"> 
                                </td>
                                <td>
                                     <div v-for="(dis,index) in itemDiscounts" :key="index">
                                        <span v-if="product.variant.id == dis.variant_id">

                                                        <select v-model="product.discount_promotion" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
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
                        <tfoot class="text-sky-900 bg-gradient-to-b from-white to-sky-200">
                            <tr class=" my-2">
                                <td colspan="5" class=" text-right"> Total </td>
                                <td colspan="2" class=" text-center"> {{ getTotal}}</td>
                            </tr>

                            <tr>
                               
                                    <td colspan="5" class=" text-right"> Discount </td>
                               
                                <td>
                                    <div v-for="cartDis in amount_discount" :key="cartDis.id">
                                <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                                 
                                          
                                            <select v-model="invoice.discount">
                                                <option value="0"> None </option>
                                                <option :value="cartDis.rate">{{cartDis.rate}} %</option>
                                            </select>
                                            <p class="inputText">{{addDis}}</p> 
                                        
                                </div>
                  
                                </div>
                                <!-- <p>{{invoice.discount}}</p> -->
                                </td>
                            </tr>

                            <tr class="my-2">
                                <td colspan="5" class=" text-right"> Tax </td>
                                <td colspan="2" class="text-center"> 
                                    
                                    {{ invoice.tax_amount}} %
                                </td>
                            </tr>
                            <tr class=" my-5 font-semibold">
                                <td colspan="5" class=" text-right"> Grand Total</td>
                                <td colspan="2" class="text-center">{{ addTotal }}</td>
                            </tr>
                        </tfoot>
                    </table>
    </div>
   
</template>
<script>
//import { IonSelect, IonSelectOption} from '@ionic/vue'
export default {

    // components: {
    //     IonSelect, IonSelectOption
    // },

    props:["invoice" , "items" , 'prices', 'units', 'amount_discount', 'itemDiscounts'],

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
            let t = Number(this.invoice.tax_amount);
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
    }
}
</script>