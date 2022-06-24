<template>
   <ion-page>
       <ion-content>
                <div class="flex justify-center items-center h-screen bg-gradient-to-b from-white to-slate-50">
                    <div class=" w-5/6">
                          <!-- <ion-title class=" text-gray-700 font-bold text-2xl text-center mb-6"> Login Here </ion-title> -->
                          
                          <img src="/assets/fulfil.png" alt="" class="mx-auto block top-5" />
              
                        <form @submit.prevent="login">
                        <ion-item class="my-3">
                            <ion-label position="floating" class=" font-semibold">Email</ion-label>
                            <ion-input type="email" v-model="userInfo.email"></ion-input>
                        </ion-item>
                        <ion-item class="my-3">
                            <ion-label position="floating" class=" font-semibold">Password</ion-label>
                            <ion-input type="password" v-model="userInfo.password"></ion-input>
                        </ion-item>
                        <div class="text-center">
                           
                            <ion-button :disabled="posting" color="secondary" shape="round" type="submit" class="my-10"> 
                                    Login
                            </ion-button>
                             <ion-spinner  name="circles" v-if='posting' class="mx-3"></ion-spinner>
                        </div>
                        
                        </form>

                    </div>  
                   
                </div>
                
       </ion-content>
              
      
   </ion-page>
</template>

<script>

import { IonPage, IonContent,  
         IonItem, IonLabel, IonInput,IonButton, IonSpinner, alertController} from '@ionic/vue';
//import { mapGetters,mapActions} from "vuex";
import axios from "axios";
export default {
    components:{
        IonPage, IonContent , 
        IonItem, IonLabel, IonInput, IonButton, IonSpinner
    },

    data() {
        return {
            posting: false,
            userInfo:{
                email:"",
                password:"",
            },
        }
    },

    methods: {

         async presentAlert() {
            const alert = await alertController
                .create({
                cssClass: 'my-custom-class',
                //header: 'Alert',
                subHeader: 'Somethimd Wrong',
                message: 'Please check email and password or network',
                buttons: ['OK'],
                });
            await alert.present();

            const { role } = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
            },

        async login(){
            this.posting = true;
                 await axios.post('login' , {
                email: this.userInfo.email,
                password: this.userInfo.password
            }).then(
                response => {
                     this.posting = false ;
                    localStorage.setItem('token', response.data.access_token);
                
                    this.$router.push('/select-sales');
                }
            ) .catch(
                error => {
                    this.presentAlert();
                    console.log(error);
                }
            );
            
           
           

            //console.log(response)
        }

        // ...mapActions("auth", {
        //     loginUser : "loginUser",
        // }),

        // async login(){
        //     if(this.userInfo.email && this.userInfo.password){
        //         await this.loginUser(this.userInfo);
        //         if(this.loginStatus === "success"){
        //             alert('login success');
        //         }
        //         else{
        //             alert('failed to login')
        //         }
        //     }
        // },
    },

    computed:{
        // ...mapGetters("auth", {
        //     loginStatus: "getLoginStatus",
        // })
    }

}
</script>

<style scoped>
    .center {
        width: 50%; 
        margin: auto;
        padding: auto;
        margin-top: 100px;
    }

    ion-item, ion-input{
       background: transparent !important;
    }

</style>