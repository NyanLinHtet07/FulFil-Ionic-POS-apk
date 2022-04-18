<template>
   <ion-page>
       <ion-header>
              
                  <ion-toolbar>
                     <ion-buttons slot="start">
                     <ion-back-button default-href="home"></ion-back-button>
                     </ion-buttons>
                     <ion-title>Order Detail </ion-title>
                  </ion-toolbar>
                
            </ion-header>
      <ion-content>
        
         <ion-grid class="customerInfo">
             <ion-text> <h4> INV - {{ loadedSale.id}} </h4></ion-text>
            <ion-row>
               <ion-col>
                  <ion-text color="tertiary"> <h5> Customer  </h5> </ion-text>
               </ion-col>
               <ion-col>
                  <ion-text> <h5> {{ loadedSale.customer}} </h5></ion-text>
               </ion-col>
            </ion-row>
            <ion-row>
               <ion-col>
                   <ion-text  color="tertiary"> <h5> Phone </h5> </ion-text>
               </ion-col>
               <ion-col>
                  <ion-text> <h5> {{ loadedSale.phone}} </h5></ion-text>
               </ion-col>
            </ion-row>
            <ion-row>
               <ion-col>
                   <ion-text color="tertiary"> <h5> Address </h5> </ion-text>
               </ion-col>

               <ion-col>
                  <ion-text> <h5> {{ loadedSale.address}} </h5></ion-text>
               </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                   <ion-text color="tertiary"> <h5> Shipping Address </h5></ion-text>
                </ion-col>

                <ion-col>
                    <ion-text> <h5> {{ loadedSale.shipping_address}} </h5></ion-text>
               </ion-col>
            </ion-row>
              
               
         
         </ion-grid>


            <ion-grid class="ion-margin table">
                <ion-row class="ion-text-center tableHead">
                    <ion-col> Name </ion-col>
                    <ion-col> Price </ion-col>
                    <ion-col> Quantity  </ion-col>
                    <ion-col> Total </ion-col>
                </ion-row> 
                <ion-row v-for="product in loadedSale.cartItems" :key="product.id" class="ion-text-center cell">
                  
                        <ion-col> {{ product.name }}</ion-col>
                        <ion-col>{{ product.price}}</ion-col>
                        <ion-col> 
                          
                            <ion-text> {{ product.quantity}} </ion-text>
                          
                        </ion-col>
                        <ion-col>{{ product.price * product.quantity}}</ion-col>
                   
                </ion-row> 
                <ion-row>
                   
                        <ion-col offset-4 class="ion-text-end"> Total </ion-col>
                        <ion-col> <ion-text class="inputText"> {{ loadedSale.totalPrice}} </ion-text></ion-col>
                   
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Discount </ion-col>
                    <ion-col class="">  
                        <ion-text class="inputText">{{loadedSale.discount}}</ion-text> 
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Tax </ion-col>

                    <ion-col class=""> 
                            <div>
                              
                                <ion-text class="inputText">  {{loadedSale.tax}} </ion-text>
                            </div>
                    </ion-col>
                </ion-row>
                <ion-row class="cell">
                    <ion-col offset-4 class="ion-text-end"> Deli </ion-col>

                    <ion-col>
                        <ion-text class="inputText">  {{loadedSale.deli}} </ion-text>
                    </ion-col>
                    
                  
                </ion-row>
                <ion-row>
                    <ion-col offset-4 class="ion-text-end"> Grand Total</ion-col>
                    <ion-col> <ion-text class="inputText"> {{ loadedSale.grandTotal }} </ion-text></ion-col>
                </ion-row>

            </ion-grid>

       
      </ion-content>
   </ion-page>
</template>
<script>

import { IonPage , IonContent, IonHeader, IonToolbar,IonButtons, IonTitle, IonText,
         IonBackButton, IonGrid, IonRow, IonCol} from '@ionic/vue';

export default {

   //props:["pageDefaultBackLink"],

   components:{
         IonPage,
         IonContent,
         IonHeader,
         IonToolbar,
         IonButtons,
         IonBackButton,
         IonTitle,
         IonText,
         IonGrid, IonRow, IonCol
   },
    data(){
       return {
          saleId: this.$route.params.id,
       }
    },

    computed:{
       loadedSale(){
          return this.$store.getters.saleRecord(this.saleId);
       }
    },

   //  watch:{
   //     $route(currentRoute){
   //        this.saleId = currentRoute.params.id;
   //     },
   //  }
}
</script>

<style scope>
      .customerInfo{
         background-color: rgb(241, 241, 241);
         padding: 10px;
      }

       .cell{
        border-color: aliceblue;
        border-width: .01em; 
        border-style:solid; margin-bottom : -1px;
        background-color: rgb(241, 238, 238)
    }
    .tableHead{
        background-color: rgb(202, 202, 231);
        padding: 5px;
    }

     .inputText{
        margin:auto;
        padding: auto;
        font-weight: bold;
        color: rgb(122, 118, 118);
        display: block;
        text-align: center;
    }

</style>
