<template>
  <ion-app>
     <Menu></Menu>
    <ion-router-outlet id="main-content"/>
    <div class=" z-40 fixed bottom-6 left-0">
                <ion-button @click="rotateLamp()" class="" fill="clear" shape="round" size="large" v-if="visible"> <img src="/assets/rotate.png" alt="" class="px-1 py-1 bg-sky-500 w-8 rounded-lg drop-shadow-lg" /> </ion-button>
                <ion-button @click="rotatePort()" class="" fill="clear" shape="round" size="large" v-if="! visible"> <img src="/assets/rotate.png" alt="" class="px-1 py-1 bg-lime-800 w-8 rounded-lg drop-shadow-lg" /> </ion-button>      
      </div>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './component/MenuSide.vue';
import { ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation'
import { refreshCircle } from 'ionicons/icons'
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app';

export default defineComponent({
  name: 'App',

  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
    
    return{
       refreshCircle,
    }
  },

  data() {
    return {
      visible: true,
       screenOrientation : ScreenOrientation,
    }
  },
  components: {
    IonApp,
    IonRouterOutlet,
  
    IonButton,
    Menu
  },

  methods: {
       

        rotateLamp(){
            //this.screenOrientation.unlock();
            //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            this.visible = false;
        },

        rotatePort(){
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            this.visible = true;
        }
    }
});
</script>