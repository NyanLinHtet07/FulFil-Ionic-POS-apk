import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

let btSerial = BluetoothSerial;

export class PrintProvider {

//   constructor(private btSerial:BluetoothSerial,private alertCtrl:AlertController) {
    
//   }



  searchBluetoothPrinter()
  {
  
    return btSerial.list();
  }

  connectToBluetoothPrinter(macAddress)
  {
    return btSerial.connect(macAddress);

  }

  disconnectBluetoothPrinter()
  {
    return btSerial.disconnect();
  }

  sendToBluetoothPrinter(macAddress, data_string){
    //trying connecting to bluetooth printer
    this.connectToBluetoothPrinter(macAddress)
          .subscribe(
              btSerial.write(data_string)
            .then (
               this.disconnectBluetoothPrinter() 
            )
          )
  }

  // testPrint(address)
  // {
  //   let printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"

    
  //   let xyz=this.connectBT(address).subscribe(data=>{
  //     this.btSerial.write(printData).then(dataz=>{
  //       console.log("WRITE SUCCESS",dataz);

  //       // let mno=this.alertCtrl.create({
  //       //   title:"Print SUCCESS!",
  //       //   buttons:['Dismiss']
  //       // });
  //       mno.present();

  //       xyz.unsubscribe();
  //     },errx=>{
  //       console.log("WRITE FAILED",errx);
  //       // let mno=this.alertCtrl.create({
  //       //   title:"ERROR "+errx,
  //       //   buttons:['Dismiss']
  //       // });
  //       mno.present();
  //     });
  //     },err=>{
  //       console.log("CONNECTION ERROR",err);
  //       // let mno=this.alertCtrl.create({
  //       //   title:"ERROR "+err,
  //       //   buttons:['Dismiss']
  //       // });
  //       mno.present();
  //     });

  // }

}