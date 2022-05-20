<template>
    <form @submit.prevent="submit">
        <input type="text" v-model="form.name" placeholder="name" class=" bg-slate-400"/> <br>
        <input type="text" v-model="form.email" placeholder="email" class=" bg-slate-400" /> <br>
       <select v-model="form.company_id">
           <option v-for="c in company" :key="c.id" :value=c.id> {{c.name}}</option>
       </select> <br>
       <input type="text" v-model="form.phone" placeholder="phone" class=" bg-slate-400" /> <br>
       <select v-model="form.customer_type">
           <option value="customer"> Customer </option>
       </select>
       <input type="text" v-model="form.gender" placeholder="gender" class=" bg-slate-400"/> <br>
        <select v-model="form.zone_id">
           <option v-for="z in zone" :key="z.id" :value=z.id> {{z.name}}</option>
       </select> <br>
        <select v-model="form.region_id">
           <option v-for="r in region" :key="r.id" :value="r.id"> {{r.name}}</option>
       </select> <br>

       <button type="submit"> Submit </button>

    </form>
</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            form:{
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                region_id:'',
            },

            company:[],
            zone:[],
            region:[],
        }
    },
 
    methods:{
        async getData(){
            await axios.get(`http://54.169.124.45/api/auth/mobile_invoice/create`)
                        .then( res => {
                                this.company = res.data.companies;
                                this.zone = res.data.zone;
                                this.region = res.data.region;
                        })
        },

       async submit(){
            const response = await axios.post(`http://54.169.124.45/api/auth/api_customers`, {
                name: this.form.name,
                email: this.form.email,
                company_id: this.form.company_id,
                phone: this.form.phone,
                customer_type: this.form.customer_type,
                gender: this.form.gender,
                zone_id: this.form.zone_id,
                region_id: this.form.region_id
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            });

            console.log(response)
        } 
    },

    created(){
        this.getData();
    }
}
</script>