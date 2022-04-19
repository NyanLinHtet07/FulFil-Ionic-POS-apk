<template>
  
       <ion-content class="chart">
            <highcharts :constructorType="'stockChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
       </ion-content>
 
</template>
<script>
import { IonContent} from '@ionic/vue'
export default {
    components:{
        IonContent
    },

    data() {
        return {
            chartOptions: {
                series : [
                    {
                        data: [1,2,3,4]
                    }
                ]
            }
        };
    },
}
</script>
<style>
    .chart{
        margin: auto;
        padding: auto;
    }
    
</style>