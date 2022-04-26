<template>
    <div>
        <ion-button @click="scanBarcode"> Click Me</ion-button>
    </div>
</template>
<script>
//import { BarcodeScanner,BarcodeScannerOptions} from "@ionic-native/barcode-scanner"
import {IonButton} from "@ionic/vue"
export default {

    data() {
        return {
            code:'',
        }
    },

    components:{
        IonButton,
  //      BarcodeScanner,
    },

    methods: {
        
        // async dataToScan(){
        //   const data = await BarcodeScanner.scan();
        //   alert(JSON.stringify(data));
        //   this.code = data.text
        // }
        // cordova.plugins.barcodeScanner.scan(
        //     function (result) {
        //         alert("We got a barcode\n" +
        //                 "Result: " + result.text + "\n" +
        //                 "Format: " + result.format + "\n" +
        //                 "Cancelled: " + result.cancelled);
        //     },
        //     function (error) {
        //         alert("Scanning failed: " + error);
        //     }
        // ),

        // async scanBarcode( frontCamera = true, flipCamera = true, torchButton = true){
        //     return new Promise((resolve, reject) => {
        //         cordova.plugins.barcodeScanner.scan(
        //             (result) => {
        //                 resolve(result.text);
        //             },
        //             (error) => {
        //                 reject(error);
        //             },
        //             {
        //                 preferFrontCamera: frontCamera,
        //                 showFlipCameraButton : flipCamera,
        //                 showTorchButton: torchButton,
        //                 trochOn: false,
        //                 saveHistory: false,
        //                 prompt: "Place barcode inside scan area",
        //                 resultDisplayDuration:500,
        //                 formats: "ALL_1D,AZTEC,CODABAR,CODE_39,CODE_93,CODE_128,EAN_8,EAN_13,UPC_A,UPC_E,UPC_EAN_EXTENSION,DATA_MATRIX,ITF,MAXICODE,MSI,RSS_14,PDF_417,PLESSEY", // default: all but PDF_417 and RSS_EXPANDED
        //                 disableAnimations: true, 
        //                 disableSuccessBeep: false 
        //             }
        //         )
        //     })
        // }
    },
    
}
</script>
<style>
    
</style>