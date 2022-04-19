<template>
    <ion-card class="pieChart">
        <ion-card-content>
            <highcharts :options="chartOptions"></highcharts>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardContent } from '@ionic/vue'
export default {
    props: ["data", "title"],
  data() {
    return {
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        exporting: {
          enabled: false,
        },
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
        IonCard,
        IonCardContent,
    }
}
</script>
<style>
    .pieChart{
       -webkit-backdrop-filter: blur(8px);  /* Safari 9+ */
        backdrop-filter: blur(10px); /* Chrome and Opera */
        box-shadow: 0px 5px 5px 5px rgb(0 0 0 / 15%);
        background-color: rgb(228 228 228 / 15%); 
    }
</style>