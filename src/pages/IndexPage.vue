<template>
    <ion-page>
       

        <ion-content>
            <ion-title> Noop </ion-title>
            <!-- <chart></chart> -->
            <piechart :data="point2"></piechart>
            <!-- <BarChart chart-data="" options=""/> -->
        </ion-content>
    </ion-page>
</template>

<script>
    import { IonPage, IonContent , IonTitle} from '@ionic/vue'
    //import Chart from "../component/Chart/chartData.vue"
    import pieChart from "../component/Chart/pieChat.vue"
    //import { BarChart } from 'vue-chart-3'
    //import VueHighcharts from 'vue3-highcharts';
   

    export default {
        components: {
            IonPage,
            IonContent,
            IonTitle,
            //Chart,
            piechart:pieChart,
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
                ],
            };
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
    .body{
        background: red;
    }
</style>