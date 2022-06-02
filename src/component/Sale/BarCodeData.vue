<template >
 
      <ion-button @click="scan()">  <ion-icon  :icon="barcodeOutline" /> </ion-button>
    
</template> 

<script>

import {IonButton} from "@ionic/vue"
import { barcodeOutline} from 'ionicons/icons'
export default {
  //name: "CameraPage",
  data() {
        return{
         code:'',
         product:{},
         filteredProducts:[],
         msg: "Welcome to Your Vue Capacitor App",
        }
  },

  props:["wholeSales"],

  setup(){
      return{
          barcodeOutline
      }
  },

  components:{
    IonButton
  },

  methods: {
    scan() {
     
      window.cordova.plugins.barcodeScanner.scan(
        result => {
          console.log(result);
          // alert(
          //   "We got a barcode\n" +
          //     "Result: " +
          //     result.text +
          //     "\n" +
          //     "Format: " +
          //     result.format +
          //     "\n" +
          //     "Cancelled: " +
          //     result.cancelled
          // );
        this.code = result.text;

        },
        error => {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: true, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place a barcode inside the scan area", // Android
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: false, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      );
    },
    
  },

  computed: {
    products(){
      return this.$store.getters.products;
    }
  },
  
  activated() {
    console.log("activated")
  }
};
</script>