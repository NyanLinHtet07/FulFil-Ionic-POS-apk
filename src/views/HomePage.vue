<template>
    <ion-page>
      <!-- <ion-tabs>
            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home"> <ion-icon :icon="homeOutline" /> Home </ion-tab-button>
              <ion-tab-button tab="sales" href="/sales"> <ion-icon :icon="cartOutline" /> Sales</ion-tab-button>
               <ion-tab-button tab="cart" href="/cart"> <ion-icon :icon="cartOutline" /> Cart {{ count}}</ion-tab-button>
              <ion-tab-button tab="history" href="/history"> <ion-icon :icon="informationCircleOutline" /> History </ion-tab-button>
              
            </ion-tab-bar>
            <ion-router-outlet></ion-router-outlet>
      </ion-tabs> -->
     
      <!-- <ion-menu side="start" menu-id="first" content-id="main">
          <ion-header>
              <ion-toolbar>
                  <ion-title> Start Menu </ion-title>
              </ion-toolbar>
          </ion-header>
          <ion-list>
            <ion-item > <ion-button href="/home"> <ion-icon :icon="homeOutline" /> Home </ion-button> </ion-item> 
            <ion-item href="/sales">  <ion-icon :icon="cartOutline" /> Sales </ion-item>
            <ion-item href="/cart"> <ion-icon :icon="cartOutline" /> Carts </ion-item>
            <ion-item href="history">  <ion-icon :icon="informationCircleOutline" /> History</ion-item>
          </ion-list>
      </ion-menu> -->

      <!-- <ion-router-outlet>
        <ion-content class="ion-padding">
          <ion-button expand="block" onclick="openMenu()">Open Menu</ion-button>
        </ion-content>
      </ion-router-outlet> -->
    
    </ion-page>

</template>

<script>
import {  IonPage, //IonButton,
          //IonIcon, 
          //IonHeader,  IonMenu, IonList,
          //IonToolbar,IonTitle,menuController
        } from '@ionic/vue';
 import { defineComponent } from 'vue';
 import { homeOutline , cartOutline, informationCircleOutline } from 'ionicons/icons';


export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    
    //IonHeader, IonMenu, IonList, 
    //IonToolbar,IonTitle,
    //IonIcon, IonButton
  
   
  },

  // setup(){
  //           return{
  //               informationCircleOutline, homeOutline , cartOutline
  //           }
  //       },

    // computed: {
    //   count(){
    //     return this.$store.state.cartItemCount;
    //   }
    // }
    // methods: {
    //   openMenu(){
    //     menuController.enable(true, 'first');
    //     menuController.open('first');
    //   }
    // }
  
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

.my-custom-menu {
  --width: 500px;
}




</style>
