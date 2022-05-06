<template>
     <ion-content>
            <!-- <ion-list>
                <ion-item v-for="data in products" :key="data.id" @click="addToCart(data)">
                    <ion-button> {{data.name}} </ion-button>
                </ion-item>
            </ion-list> -->

            <ion-grid class="ion-margin w-full">
                <ion-row class="ion-text-center tableHead font-extrabold">
                    <ion-col> Name </ion-col>
                    <ion-col> Unit </ion-col>
                    <ion-col> Price </ion-col>
                    <ion-col> Quantity  </ion-col>
                    <ion-col> Total </ion-col>
                </ion-row> 
                <ion-row v-for="product in cartItems" :key="product.id" class="ion-text-center cell">
                  
                        <ion-col> {{ product.product_name }}</ion-col>
                        <ion-col> 
                               <ion-item>
                                    <ion-label> Select Unit</ion-label>
                                        <ion-select v-model="unitId">
                                            <ion-select-option v-for="u in product.unit" :key="u.id" :value="u.id"> 
                                                    {{ u.unit}} 
                                            </ion-select-option>
                                        </ion-select>

                                </ion-item>    
                            <!-- <ion-item>
                                <select v-model="unitId">
                                    <option v-for="u in product.unit" :key="u.id" :value="u.id"> {{u.unit}}</option>
                                </select>
                            </ion-item> -->
                                
                        </ion-col>
                        <ion-col>
                                <p v-for="(p,index) in prices" :key="index">
                                    <span v-if="p.unit_id === unitId"> 
                                        {{p.price}}
                                    </span>
                                </p>
                        </ion-col>
                        <ion-col> 
                            <ion-button @click="add(product)" shape="round" size="small" class="native"> <ion-icon :icon="addCircleOutline" /> </ion-button>   
                            <ion-text> {{ product.quantity}} </ion-text>
                            <ion-button @click="remove(product)" shape="round" size="small" class="native" color="danger"> <ion-icon :icon="removeCircleOutline" />  </ion-button> 
                        </ion-col>
                        <ion-col>
                              <p v-for="(p,index) in prices" :key="index">
                                    <span v-if="p.unit_id === unitId"> 
                                        {{p.price * product.quantity}}
                                    </span>
                                </p>
                           
                        </ion-col>
                   
                </ion-row> 
                <ion-row>
                   
                        <ion-col offset-4 class="ion-text-end"> Total </ion-col>
                        <ion-col class="ion-text-center"> {{ getTotal}}</ion-col>
                   
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Discount </ion-col>
                    <ion-col class="ion-align-self-center"> <ion-input v-model="discount" type="number" placeholder="add %"></ion-input> 
                        <ion-text class="inputText">{{addDis}}</ion-text> 
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=""> 
                            <div>
                                <ion-input type="number" v-model="tax" placeholder="add %"></ion-input>
                                <ion-text class="inputText">  {{addTax}} </ion-text>
                            </div>
                    </ion-col>
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Deli </ion-col>
                    <ion-col class="ion-text-center"> <ion-input v-model="deli"></ion-input></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Grand Total</ion-col>
                    <ion-col class="ion-text-center"> {{ addTotal }}</ion-col>
                </ion-row>

            </ion-grid>

            <ion-item>
                <ion-button @click="saveData" expand="block" color="secondary" shape="round" 
                 slot="end" size="" name="star"> 
                    Save 
                 </ion-button>
            </ion-item>

           </ion-content>
</template>

<script>
import {IonContent,IonGrid,IonRow,IonCol, IonButton, IonText, IonInput, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue'
import { mapGetters } from "vuex";
import { addCircleOutline, removeCircleOutline} from 'ionicons/icons';
import axios from 'axios';

const url = "http://54.169.124.45/api/auth/mobile_invoice/create";

export default {
    components:{
        IonContent,
        IonGrid,IonRow,IonCol,
        IonButton,IonText,IonInput,
        IonLabel,IonSelect,IonSelectOption
    },

    data() {
        return {
            unitId:'',
            tax:'',
            deli:'',
            discount:'',
            prices:[],

            saleData: {
                cartItems:'',
                tax:'',
                discount:'',
                deli:'',
                totalPrice:'',
                grandtotal:'',
                customer_name:'',
                customer_address:'',
                customer_phone:'',
                customer_title:'',
                customer_shipping:'',
                customer_description:''
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

        clearCart(cartItems){
            this.$store.dispatch("clearCart" , cartItems);
        },

        saveData(){

                this.saleData.cartItems = this.cartItems,
                this.saleData.tax = this.addTax,
                this.saleData.discount = this.addDis,
                this.saleData.deli = this.deli,
                this.saleData.totalPrice = this.getTotal,
                this.saleData.grandtotal = this.addTotal,
                this.saleData.customer_name = this.customer.name,
                this.saleData.customer_address = this.customer.address,
                this.saleData.customer_phone = this.customer.phone,
                this.saleData.customer_title = this.customer.title,
                this.saleData.customer_shipping = this.customer.shipping_address,
                this.saleData.customer_description = this.customer.description,
                
                this.$store.dispatch('addSale', this.saleData);
                this.clearCart();
                this.addTotal = '' ;
                this.tax = '' ;
                this.discount = '' ;
                this.deli = '';
        },

         async wholesale(){
              await axios.get(url)
                    .then(res => {
                        //this.retails = res.data.aval_product;
                        this.prices = res.data.prices
                    })
        }
        

    },

    computed:{
         customer(){
            return this.$store.state.customer;
        },
        
         cartItems(){
            return this.$store.getters.cartItems;
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
        this.wholesale();
    },
    
}
</script>