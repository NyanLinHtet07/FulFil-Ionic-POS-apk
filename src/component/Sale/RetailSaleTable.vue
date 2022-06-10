<template>

    <div v-if="loading">
        <Loader/>
    </div>

    <!-- sale filed start -->
        <ion-content v-else>
              <ion-content v-if="! visiable">
                <ion-header class=" top ion-no-border mt-1">
                        <ion-chip @click="openItems" color="primary"> Products </ion-chip>
                        <ion-chip @click="openFoc" color="medium"> Focs </ion-chip>
                
                    
                    
                    <div v-if="openItem">
                            <ion-searchbar debounce="500" v-model="searchItem" @input="filterItems" autocomplete="off" placeholder="search Products ..."></ion-searchbar>
                                            <ion-list v-if=" !(searchItem == '')">
                                                <ion-item v-for=" d in filteredItems" :key="d.id" @click="addProduct(d)">
                                                        <ion-label> {{ d.variant.product_name }} </ion-label>
                                                </ion-item>
                                            </ion-list>
                    </div>
                    <div v-if=" ! openItem">
                        <ion-searchbar debounce="500" v-model="state" @input="filterStates" autocomplete="off" placeholder="search foc ..."></ion-searchbar>
                                            <ion-list v-if=" !(state == '')">
                                                <ion-item v-for=" data in filteredStates" :key="data.id" @click="addFoc(data)">
                                                        <ion-label> {{ data.variant.product_name }} </ion-label>
                                                </ion-item>
                                            </ion-list>
                    </div>
                </ion-header>
            
       

        
     
             <!-- <ion-datetime v-model="saleData.inv_date"> </ion-datetime> -->
             <!-- <input type="date" v-model="saleData.inv_date" class=" bg-white">
            <input type="date" v-model="saleData.due_date" class=" bg-white"> -->
   
           <div class=" mt-32 mx-2">

            <ion-grid class="w-full">
                <ion-row class="ion-text-center bg-emerald-300/60 text-sm">
                    <ion-col> Name </ion-col>
                    <ion-col> Unit </ion-col> 
                    <ion-col> Price </ion-col>
                    <ion-col> Quantity  </ion-col>
                    <ion-col> Discount </ion-col>
                    <ion-col> Total </ion-col>
                    <!-- <ion-col> Sub Total </ion-col> -->
                    <ion-col> Remove </ion-col>
                </ion-row> 
                <ion-row v-for="product in cartItems" :key="product.id" class="ion-text-center bg-sky-50">
                  
                        <ion-col> 
                             <ion-input v-model="product.product_name" readonly="readonly" class="text-sm"></ion-input>
                            <!-- {{ product.product_name }} -->
                        </ion-col>

                        <ion-col> 
                            
                                    
                                        <div>
                                            <!-- <label for=""> Unit </label> -->
                                            <select v-model="product.unitId" class="text-sm block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white"  id="grid-state">
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
                                                      <!-- <label for=""> Price </label> -->
                                                        <select v-model="product.price" class="text-sm block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                            <option :value="p.price">{{p.price}}</option>
                                                        </select>
                                                        
                                                    </span>
                                                    <span v-else>
                                                        <span v-if="p.min <= product.quantity && ( p.max >= product.quantity || p.max == null ) "> 
                                                                <!-- <input type="text"  :value= "p.price" > -->
                                                               <!-- <label for=""> Price </label> -->
                                                                <select v-model="product.price" class="text-sm block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
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
                            
                            <ion-text> <ion-input v-model="product.quantity" class=" bg-white text-sm"></ion-input> </ion-text>
                           
                        </ion-col>
                         <ion-col>
                            <div v-for="(dis,index) in itemDiscounts" :key="index">
                                <span v-if="product.variant.id == dis.variant_id">
                                    <!-- <ion-label> Discount </ion-label>
                                     <ion-select name="" id="" v-model="product.discount">
                                            <ion-select-option :value="dis.rate">{{dis.rate}} %</ion-select-option>
                                     </ion-select> -->
                                            <!-- <label for=""> Discount </label> -->
                                                        <select v-model="product.discount" class="text-sm block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                            <option :value="dis.rate">{{dis.rate}} %</option>
                                                        </select>
                                </span>
                            </div>
                        </ion-col>
                        <!-- <ion-col>
                             {{product.price * product.quantity}}
                        </ion-col> -->
                        <ion-col>
                             <ion-input :value="(product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount)" readonly="readonly" class="text-sm"></ion-input>
                            <!-- {{ (product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount)}} -->
                        </ion-col>

                        <ion-col>
                            <ion-button type="submit" @click="removeItem(product)" fill="clear"> 
                                  <ion-icon :icon="trashSharp" slot="icon-only"  color="danger" class="py-3 text-sm"></ion-icon>
                            </ion-button>
                        </ion-col>
                   
                </ion-row> 
                <ion-row v-for="foc in focItems" :key="foc.id" class="ion-text-center cell bg-slate-100 text-sm">
                        <ion-col>
                            <ion-input :value="foc.variant.product_name" readonly="readonly" class="text-sm"></ion-input> 
                             <!-- {{ foc.variant.product_name}} -->
                        </ion-col>
                        <ion-col> 
                              
                                     
                                    <!-- <div v-for="u in units" :key="u.id">
                                            <div v-if="u.product_id == foc.variant.product_id" >
                                                 <select v-model="foc.unitId" class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                            <option :value="u.id">{{u.unit}}</option>
                                                        </select>
                                            </div>
                
                                    </div> -->
                                      <select v-model="foc.unitId" 
                                                                    class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                                        <option v-for=" u in foc.unit" :key="u.id" :value="u.id">
                                                                            <span> {{u.unit}}  </span>
                                                                        </option>
                                                             </select>
        
                        </ion-col>
                        <ion-col> 
                             <ion-input value="foc item" readonly="readonly" class="text-sm"></ion-input> 
                        </ion-col>
                        
                        <ion-col>
                            <ion-input v-model="foc.quantity" class="text-center text-sm"></ion-input>
                        </ion-col>
                        <ion-col> 
                             <ion-input value="00.00" readonly="readonly" class="text-sm"></ion-input>    
                        </ion-col>
                        <ion-col> 
                             <ion-input value="00.00" readonly="readonly" class="text-sm"></ion-input>    
                        </ion-col>

                          <ion-col>
                            <ion-button type="submit" @click="removeFocs(foc)" fill="clear"> 
                                  <ion-icon :icon="trashSharp" slot="icon-only"  color="danger" class="py-3 text-sm"></ion-icon>
                            </ion-button>
                        </ion-col>
                </ion-row>


                <ion-row class="text-sm">
                   
                        <ion-col offset-4 class="ion-text-end"> Total </ion-col>
                        <ion-col class="ion-text-center"> {{ getRetailTotal}}</ion-col>
                   
                </ion-row>


                <div v-for="cartDis in cartDiscounts" :key="cartDis.id">
                    <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                          <ion-row class="text-sm">
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
               

                <ion-row class="text-sm">
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=""> 
                            
                             
                                <select name="" id="" v-model="tax" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                    <option v-for="(t,index) in taxes" :key="index" :value="t.rate"> {{t.name}} </option>
                                </select>
                            
                             
                                <ion-text class="inputText">  {{addTax}} </ion-text>
                           
                                <!-- <ion-item class=" w-full">
                                     <ion-label> Select Tax </ion-label>
                                <ion-select name="" id="" v-model="tax" class=" rounded-md w-20">
                                    <ion-select-option v-for="t in taxes" :key="t.id" :value="t.rate"> {{t.name}} </ion-select-option>
                                </ion-select>
                               
                                </ion-item>
                               
                                <ion-text class="inputText">  {{addTax}} </ion-text> -->
                           
                    </ion-col>
                </ion-row>

                <ion-row class="text-sm">
                    <ion-col offset-4 class="ion-text-end"> Deli </ion-col>
                    <ion-col class="ion-text-center"> <ion-input v-model="saleData.deli" class="bg-white rounded-md w-3/6 px-2 py-2 mx-auto block"></ion-input></ion-col>
                </ion-row>

                <ion-row class="text-lg font-thin">
                    <ion-col offset-4 class="ion-text-end"> Grand Total</ion-col>
                    <ion-col class="ion-text-center"> {{ addTotal }}</ion-col>
                </ion-row>

            </ion-grid>

            <div class=" mt-4 text-right">
                 <ion-button color="danger" shape="round" 
                         size="" name="star"  @click="clearCart()" class="mx-2"> 
                    Remove items
                </ion-button>

                <ion-button color="secondary" shape="round" 
                 slot="end" size="" name="star" @click="hide()" class="mx-2" :disabled=" addTotal == 0"> 
                    Continue
                 </ion-button>
            </div>

        </div>

           
               
               
        
          
           </ion-content>

           <!---------------------- sale field end ------------------------>


            <!----------------------- customer filed start ------------------->
           <ion-content v-if="visiable">
            
            <div class="flex justify-center items-center">
                 <ion-card class=" w-full rounded-lg mx-3 my-4  px-2 py-3 bg-gradient-to-t from-sky-200 to to-lime-50">
                    <ion-card-header>
                        
                        <ion-card-title class=" flex justify-between">
                            <ion-button @click="show" color="secondary" shape="round"> Sale Page </ion-button>
                               <ion-chip shape="round" color="success" @click="openModal"> 
                                    <ion-icon :icon="personAddOutline"></ion-icon>
                               </ion-chip>
                            
                           
                        </ion-card-title>
                       
                             <ion-searchbar debounce="500" v-model="search" @input="filterCustomer" autocomplete="off" placeholder="search customer ..."></ion-searchbar>
                        <ion-list v-if="!(search == '')">
                             <ion-item v-for="data in filteredCustomer" class=" my-2 rounded" :key="data.id" @click="addData(data)">
                                    <ion-label :value="data"> {{data.name}}</ion-label>
                            </ion-item> 
                        </ion-list>
                       
                    </ion-card-header>

                    <ion-card-content>
                         <div class="flex justify-center items-center">
                               
                            <div class=" px-3 py-2 rounded-xl w-full mt-2 bg-white">
                                  <ion-item>
                                        <ion-label position="floating"> Add Title </ion-label>
                                        <ion-input input="text" v-model="saleData.customer_title"></ion-input>
                                    </ion-item>

                                <div class="my-4">
                                      <h4 class="font-bold text-gray-800"> Customer Infomation </h4>
                                </div>
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
                 
                       
                               <ion-card-title>
                                    <div class="my-4">
                                         <h4 class="font-bold text-gray-800"> Invoice Infomation </h4>
                                    </div>
                                  
                                </ion-card-title>
                                <ion-item class="">
                                   
                                  
                                        <ion-label> Invoice Date </ion-label>
                                         <input type="date" v-model="saleData.inv_date" class=" bg-slate-50 mx-2 px-3 py-2 rounded" placeholder="invoice date" />
                     
                                </ion-item>
                                 <ion-item>
                                        <ion-label> Due Date </ion-label>
                                         <input type="date" v-model="saleData.due_date" class=" bg-slate-50 mx-2 px-3 py-2 rounded" placeholder=" due date"/>
                                </ion-item>
               
                                    <ion-item>
                                      <ion-label> Select Payment Method </ion-label>
                                    <ion-select v-model="saleData.payment_method">
                                        <ion-select-option v-for="(p,index) in payments" :key="index" :value="p"> {{p}}</ion-select-option>
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
                           
                             <ion-button :disabled="posting" type="submit"  @click="submitData()" shape="round" > Submit </ion-button>
                             <ion-spinner  name="circles" v-if='posting' class="mx-3"> </ion-spinner>
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
        IonSearchbar, IonList, IonItem, IonButton, IonSpinner, IonChip, IonIcon,
        IonCard, IonCardHeader, IonCardContent, IonCardTitle,  modalController, alertController} from '@ionic/vue'
