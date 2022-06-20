<template>
   <ion-page>
       <ion-content>
                <div class="flex justify-center items-center h-screen bg-gradient-to-b from-white to-blue-100">
                    <div class=" w-4/6">
                          <ion-title class=" text-gray-700 font-bold text-2xl text-center mb-6"> Login Here </ion-title>
             
              
                        <form @submit.prevent="login">
                        <ion-item class="my-3">
                            <ion-label position="floating">Email</ion-label>
                            <ion-input type="email" v-model="userInfo.email" class=" bg-transparent"></ion-input>
                        </ion-item>
                        <ion-item class="my-3">
                            <ion-label position="floating">Password</ion-label>
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
         IonItem, IonLabel, IonInput,IonButton, IonSpinner} from '@ionic/vue';
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
        async login(){
            this.posting = true;
            const response = await axios.post('login' , {
                email: this.userInfo.email,
                password: this.userInfo.password
            });
            
            this.posting = false ;
            localStorage.setItem('token', response.data.access_token);
           
            this.$router.push('/select-sales');
           

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

</style>