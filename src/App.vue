<template>
  <ion-app>
     <Menu></Menu>
    <ion-router-outlet id="main-content"/>
    <div class=" z-40 fixed bottom-0 left-0 mx-3 my-2">
                <ion-button @click="rotateLamp()" class="" fill="clear" shape="round" size="large"> <ion-icon :icon="refreshCircle" class=" text-lime-700/80 text-4xl" v-if="visible"></ion-icon> </ion-button>
                <ion-button @click="rotatePort()" class="" fill="clear" shape="round" size="large"> <ion-icon :icon="refreshCircle" class=" text-sky-600/80 text-4xl" v-if="! visible"></ion-icon> </ion-button>      
      </div>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './component/MenuSide.vue';
import { ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation'
import { refreshCircle } from 'ionicons/icons'

export default defineComponent({
  name: 'App',

  setup() {
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