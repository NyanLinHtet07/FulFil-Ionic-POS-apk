<template >
  
  <master-layout pageTitle="Home Page">
       
    <ion-content padding>
      <img :src="imageUrl ? imageUrl : null" />
      <!-- <ion-button @click="takePicture()">Take Picture Now</ion-button> -->
      <ion-button @click="scan()">SCAN</ion-button>
      <pdf></pdf>

      <input type="text" v-model="search" @input="filterCode">

    </ion-content>

    <ion-content>
     

     

      <ion-button expand="full" @click="printStuff()">
            Print
      </ion-button>
       <ion-button expand="full" @click="pdf()">
            pdf
      </ion-button>
      <!-- <test></test> -->
    </ion-content>
  </master-layout>
   
 
</template> 

<script>
import { IonContent, IonButton } from '@ionic/vue'
import {jsPDF} from 'jspdf'
import pdf from '../component/pdfComponent.vue'
//import axios from 'axios'
//import test from '../component/testComponent.vue' 



export default {
  name: "CameraPage",
  data() {
    return {
      msg: "Welcome to Your Vue Capacitor App",
      imageUrl: null,
      
      filteredStates:[],
      product:{},
      state:'',
      records:[],

      search:'',
      items:[],
      result:{},

      d:[
        { name: 'a', code:'1234'},
        {name:'b', code:'4567'},

      ]

      //bluetoothList:[],
      //selectedPrinter:'',
    };
  },

  components: {
     IonContent, IonButton, pdf
     
  },
  methods: {

    filterCode(){
        this.items = this.d.filter( s => {
            return s.code.match(this.search);
    })
      this.result = this.items[0];
    
    },
    

    
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
              this.state = result.text;
    
               this.filteredStates = this.products.filter(s => {
                  return s.code.match(result.text);
  
            })

            this.products = this.filteredStates[0];
  
            this.$store.dispatch("addToCart", this.produucts);

          
              
                // if(this.filteredStates){
            //   this.filteredStates.map((data) => {
            //     this.$store.dispatch("addToCart", data);
            //      alert(data);
            //   })
            // }
            
          
         
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

    pdf(){
          var pdf = new jsPDF();

          pdf.text('hello' , 10, 10);
          pdf.save("test.pdf");
    },

    // async getData(){
    //      await axios.get(`mobile_invoice` , {
    //             headers: {
    //             'Authorization': "Bearer" + localStorage.getItem('token'),
    //              },
    //             }) . then( res => {
    //               this.records = res.data 
    //             })
    // }
  


    
    


    // listPrinter(){
     
    //   PrintService.searchBluetoothPrinter()
    //               .then(res =>{
    //                 this.bluetoothList = res;
    //               });
    // },

    // selectPrinter(macAddress)
    // {
    //   this.selectedPrinter = macAddress
    // },

    // printStuff(){
    //   var myText = "Hello hello hello \n \n \n This is a test \n \n";
      

    //   PrintService.sendToBluetoothPrinter(this.selectedPrinter, myText);
    // }

    // pdf(){
    //   var fileName = "myPdfFile.pdf";
    
    //   var options = {
    //       documentSize: 'A4',
    //       type: 'base64'                
    //   };

    //   var pdfhtml = '<html><body style="font-size:120%">This is the pdf content</body></html>';
              
    //     pdf.fromData(pdfhtml , options)
    //       .then(function(base64){               
    //           // To define the type of the Blob
    //           var contentType = "application/pdf";
                  
    //           // if cordova.file is not available use instead :
    //           // var folderpath = "file:///storage/emulated/0/Download/";
    //           var folderpath = cordova.file.externalRootDirectory + "Download/"; //you can select other folders
    //           savebase64AsPDF(folderpath, fileName, base64, contentType);          
    //       })  
    //       .catch((err)=>console.err(err));
    //       }

  },
  computed: {
    products(){
      return this.$store.getters.products;
    },
   
   
  },

  // created(){
  //   this.getData();
  // },
  activated() {
    console.log("activated")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>