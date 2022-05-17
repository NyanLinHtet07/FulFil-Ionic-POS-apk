<template>
    <in-content>
        <ul>
            <li v-for="a in posts" :key="a.id">{{a}}</li>
        </ul>
    </in-content>
</template>
<script>

//import axios from "axios";

import { IonContent } from "@ionic/vue";
import {mapGetters } from "vuex";

export default {
    compontent:{
        IonContent
    },
    data(){
        return {
          
        }
    },

    methods:{
    //    async post(){
    //        await axios.get('https://jsonplaceholder.typicode.com/posts')
    //                     .then( res => {
    //                         this.posts = res.data
    //                     })
    //     }
    // ...mapActions( 'post', {
    //     fetchPosts: 'fetchPosts'
    // }),

    // showPosts(){
    //     this.fetchPosts()
    // }
    },
    computed:{
         ...mapGetters(["posts"]),

    }

    // created(){
    //     this.post();
    // }
    
}
</script>