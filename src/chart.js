import Highcharts from 'highcharts';
import Stock from 'highcharts/modules/stock';
import exportingInit from "highcharts/modules/exporting";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";

Stock(Highcharts);
exportingInit(Highcharts);
highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);

import HighchartsVue from 'highcharts-vue';

export default HighchartsVue;