import { mapGetters } from "vuex";
import {addCircleOutline, removeCircleOutline, trashSharp, returnUpBack, personAddOutline} from 'ionicons/icons';
import axios from 'axios';
//import Customer from '../../component/Sale/CustomerRecord.vue'
import Create from '../../component/Sale/CreateCustomer.vue'
import Loader from '../../component/LoaderComponent.vue'
import moment from 'moment'

const url = "retail/invoice";

export default {
    components:{
       IonContent,
        IonGrid,IonRow,IonCol,
        IonButton,IonText,IonInput,
        IonLabel,IonSelect,IonSelectOption,
        IonSearchbar, IonList, IonItem, IonSpinner,
        IonCard, IonCardHeader, IonCardContent,  IonCardTitle,
         IonChip, IonIcon,Loader
    },

    data() {
        return {
            //cusload: false,
            posting: false,
            loading: false,
            test:'',
            openItem: true,
            visiable:false,
            unitId:'',
            tax:'',
            deli:'',
            discount:'',
            state:'',
            searchItem:'',
            search:'',
            
            zone_id:'',
            moment: moment,

             payments:[],
            filteredItems:[],
            products:[],
            filteredStates:[],
            filteredCustomer:[],
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
                inv_date:moment().format('YYYY-MM-DD'),
                due_date:moment().add('day', 1) . format('YYYY-MM-DD'),
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
            addCircleOutline, removeCircleOutline, trashSharp, returnUpBack, personAddOutline
        }
        
    },

    methods:{
         async presentAlert() {
            const alert = await alertController
                .create({
                cssClass: 'my-custom-class',
                header: 'Fail',
                //subHeader: '',
                message: 'Need to Fill Complete Data',
                buttons: ['OK'],
                });
            await alert.present();

            const { role } = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
            },

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
            this.$store.dispatch("addToRetail", data);
        },

        remove(product){
            this.$store.dispatch('removeRetail', product);
        },

        removeItem(product){
            this.$store.dispatch('removeRetailProduct', product);
        },

        removeFocs(foc){
            this.$store.dispatch('removeRetailFoc', foc);
        },
 
        async clearCart(){
             const alert = await alertController
                .create({
                cssClass: 'my-custom-class',
                header: 'Clear Cart',
                message: '<strong>Are You Sure To Destroy All </strong>',
                buttons: [
                    {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler:() => {
                        //console.log('Confirm Cancel:', blah)
                    },
                    },
                    {
                    text: 'Okay',
                    id: 'confirm-button',
                    handler: () => {
                     this.$store.dispatch("clearRetailCart");
                    },
                    },
                ],
                });
            return alert.present();
            
            
        },

        clearCartData(){
            this.$store.dispatch("clearRetailCart")
        },

        addFoc(data){
            this.$store.dispatch("addRetailFoc", data)
        },

         removeRetailFoc(foc){
            this.$store.dispatch('removeRetailFoc', foc)
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
                // close:() => this.closeModal(),
            },
            });
            return modal.present();
        },

        // async closeModal(){
        //     await modalController.dismiss();
        // },

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
                    total : this.getRetailTotal,
                    invoice_type: this.saleData.invoice_type,
                    delivery_fee: 0 ,
                    warehouse_id: this.warehouseId,
                    sale_type: 'Retail Sale',
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

                if( inv_id == null){
                    this.presentAlert();
                    this.posting = false;
               }

                else{
                     this.posting = false ;
                    this.$router.push({name:'invoice.detail', params:{id :inv_id}});
                    this.show();
                    this.reset();
                    this.clearCartData();
                }
                
               
               

                // this.$router.push({name: 'invoice.detail', params:{id :response.data.invoice_id}});

                // this.reset();
                // this.clearCart();

                //console.log(response)
        },

        // refresh(){
        //     this.cusload = true;
        //     axios.get( url, {
        //          headers: {
        //         'Authorization': "Bearer" + localStorage.getItem('token'),
        //          },
        //     }) .then (res => {
        //         this.customers = res.data.allcustomers
        //     }) .finally (() => this.cusload = false)
        // },
        

         async wholeSales(){
             this.loading = true
              await axios.get(url, { 
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
                    .then(res => {
                         this.payments = res.data.payment_method;
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

        //  customer(){
        //     return this.$store.state.customer;
        // },
        
         cartItems(){
            return this.$store.getters.retailItems;
        },

            focItems(){
                return this.$store.getters.retailFocs;
            },

            finalFocs(){
                return this.$store.getters.finalRetailFocs;
            },

            finalItems(){
                return this.$store.getters.finalRetailItems;
            },

        ...mapGetters(["getRetailTotal"]),

        addTotal(){
            let a = Number(this.getRetailTotal);
            let b = Number(this.addTax);
            let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + ( b + d );
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.tax);
            let amt = Number(this.getRetailTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.discount);
            let amt = Number(this.getRetailTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },

       


    },

    created() {
        this.wholeSales();
          //setInterval(this.wholeSales, 5000);
    },
    
}
</script>

<style scoped>
    .top{
        position:fixed;
        top:10;
        background: white;
    }

     ion-searchbar{
        --border-radius:30px;

    }

    ion-col{
        --max-width:15%;
        border: 0.5px solid rgba(247, 233, 233, 0.596);
        
    }
</style>