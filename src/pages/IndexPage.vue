<template>
    <ion-page>
       

        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-label> Total Sale Amount</ion-label>
                    <ion-text> {{TotalSale}} </ion-text>
                </ion-card-content>
            </ion-card>
            <!-- <ion-title> Noop </ion-title> -->
            <!-- <chart></chart> -->
            <piechart :data="point2"></piechart>
            <barchart></barchart>
            <!-- <BarChart chart-data="" options=""/> -->
        </ion-content>
    </ion-page>
</template>

<script>
    import { IonPage, IonContent, IonCard, IonCardContent, IonLabel, IonText } from '@ionic/vue'
    //import Chart from "../component/Chart/chartData.vue"
    import pieChart from "../component/Chart/pieChat.vue"
    import BarChat from "../component/Chart/barChart.vue"
    //import VueHighcharts from 'vue3-highcharts';

    import { mapGetters } from "vuex";
   

    export default {
        components: {
            IonPage,
            IonContent,
            IonCard,IonCardContent,IonLabel,IonText,
            piechart:pieChart,
            barchart: BarChat,
           // VueHighcharts,
        },

        data() {
            return {
                point2: [
                    {
                        name: "test1",
                        y: 20.0,
                    },
                    {
                        name: "test2",
                        y: 60.0,
                    },
                    {
                        name: "test3",
                        y:20.0,
                    },
                    {
                        name:"test4",
                        y:50.0,
                    }
                ],
            };
        },

        computed:{
            // records(){
            //     return this.$store.getters.totalSale;
            // },
            ...mapGetters(["TotalSale"]),
            // totalAmt(){
            //     return this.$store.state.saleDatas.reduce((sum , amt) => {
            //         return sum + amt.grandTotal;
            //     });
            // }

        },


        methods: {
            handler() {
            var args = arguments;
            for (var arg of args) {
                if (arg instanceof Function) {
                arg();
                }
            }
            }
        }

        

    }
</script>

<style scope>
   
</style>