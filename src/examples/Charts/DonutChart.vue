<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <!-- <i class="fa fa-arrow-up text-success"></i> -->
        <span class="font-weight-bold">{{detail1}}</span>
        {{detail2}}
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas :id="id" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "donut-chart",

  props: {
    title: {
      type: String,
      default: "Title of the chart",
    },
    detail1: {
      type: String,
      default: "Detail with a strong font",
    },
    detail2: {
      type: String,
      default: "detail with a normal font",
    },
    id:{
      type: String,
      default: "donut-chart"
    },
    labelPoint:{
      type: String,
      default: "Value point"
    },
  },
  data(){
    this.myChart=null;
    return{
      inputData: [1,2,3],
      labels: ["A","B","C"],
    }
  },
  mounted() {
    this.initChart();
  },
  methods:{
    initChart(){
      console.log("init chart:", this.inputData);
      var ctx1 = document.getElementById(this.id).getContext("2d");

      // var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);
      // gradientStroke1.addColorStop(1, "rgba(94, 114, 228, 0.2)");
      // gradientStroke1.addColorStop(0.2, "rgba(94, 114, 228, 0.0)");
      // gradientStroke1.addColorStop(0, "rgba(94, 114, 228, 0)");

      this.myChart = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.labelPoint,
              data: this.inputData,
              backgroundColor: ["#f5365c", "#2dce89", "#825ee4"],
              // // eslint-disable-next-line no-dupe-keys
              // borderWidth: 3,
              // fill: true,
              // data: this.inputData[0], //[50, 40, 300, 220, 500, 250, 400, 230, 500],
              // maxBarThickness: 6,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right"
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      });
      console.log("chart set up");
    },
    updateChart(inputData, labels){
      if (this.myChart) {
        console.log("Received:", inputData, labels)
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = inputData;
        this.myChart.update();
        console.log("Chart updated.")
      } else {
        console.warn("Chart not initialized yet.");
      }
    }
  }
};
</script>
