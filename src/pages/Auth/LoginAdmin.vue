<template>
   <ion-page class=" mt-5">
       <ion-content class=" bg-red-600">
         
                    
                 <ion-title class=" text-gray-700 font-bold text-2xl"> Login Here </ion-title>
             
              
                <form @submit.prevent="login">
                 <ion-item class="my-5 px-2">
                    <ion-label position="floating">Email</ion-label>
                    <ion-input type="email" v-model="userInfo.email"></ion-input>
                </ion-item>
                 <ion-item class="my-5 px-2">
                    <ion-label position="floating">Password</ion-label>
                    <ion-input type="password" v-model="userInfo.password"></ion-input>
                </ion-item>
                  <ion-button expand="block" color="secondary" shape="round" type="submit" class="my-10"> 
                               Login
                </ion-button>
                </form>

       </ion-content>
              
      
   </ion-page>
</template>

<script>

import { IonPage, IonContent,  
         IonItem, IonLabel, IonInput,IonButton} from '@ionic/vue';
//import { mapGetters,mapActions} from "vuex";
import axios from "axios";
export default {
    components:{
        IonPage, IonContent , 
        IonItem, IonLabel, IonInput, IonButton 
    },

    data() {
        return {
            userInfo:{
                email:"",
                password:"",
            },
        }
    },

    methods: {
        async login(){
            const response = await axios.post('http://54.169.124.45/api/auth/login' , {
                email: this.userInfo.email,
                password: this.userInfo.password
            });

            localStorage.setItem('token', response.data.access_token);
            //this.$router.go();
            this.$router.push('/select-sales');
           

            console.log(response)
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
</style>