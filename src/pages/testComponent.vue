<template>
    <master-layout pageTitle="test">
        <ion-content>


            <div class="bg-profile" text-center padding>
                <img src="/assets/fulfil.png" class=" mx-auto block">
            </div>

            <ion-card class="bg-white" no-margin>
                <ion-card-content>
                <h1 margin-bottom>
                    <ion-text color="primary"><strong>Ionic 4 Start Theme Application</strong></ion-text>
                </h1>
                
                <p margin-bottom>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio placeat incidunt nesciunt atque ratione
                    quisquam, fugit omnis maxime adipisci excepturi dignissimos aliquam asperiores itaque unde sequi? Minus, quia,
                    dolore?
                </p>
                
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio placeat incidunt nesciunt atque ratione
                    quisquam, fugit omnis maxime adipisci excepturi dignissimos aliquam asperiores itaque unde sequi? Minus, quia,
                    dolore?
                </p>
                </ion-card-content>
            </ion-card>

     
  <ion-item class="bg-profile mt-10">
    <ion-avatar slot="start">
      <img src="/assets/direction.svg" class="user-avatar">
    </ion-avatar>
    <ion-label>
      <ion-text color="success">
        <h2>
          <strong>João Firmino</strong>
        </h2>
      </ion-text>
      <ion-text color="tertiary">
        <h3>
          firminoata@gmail.com
        </h3>
      </ion-text>
      <ion-button icon-left size="small" shape="round" color="">
        <ion-icon name="contact"></ion-icon>
        Edit profile
      </ion-button>
      <ion-button icon-left size="small" shape="round" color="secondary">
        <ion-icon name="log-out"></ion-icon>
        logout
      </ion-button>
    </ion-label>
  </ion-item>

  <ion-list no-border>
    <ion-list-header>
      <ion-text color="dark">
        <h5>General</h5>
      </ion-text>
    </ion-list-header>
    <ion-item>
      <ion-icon name="settings" slot="start" color="primary"></ion-icon>
      <ion-label color="primary">App Language</ion-label>
      <ion-select>
        <ion-select-option> Myannamr </ion-select-option>
        <ion-select-option> English </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-icon name="notifications" slot="start" color="primary"></ion-icon>
      <ion-label class="label" color="primary"> Enable notifications </ion-label>
      <ion-toggle></ion-toggle>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>
      <ion-text color="dark">
        <h5>Currency</h5>
      </ion-text>
    </ion-list-header>
    <ion-item>
      <ion-icon name="card" slot="start" color="primary"></ion-icon>
      <ion-label color="primary">Payment Method</ion-label>
      <ion-select>
        <ion-select-option> Method 1</ion-select-option>
        <ion-select-option> Method 2</ion-select-option>
        <ion-select-option> Method 3</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-icon name="logo-usd" slot="start" color="dark"></ion-icon>
      <ion-label color="primary">Currency</ion-label>
      <ion-select>
        <ion-select-option>MMK</ion-select-option>
       <ion-select-option>USD</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>
      <ion-text color="dark">
        <h5>Other</h5>
      </ion-text>
    </ion-list-header>
    <ion-item>
      <ion-icon name="mail" slot="start" color="primary"></ion-icon>
      <ion-label class="label" color="primary">Enable Promotions</ion-label>
      <ion-toggle></ion-toggle>
    </ion-item>
    <ion-item>
      <ion-icon name="mail" slot="start" color="primary"></ion-icon>
      <ion-label class="label" color="primary">Enable History</ion-label>
      <ion-toggle></ion-toggle>
    </ion-item>
  </ion-list>

  <ion-button @click="open" v-if="! isOpen">
      open
  </ion-button>

   <ion-button @click="close" v-if="isOpen">
      close
  </ion-button>
  <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" v-if="isOpen"></StreamBarcodeReader>


    </ion-content>
   
        
    </master-layout>
   
</template>
<script>
import { IonContent, IonCard, IonCardContent, IonItem, IonAvatar, IonLabel,
        IonText, IonButton, IonIcon, IonList, IonListHeader, IonSelect,
        IonSelectOption,  } from '@ionic/vue';


import { StreamBarcodeReader } from  "vue-barcode-reader" ;
  //Vue.use(StreamBarcodeReader);

  



export default {

  data() {
    return {
      isOpen: false
    }
  },

    components:{
        IonContent, IonCard, IonCardContent, IonItem, IonAvatar, IonText, IonButton, IonIcon, IonList, IonListHeader, IonSelect, IonSelectOption,
        IonLabel, StreamBarcodeReader
    },

    methods: {
      open(){
        this.isOpen = true
      },

      close(){
        this.isOpen = false
      },

      onDecode (result) 
       { console.log(result) } 

    },
    


  
}
</script>

<style scoped>
    /* ion-content {
    --background: linear-gradient(-135deg, var(--ion-color-medium), var(--ion-color-light))
  } */


ion-avatar {
    width: 68px;
    height: 68px;
}
</style>