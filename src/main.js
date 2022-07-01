import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import MasterLayout from './component/MasterLayout.vue'
//import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
import store from './store';
import HighchartsVue from './chart';
//import VueBarcodeScanner from 'vue3-barcode-scanner'
import './axios';
import './index.css';


import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  //.use(VueBarcodeScanner)
  .use(HighchartsVue)

    app.use(store);
    app.component('master-layout' , MasterLayout);
  
router.isReady().then(() => {
  app.mount('#app');
});