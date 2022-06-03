<template>
    <div v-if="loading">
        <Loader/>
    </div>
    <!-- sale filed start -->
    <ion-content v-else>
         <ion-content v-if="! visiable">

      
             <ion-button @click="openItems" color="primary"> Products </ion-button>
             <ion-button @click="openFoc" color="medium"> Focs </ion-button>
      
         <div v-if=" !openItem" >
              <ion-searchbar debounce="500" v-model="state" @input="filterStates" autocomplete="off" placeholder="search foc ..."></ion-searchbar>
                                <ion-list>
                                    <ion-item v-for=" data in filteredStates" :key="data.id" @click="addFoc(data)">
                                            <ion-label> {{ data.variant.product_name }} </ion-label>
                                    </ion-item>
                                </ion-list>
         </div>
            
            
            <div v-if="openItem">
                  <ion-searchbar debounce="500" v-model="searchItem" @input="filterItems" autocomplete="off" placeholder="search Products ..."></ion-searchbar>
                                <ion-list>
                                    <ion-item v-for=" data in filteredItems" :key="data.id" @click="addProduct(data)">
                                            <ion-label> {{ data.variant.product_name }} </ion-label>
                                    </ion-item>
                                </ion-list>
            </div>

             <div class="text-right mx-3">
                <ion-button  size="small" color="danger"  @click="clearCart(cartItems)"> 
                    Remove items
                  
                </ion-button>
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
                            
                               <!-- <ion-label> Select Unit</ion-label> -->
                                        <!-- <ion-select v-model="product.unitId">
                                            <ion-select-option v-for="u in product.unit" :key="u.id" :value="u.id"> 
                                                    {{ u.unit}} 
                                            </ion-select-option>
                                        </ion-select> -->
                                    
                                        <div>
                                            <label for=""> Unit </label>
                                            <select v-model="product.unitId" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                <option v-for="u in product.unit" :key="u.id" :value="u.id">{{u.unit}}</option>
                                            </select>
                                        </div>

                            
                                
                        </ion-col>
                        <ion-col>
                                <div v-for="(p,index) in prices" :key="index">
                                    <span v-if="product.variant.id == p.product_id">
                                         <span v-if="p.unit_id === product.unitId"> 
                                            <span v-if="product.variant.pricing_type == p.multi_price">
                                            
                                                    <span v-if=" p.multi_price == 0">
                                                        <!-- <ion-label for="price"> Price </ion-label>
                                                         <ion-select name="price" id="" v-model="product.price">
                                                             <ion-select-option :value="p.price">{{p.price}}</ion-select-option>
                                                        </ion-select> -->
                                                      <label for=""> Price </label>
                                                        <select v-model="product.price" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            <option :value="p.price">{{p.price}}</option>
                                                        </select>
                                                        
                                                    </span>
                                                    <span v-else>
                                                        <span v-if="p.min <= product.quantity && ( p.max >= product.quantity || p.max == null ) "> 
                                                                <!-- <input type="text"  :value= "p.price" > -->
                                                               <label for=""> Price </label>
                                                                <select v-model="product.price" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                                   <!-- <option value=""> Select</option> -->
                                                                    <option :value="p.price">{{p.price}}</option>
                                                                </select>
                                                        </span>
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
                                    <!-- <ion-label> Discount </ion-label>
                                     <ion-select name="" id="" v-model="product.discount">
                                            <ion-select-option :value="dis.rate">{{dis.rate}} %</ion-select-option>
                                     </ion-select> -->
                                            <label for=""> Discount </label>
                                                        <select v-model="product.discount" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            <option :value="dis.rate">{{dis.rate}} %</option>
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
                            <ion-button type="submit" @click="removeItem(product)" color="light" size="small">
                                 <ion-icon :icon="trashSharp" slot="icon-only"  color="danger" class="py-3"></ion-icon>
                            </ion-button>
                        </ion-col>
                   
                </ion-row> 
                <ion-row v-for="foc in focItems" :key="foc.id" class="ion-text-center cell bg-slate-400">
                        <ion-col> {{ foc.variant.product_name}}</ion-col>
                        <ion-col> 
                              
                                    <!-- <div v-for="(u, index) in units" :key="index">
                                      
                                        <div v-if=" u.product_id == foc.variant.product_id"> -->
                                             <!-- <ion-select v-model="foc.unitId">
                                                <ion-select-option :value="u.id"> 
                                                        {{ u.unit}} 
                                                </ion-select-option>
                                            </ion-select> -->
                                          
                                                <label for=""> Unit </label>    
                                                    <div   v-for="(u, index) in units" :key="index">
                                                        <div  v-if=" u.product_id == foc.variant.product_id">
                                                              <select v-model="foc.unitId" 
                                                                    class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                                        <option :value="u.id">
                                                                            <span> {{u.unit}}  </span>
                                                                        </option>
                                                             </select>
                                                               </div>
                                                        </div>
                     
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
                                <ion-label> Select Discount Amount</ion-label>
                                <ion-select name="" id="" v-model="discount">
                                    <ion-select-option value="0">None</ion-select-option>
                                    <ion-select-option :value="cartDis.rate">{{cartDis.rate}} %</ion-select-option>
                                </ion-select>
                                <ion-text class="inputText">{{addDis}}</ion-text> 
                            </ion-col>
                        </ion-row>
                    </div>
                    <div v-else>

                    </div>
                   
                </div>
               

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=" px-3"> 
                            <ion-item>
                                <ion-label> Select Tax </ion-label>
                                <ion-select name="" id="" v-model="tax" class=" rounded-md w-20">
                                    <ion-select-option v-for="t in taxes" :key="t.id" :value="t.rate"> {{t.name}} </ion-select-option>
                                </ion-select>
                             </ion-item>
                                <!-- <ion-input type="number" v-model="tax" placeholder="add %"></ion-input> -->
                                <ion-text class="inputText">  {{addTax}} </ion-text>
                           
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
                        <div class=" text-left">
                               <ion-button shape="round"  size="small" color="secondary" @click="show"> <ion-icon :icon="returnUpBack"></ion-icon> <small class="mx-2">Sales</small> </ion-button>
                           </div>

                        <ion-card-title>
                           <h3 class=" font-semibold text-gray-800"> Add Required Field </h3>
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
                                     
                                <!-- <ion-datetime v-model="saleData.inv_date"> </ion-datetime> -->
                                     <div>
                                        <ion-label> Invoice Date </ion-label>
                                         <input type="date" v-model="saleData.inv_date" class=" bg-slate-50 mx-2 px-3 py-2 rounded" placeholder="invoice date" />
                                    </div>
                                    
                                    <div>
                                        <ion-label> Due Date </ion-label>
                                         <input type="date" v-model="saleData.due_date" class=" bg-slate-50 mx-2 px-3 py-2 rounded" placeholder=" due date"/>
                                    </div>

                                </ion-item>
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
                             <ion-spinner  name="circles" v-if='posting'> Please Wait</ion-spinner>
                             <ion-button :disabled="posting" type="submit" @click="submitData()" shape="round" > Submit </ion-button>
                        </div>
                           
                </ion-card>
            </div>
               
                  
                 <Create/>
            </ion-content>
    </ion-content>
    

            <!--------------------- end ------------------------------------->
         
               
