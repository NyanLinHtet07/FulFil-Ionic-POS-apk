<template>
    <ion-buttons>
        <ion-button @click="print()"> print </ion-button>
    </ion-buttons>
    <div id="print-wrapper">
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sint cum at vitae quas praesentium, 
            placeat magni atque maxime commodi?
             Impedit qui sint, dignissimos rem natus magnam corrupti quos dolore?</p>
    </div>
</template>

<script>

// import JSPDf from "jspdf";
// //const domtoimage =  require('dom-to-image');
// import domtoimage from 'dom-to-image';
//import { File} from "@ionic-native/file";
import { IonButtons, IonButton} from "@ionic/vue";
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';
export default {
    data() {
        return {
            pdfGenerator : PDFGenerator,
        }
    },

    components:{
        IonButtons, IonButton
    },

    methods:{
        print(){
           
            this.content = document.getElementById('print-wrapper').innerHTML;
                    let options = {
                    documentSize: 'A4',
                    type: 'share',
                    // landscape: 'portrait',
                    fileName: 'Order-Invoice.pdf'
                    };
                    this.pdfGenerator.fromData(this.content, options)
                    .then((base64) => {
                        console.log('OK', base64);
                    }).catch((error) => {
                        console.log('error', error);
                    });
                            
            
        }
    }

    
}
</script>