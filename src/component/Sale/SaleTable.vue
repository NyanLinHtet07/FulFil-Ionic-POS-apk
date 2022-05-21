<template>

    <!-- sale filed start -->
     <ion-content v-if="! visiable">
         
             <ion-searchbar debounce="500" v-model="state" @input="filterStates" autocomplete="off" placeholder="search foc ..."></ion-searchbar>
                                <ion-list>
                                    <ion-item v-for=" data in filteredStates" :key="data.id" @click="addFoc(data)">
                                            <ion-label> {{ data.variant.product_name }} </ion-label>
                                    </ion-item>
                                </ion-list>
        
         <div>
             <input type="date" v-model="saleData.inv_date">
            <input type="date" v-model="saleData.due_date">
         </div>
            
           
            <ion-grid class="ion-margin w-full">
                <ion-row class="ion-text-center tableHead font-extrabold">
                    <ion-col> Name </ion-col>
                    <ion-col> Unit </ion-col> 
                    <ion-col> Price </ion-col>
                    <ion-col> Quantity  </ion-col>
                    <ion-col> Discount </ion-col>
                    <ion-col> Total </ion-col>
                    <ion-col> Sub Total </ion-col>
                    <ion-col> Remove </ion-col>
                </ion-row> 
                <ion-row v-for="product in cartItems" :key="product.id" class="ion-text-center cell">
                  
                        <ion-col> {{ product.product_name }}</ion-col>
                        <ion-col> 
                               <ion-item>
                                        <ion-select v-model="product.unitId">
                                            <ion-select-option v-for="u in product.unit" :key="u.id" :value="u.id"> 
                                                    {{ u.unit}} 
                                            </ion-select-option>
                                        </ion-select>

                                </ion-item>    
                           
                                
                        </ion-col>
                        <ion-col>
                                <div v-for="(p,index) in prices" :key="index">
                                         <span v-if="p.unit_id === product.unitId"> 
                                            <span v-if="product.variant.pricing_type == p.multi_price">
                                            
                                                    <span v-if=" p.multi_price == 0">
                                                         <select name="" id="" v-model="product.price">
                                                             <option :value="p.price">{{p.price}}</option>
                                                        </select>
                                                      
                                                        
                                                    </span>
                                                    <!-- <span v-if="p.multi_price == 0">
                                                        <input type="text" :value="p.price">
                                                    </span> -->

                                                    <span v-else>
                                                        <span v-if="p.min <= product.quantity && ( p.max >= product.quantity || p.max == null ) "> 
                                                                <!-- <input type="text"  :value= "p.price" > -->
                                                                 <select name="" id="" v-model="product.price">
                                                                <option :value="p.price">{{p.price}}</option>
                                                            </select>
                                                        </span>
                                                    </span>
                                                </span>
                                        </span>
                                          
                                    <!-- </p> -->
                                  
                                </div>
                        </ion-col>
                       
                        <ion-col> 
                            <!-- <ion-button @click="add(product)" shape="round" size="small" class="native"> <ion-icon :icon="addCircleOutline" /> </ion-button>    -->
                            <ion-text> <ion-input v-model="product.quantity" class=" bg-slate-300"></ion-input> </ion-text>
                            <!-- <ion-button @click="remove(product)" shape="round" size="small" class="native" color="danger"> <ion-icon :icon="removeCircleOutline" />  </ion-button>  -->
                        </ion-col>
                         <ion-col>
                            <div v-for="(dis,index) in itemDiscounts" :key="index">
                                <span v-if="product.variant.id == dis.variant_id">
                                     <select name="" id="" v-model="product.discount">
                                            <option :value="dis.rate">{{dis.rate}}</option>
                                     </select>
                                </span>
                            </div>
                        </ion-col>
                        <ion-col>
                             {{product.price * product.quantity}}
                           
                        </ion-col>
                        <ion-col>
                            {{ (product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount)}}
                        </ion-col>

                        <ion-col>
                            <ion-button type="submit" @click="removeItem(product)" color="danger"> Remove</ion-button>
                        </ion-col>
                   
                </ion-row> 
                <ion-row v-for="foc in focItems" :key="foc.id" class="ion-text-center cell bg-slate-800">
                        <ion-col> {{ foc.variant.product_name}}</ion-col>
                        <ion-col> 
                               <ion-item>
                                    <div v-for="u in units" :key="u.id">
                                        <span v-if=" u.product_id == foc.variant.product_id">
                                             <ion-select v-model="foc.unitId">
                                                <ion-select-option :value="u.id"> 
                                                        {{ u.unit}} 
                                                </ion-select-option>
                                            </ion-select>
                                        </span>
                                        
                                    </div>
                                       

                                </ion-item>    
                           
                                
                        </ion-col>
                        <ion-col> FOC Item </ion-col>
                        <ion-col> 00.00 </ion-col>
                        <ion-col>{{ foc.quantity }}</ion-col>
                        <ion-col> 00.00 </ion-col>
                </ion-row>


                <ion-row>
                   
                        <ion-col offset-4 class="ion-text-end"> Total </ion-col>
                        <ion-col class="ion-text-center"> {{ getTotal}}</ion-col>
                   
                </ion-row>


                <div v-for="cartDis in cartDiscounts" :key="cartDis.id">
                    <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                          <ion-row class="cell">
                            <ion-col offset-4 class="ion-text-end"> Discount </ion-col>
                            <ion-col class="ion-align-self-center"> 
                                <!-- <ion-input v-model="discount" type="number" placeholder="add %"></ion-input>  -->
                                <select name="" id="" v-model="discount">
                                    <option value="0">None</option>
                                    <option :value="cartDis.rate">{{cartDis.rate}}</option>
                                </select>
                                <ion-text class="inputText">{{addDis}}</ion-text> 
                            </ion-col>
                        </ion-row>
                    </div>
                    <div v-else>

                    </div>
                   
                </div>
               

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=""> 
                            <div>
                                <select name="" id="" v-model="tax">
                                    <option v-for="t in taxes" :key="t.id" :value="t.rate"> {{t.name}} </option>
                                </select>

                                <!-- <ion-input type="number" v-model="tax" placeholder="add %"></ion-input> -->
                                <ion-text class="inputText">  {{addTax}} </ion-text>
                            </div>
                    </ion-col>
                </ion-row>

                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Deli </ion-col>
                    <ion-col class="ion-text-center"> <ion-input v-model="saleData.deli"></ion-input></ion-col>
                </ion-row>

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Grand Total</ion-col>
                    <ion-col class="ion-text-center"> {{ addTotal }}</ion-col>
                </ion-row>

            </ion-grid>

            <ion-item>
                <ion-button  expand="block" color="secondary" shape="round" 
                 slot="end" size="" name="star" @click="hide()"> 
                    Continue
                 </ion-button>
            </ion-item>

           </ion-content>

           <!---------------------- sale field end ------------------------>


            <!----------------------- customer filed start ------------------->
           <ion-content v-if="visiable">
            <div class="flex justify-center items-center">
                 <ion-card class=" w-full rounded-lg mx-3 my-4  px-2 py-3 bg-gradient-to-t from-sky-300 to to-blue-50">
                    <ion-card-header>
                        <ion-card-title>
                           <h3 class=" font-semibold text-gray-800"> Add Customer Data </h3>
                           <div class=" text-right my-3">
                               <ion-button shape="round" color="secondary" @click="openModal"> Add New Customer</ion-button>
                           </div>
                        </ion-card-title>
                        <ion-searchbar debounce="500" v-model="search" @input="filterCustomer" autocomplete="off" placeholder="search customer ..."></ion-searchbar>
               
                        <ion-item v-for="data in filteredCustomer" class=" my-2 rounded" :key="data.id" @click="addData(data)">
                                <ion-label :value="data"> {{data.name}}</ion-label>
                        </ion-item> 
                    </ion-card-header>

                    <ion-card-content>
                           <ion-item class="my-2 mx-3 rounded-lg ring ring-sky-100">
                             <ion-label position="floating"> Add Customer Name </ion-label>
                            <ion-input input="text" v-model="saleData.customer_name"></ion-input>
                        </ion-item>

                        <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100"> 
                             <ion-label position="floating"> Add Customer Email </ion-label>
                            <ion-input input="text" v-model="saleData.customer_email"></ion-input>
                        </ion-item>

                        <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                             <ion-label position="floating"> Add Customer Phone </ion-label>
                            <ion-input input="text" v-model="saleData.customer_phone"></ion-input> 
                        </ion-item>

                        <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                             <ion-label position="floating"> Add Customer Address </ion-label>
                            <ion-input input="text" v-model="saleData.customer_address"></ion-input>
                        </ion-item>

                        <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                            <ion-label position="floating"> Add Shipping Address </ion-label>
                            <ion-input input="text" v-model="saleData.customer_shipping"></ion-input>
                        </ion-item>

                            <ion-item class="my-2 mx-3 rounded-lg ring-1 ring-sky-100">
                                <ion-label position="floating"> Add Description </ion-label>
                                 <ion-input input="text" v-model="saleData.description"></ion-input>
                            </ion-item>
                 
                        <div class="flex justify-center items-center">

                            <div class=" px-3 py-2 rounded-xl w-9/12 mt-2 bg-white">
                                <ion-card-title>
                                   <h4 class="font-bold text-gray-800"> Add On </h4>
                                </ion-card-title>
                                <ion-item>
                                        <ion-label position="floating"> Add Title </ion-label>
                                        <ion-input input="text" v-model="saleData.customer_title"></ion-input>
                                    </ion-item>
                                    <ion-item>
                                      <ion-label> Select Payment Method </ion-label>
                                    <ion-select v-model="saleData.payment_method">
                                        <ion-select-option value="Cash"> Cash</ion-select-option>
                                    </ion-select>
                                </ion-item>

                                <ion-item>
                                     <ion-label> Select Invoice Type</ion-label>
                                    <ion-select v-model="saleData.invoice_type">
                                        <ion-select-option value="General Invoice"> General Invoice</ion-select-option>
                                        <ion-select-option value=" Cash On Delivery"> Cash On Delivery</ion-select-option>
                                    </ion-select>
                                </ion-item>

                                <ion-item>
                                     <ion-label> Select Zone</ion-label>
                                    <ion-select v-model="zone_id">
                                        <ion-select-option v-for="z in zones" :key="z.id" :value="z.id"> {{z.name}}</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </div>
                        </div>
                             
                           </ion-card-content>
                        <div class=" text-right">
                             <ion-button type="submit" @click="submitData()" shape="round" > Submit </ion-button>
                        </div>
                           
                </ion-card>
            </div>
               
                  
                 <Create/>
            </ion-content>

            <!--------------------- end ------------------------------------->
         
              
