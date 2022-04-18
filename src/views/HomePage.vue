<template>
  <ion-page>
      <ion-tabs>
    
       
      
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home"> <ion-icon :icon="homeOutline" /> Home </ion-tab-button>
              <ion-tab-button tab="sales" href="/sales"> <ion-icon :icon="cartOutline" /> Sales</ion-tab-button>
              <ion-tab-button tab="history" href="/history"> <ion-icon :icon="informationCircleOutline" /> History </ion-tab-button>
               <!-- <ion-tab-button tab="logout" href="/history"> <ion-icon :icon="informationCircleOutline" /> History </ion-tab-button> -->
            </ion-tab-bar>
            <ion-router-outlet></ion-router-outlet>
      </ion-tabs>
  
  </ion-page>
</template>

<script>
import {  IonPage,  IonTabBar, IonTabButton, 
          IonRouterOutlet, IonTabs, IonIcon, 
        } from '@ionic/vue';
 import { defineComponent } from 'vue';
 import { homeOutline , cartOutline, informationCircleOutline } from 'ionicons/icons';


export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
    IonTabs,
    IonIcon,
   
  },

  setup(){
            return{
                informationCircleOutline, homeOutline , cartOutline
            }
        },
    
  
    });
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}


</style>
