<template>
   
        <div class="chart">
            <highcharts :options="chartOptions"></highcharts>
            <!-- <ion-card-subtitle v-for="d in data" :key="d.id">
                {{d.name}} {{d.y}}
            </ion-card-subtitle> -->

        </div>
  
</template>

<script>
//import { IonContent } from '@ionic/vue'
export default {
    props: ["data", "title"],
  data() {
    return {
      chartOptions: {
        chart: {
          plotBackgroundColor:  'rgb(228 228 228 / 15%)',
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
         plotOptions: {
                        column: {
                          pointPadding: 0.2,
                          borderWidth: 0
                                }
                      },
        // exporting: {
        //   enabled: false,
        // },
        title: {
          text: "",
        },
        series: [
          {
            data: this.data,
          },
        ],
      },
      //updateArgs: [true, true, { duration: 1000 }]
    };
  },
//   watch: {
//     title(newValue) {
//       this.chartOptions.title.text = newValue;
//     },
//     data(newValue) {
//       console.log("pie watch fired", newValue);
//       for (let obj of newValue) {
//         let x = this.$children[0].chart.series[0].data.findIndex(
//           (s) => s.name == obj.name
//         );
//         if (x != -1) {
//           console.log("pair found", obj, obj.y);
//           this.$children[0].chart.series[0].data[x].update(obj.y);
//         } else {
//           //New key value pair
//         }
//       }
//     },
//   },
//   mounted() {
//     if (typeof this.title !== "undefined") {
//       this.chartOptions.title.text = this.title;
//     }
//   },
    
    components :{
        //IonContent,
     
    }
}
</script>
<style>
    .chart{
      max-width: 900px;
      min-width: auto;
      margin: auto;
      padding: auto;
    }
</style>