</template>

<script>
import {IonContent,IonGrid,IonRow,IonCol, IonText, IonInput, IonLabel, IonSelect, IonSelectOption,
        IonSearchbar, IonList, IonItem, IonButton, IonSpinner,
        IonCard, IonCardHeader, IonCardContent, IonCardTitle,  modalController} from '@ionic/vue'
import { mapGetters } from "vuex";
import { addCircleOutline, removeCircleOutline, trashSharp, returnUpBack} from 'ionicons/icons';
import axios from 'axios';
import Loader from '../../component/LoaderComponent.vue'
//import Customer from '../../component/Sale/CustomerRecord.vue'
import Create from '../../component/Sale/CreateCustomer.vue'

const url = "mobile_invoice/create";

export default {
    components:{
        IonContent,
        IonGrid,IonRow,IonCol,
        IonButton,IonText,IonInput,
        IonLabel,IonSelect,IonSelectOption,
        IonSearchbar, IonList, IonItem, IonSpinner,
        IonCard, IonCardHeader, IonCardContent,  IonCardTitle,
         Loader
        
    },

    data() {
        return {
            posting:false,
            loading: false,
            test:'',
            openItem: false,
            visiable:false,
            unitId:'',
            tax:'',
            deli:'',
            discount:'',
            state:'',
            searchItem:'',
            search:'',
            zone_id:'',


            filteredItems:[],
            products:[],
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
            addCircleOutline, removeCircleOutline, trashSharp, returnUpBack
        }
        
    },

    methods:{

        openItems(){
            this.openItem = true
        },

        openFoc(){
            this.openItem = false
        },

         reset(){
            this.saleData = {
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
        },
          addProduct(data){
            this.$store.dispatch("addToCart", data);
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

        filterItems(){
            this.filteredItems = this.products.filter( p => {
                return p.variant.product_name.toLowerCase().startsWith(this.searchItem.toLowerCase());
            })
        },

        hide(){
            this.visiable = true;
        }, 

        show(){
            this.visiable = false;
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

                this.posting = true;
                const response = await axios.post (  "https://www.fulfilmm.com/api/auth/mobile_invoice" ,{
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

                const inv_id = response.data.invoice_id;
               
                this.reset();
                this.clearCart();
                this.posting = false ;
                this.$router.push({name:'invoice.detail', params:{id :inv_id}});
                //this.$router.push('/select-sales');
                //console.log(response)
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
             this.loading = true
              await axios.get(url, { 
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
                    .then(res => {
                        this.products = res.data.aval_product;
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
                    .finally(() => this.loading = false)
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

    // mounted(){
    //     this.wholeSales();
    // },

    created() {
        this.wholeSales();
          //setInterval(this.wholeSales, 5000);
    },
    
}
</script>