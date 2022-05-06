
 <script>
// import { BluetoothSerial} from "@ionic-native/bluetooth-serial"
// export default {
//     data() {
//         return {
//             pairDevice: '',
//             unpairDevice:'',
//             gettingDevice:Boolean,
//         }
//     },
//     components:{
//         bluetoothserial : BluetoothSerial,
//     },

//     methods: {
//                         startScanning() {
//                         this.pairedDevices = null;
//                         this.unpairedDevices = null;
//                         this.gettingDevices = true;
//                         this.bluetoothSerial.discoverUnpaired().then((success) => {
//                         this.unpairedDevices = success;
//                         this.gettingDevices = false;
//                         success.forEach(element => {
//                             // alert(element.name);
//                         });
//                         },
//                         (err) => {
//                             console.log(err);
//                         })

//                         this.bluetoothSerial.list().then((success) => {
//                         this.pairedDevices = success;
//                         },
//                         (err) => {

//                         })
//                     },
//                     success = (data) => alert(data);
//                     fail = (error) => alert(error);

//                     selectDevice(address: any) {

//                         let alert = this.alertCtrl.create({
//                         title: 'Connect',
//                         message: 'Do you want to connect with?',
//                         buttons: [
//                             {
//                             text: 'Cancel',
//                             role: 'cancel',
//                             handler: () => {
//                                 console.log('Cancel clicked');
//                             }
//                             },
//                             {
//                             text: 'Connect',
//                             handler: () => {
//                                 this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
//                                 // this.bluetoothSerial.connect(address).subscribe(data => {
//                                 //   this.yazdir()
//                                 // });

//                             }
//                             }
//                         ]
//                         });
//                         alert.present();


//                     },

//                     disconnect() {
//                         let alert = this.alertCtrl.create({
//                         title: 'Disconnect?',
//                         message: 'Do you want to Disconnect?',
//                         buttons: [
//                             {
//                             text: 'Cancel',
//                             role: 'cancel',
//                             handler: () => {
//                                 console.log('Cancel clicked');
//                             }
//                             },
//                             {
//                             text: 'Disconnect',
//                             handler: () => {
//                                 this.bluetoothSerial.disconnect();
//                             }
//                             }
//                         ]
//                         });
//                         alert.present();
//                     },

//                     yazdir() {
                    
//                         let dataX = "aaaa";
//                         this.bluetoothSerial.write(this.metin).then(data => {
//                         console.log(data);
//                         });
                    
//                         },
   
// }
// </script>