</template>

<script>
import {IonContent,IonGrid,IonRow,IonCol, IonButton, IonText, IonInput, IonLabel, IonSelect, IonSelectOption,
        IonSearchbar, IonList, IonItem,
        IonCard, IonCardHeader, IonCardContent, IonCardTitle,  modalController } from '@ionic/vue'
import { mapGetters } from "vuex";
import { addCircleOutline, removeCircleOutline} from 'ionicons/icons';
import axios from 'axios';
//import Customer from '../../component/Sale/CustomerRecord.vue'
import Create from '../../component/Sale/CreateCustomer.vue'

const url = "http://54.169.124.45/api/auth/mobile_invoice/create";

export default {
    components:{
        IonContent,
        IonGrid,IonRow,IonCol,
        IonButton,IonText,IonInput,
        IonLabel,IonSelect,IonSelectOption,
        IonSearchbar, IonList, IonItem,
        IonCard, IonCardHeader, IonCardContent,  IonCardTitle,
        
    },

    data() {
        return {
            test:'',
            visiable:false,
            unitId:'',
            tax:'',
            deli:'',
            discount:'',
            state:'',
            search:'',
            zone_id:'',


            filteredStates:[],
            prices:[],
            focs:[],
            itemDiscounts:[],
            taxes:[],
            cartDiscounts:[],
            units:[],
            customers:[],
            zones:[],
            warehouse:{},

            saleData: {
                inv_date:'',
                due_date:'',
                cartItems:'',
                focs:'',
                tax_rate:'',
                tax_amount:'',
                discount:'',
                deli:'',
                totalPrice:'',
                grandtotal:'',
                payment_method:'',
                invoice_type:'',
                customer_id:'',
                customer_name:'',
                customer_address:'',
                customer_phone:'',
                customer_email:'',
                customer_title:'',
                customer_shipping:'',
                description:'',
            }
            
        }
    },

    setup() {
        return{
            addCircleOutline, removeCircleOutline
        }
        
    },

    methods:{
          add(product){
            this.$store.dispatch("addToCart", product);
        },

        remove(product){
            this.$store.dispatch('removeItem', product);
        },

        removeItem(product){
            this.$store.dispatch('removeProduct', product);
        },

        clearCart(cartItems){
            this.$store.dispatch("clearCart" , cartItems);
        },

        addFoc(data){
            this.$store.dispatch("addFoc", data)
        },

        filterStates(){
            this.filteredStates = this.focs.filter( state => {
                return state.variant.product_name.toLowerCase().startsWith(this.state.toLowerCase());
            })
        },

        hide(){
            this.visiable = true;
        },

        //for customer
         addData(data){
                this.saleData.customer_id = data.id;
                this.saleData.customer_name = data.name;
                this.saleData.customer_phone = data.phone;
                this.saleData.customer_email = data.email;
                this.saleData.customer_address = data.address;
               
        },

         filterCustomer(){
            this.filteredCustomer = this.customers.filter( state => {
                return state.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
        },

        // for model box
         async openModal() {
            const modal = await modalController.create({
            component: Create,
            //cssClass: 'my-custom-class',
            componentProps: {
                title: 'New Title',
            },
            });
            return modal.present();
        },
      

        async submitData(){
                let itemary = JSON.stringify(this.finalItems);
                let focary = JSON.stringify(this.finalFocs);

                const response = await axios.post (  "http://54.169.124.45/api/auth/mobile_invoice" ,{
                    title: this.saleData.customer_title,
                    client_id : this.saleData.customer_id,
                    inv_date : this.saleData.inv_date,
                    due_date : this.saleData.due_date,
                    client_address : this.saleData.customer_address,
                    bill_address : this.saleData.customer_shipping,
                    payment_method : this.saleData.payment_method,
                    order_items : itemary,
                    client_email : this.saleData.customer_email,
                    inv_grand_total : this.addTotal,
                    tax_rate : this.tax,
                    total : this.getTotal,
                    invoice_type: this.saleData.invoice_type,
                    delivery_fee: 0 ,
                    warehouse_id: this.warehouseId,
                    sale_type: 'Whole Sale',
                    foc_items: focary,
                    tax_amount: this.addTax,
                    discount: this.addDis,
                    zone_id: this.zone_id 
                }, { 
                 headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
             
                });

                console.log(response)
        },


        // saveData(){

        //         this.saleData.cartItems = this.cartItems,
        //         this.saleData.focs = this.focItems,
        //         this.saleData.tax = this.addTax,
        //         this.saleData.discount = this.addDis,
        //         this.saleData.deli = this.deli,
        //         this.saleData.totalPrice = this.getTotal,
        //         this.saleData.grandtotal = this.addTotal,
        //         this.saleData.customer_name = this.customer.name,
        //         this.saleData.customer_address = this.customer.address,
        //         this.saleData.customer_phone = this.customer.phone,
        //         this.saleData.customer_title = this.customer.title,
        //         this.saleData.customer_shipping = this.customer.shipping_address,
        //         this.saleData.customer_description = this.customer.description,
                
        //         this.$store.dispatch('addSale', this.saleData);
        //         this.clearCart();
        //         this.addTotal = '' ;
        //         this.tax = '' ;
        //         this.discount = '' ;
        //         this.deli = '';
        // },

         async wholeSales(){
              await axios.get(url, { 
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
                    .then(res => {
                        //this.retails = res.data.aval_product;
                        this.prices = res.data.prices
                        this.focs = res.data.focs
                        this.units = res.data.unit
                        this.itemDiscounts = res.data.dis_promo
                        this.taxes = res.data.taxes
                        this.cartDiscounts = res.data.amount_discount
                        this.customers = res.data.allcustomers
                        this.zones = res.data.zone
                        this.warehouse = res.data.warehouse
                    })
        }
        

    },

    computed:{
        warehouseId(){
            return this.warehouse.id;
        },

         customer(){
            return this.$store.state.customer;
        },
        
         cartItems(){
            return this.$store.getters.cartItems;
        },

            focItems(){
                return this.$store.getters.focs;
            },

            finalFocs(){
                return this.$store.getters.finalFocs;
            },

            finalItems(){
                return this.$store.getters.finalItems;
            },

        ...mapGetters(["getTotal"]),

        addTotal(){
            let a = Number(this.getTotal);
            let b = Number(this.addTax);
            let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + ( b + d );
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.tax);
            let amt = Number(this.getTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.discount);
            let amt = Number(this.getTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },

       


    },

    created() {
        this.wholeSales();
          setInterval(this.wholeSales, 5000);
    },
    
}
</script>