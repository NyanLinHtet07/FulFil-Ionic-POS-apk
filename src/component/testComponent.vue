<template>
    <div class=" bg-red-600">
        <input type="text"  v-model="loream" ref="data" id="data" name="data">
        {{text}}
    </div>
</template>
<script>
export default {
    data(){
        // let loream = 'noob';
        return{
            text:'',
            loream:'noo',
        }
    },

    computed:{
        // result(){
        //      return { this.text : };
        // }
       
    },

    mounted(){
        this.text = this.$refs.data.value
    }

  
}
</script>