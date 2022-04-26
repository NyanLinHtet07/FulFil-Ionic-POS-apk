import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
//import exported from 'highcharts/modules/export';

import Stock from 'highcharts/modules/stock';
import exportingInit from "highcharts/modules/exporting";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";

Stock(Highcharts);
exportingInit(Highcharts);
highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);
exporting(Highcharts);
//exported(Highcharts);

import HighchartsVue from 'highcharts-vue';

export default HighchartsVue;