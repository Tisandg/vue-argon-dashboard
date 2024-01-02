<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">

        <!-- Filters -->
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card">

              <div class="p-3 pb-3 card-header filter-card">
                <div class="d-flex justify-content-between align-center">
                  <div class="filter-container">
                    <!-- place -->
                    <label>Ubicación:</label>
                    <!-- :class="{'form-control': true}" -->
                    <!-- :multiple="true" -->
                    <VueMultiselect 
                      v-model="valueLocationSelect" 
                      :options="optionsLocationSelect"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Busca o selecciona una ubicación"
                      label="name"
                      track-by="id"
                      openDirection="bottom"/>
                      <!--  -->
                  </div>

                  <!-- entidad -->
                  <!-- <div class="filter-container">
                    <label>Topico:</label>
                    <VueMultiselect 
                      v-model="valueTopicSelect" 
                      :options="optionsTopicSelect"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Busca o selecciona un topico"
                      label="name"
                      track-by="id"
                      openDirection="bottom"/>
                  </div> -->

                  <div class="filter-container">
                    <!-- fechas -->
                    <label>Fechas Inicial:</label>
                    <input
                      class="form-control"
                      type="date"
                      :max="maxDate"
                      v-model="startDate"/>
                  </div>

                  <div class="filter-container">
                    <!-- fechas -->
                    <label>Fechas final:</label>
                    <input
                      class="form-control"
                      type="date"
                      :max="maxDate"
                      v-model="endDate"/>
                  </div>

                  <div class="filter-container">
                    <!-- Fuente -->
                    <label>Fuente de información:</label>
                    <VueMultiselect 
                      v-model="valueSourceSelect" 
                      :options="optionsSourceSelect"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Busca o selecciona una fuente"
                      label="name"
                      track-by="id"
                      openDirection="bottom"/>
                  </div>

                  <argon-button color="success" size="sm" class="" :action="filterData">Aplicar</argon-button>

                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Metrics -->
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="metrics.citizenParticipation.title"
              :value="metrics.citizenParticipation.value"
              :iconClass="metrics.citizenParticipation.iconClass"
              :iconBackground="metrics.citizenParticipation.iconBackground"
              :detail="metrics.citizenParticipation.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="metrics.reliableReports.title"
              :value="metrics.reliableReports.value"
              :iconClass="metrics.reliableReports.iconClass"
              :iconBackground="metrics.reliableReports.iconBackground"
              :detail="metrics.reliableReports.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="metrics.alertsGenerated.title"
              :value="metrics.alertsGenerated.value"
              :iconClass="metrics.alertsGenerated.iconClass"
              :iconBackground="metrics.alertsGenerated.iconBackground"
              :detail="metrics.alertsGenerated.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="metrics.coverage.title"
              :value="metrics.coverage.value"
              :iconClass="metrics.coverage.iconClass"
              :iconBackground="metrics.coverage.iconBackground"
              :detail="metrics.coverage.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">

          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
                ref="dataTotalChart"
                :title="chartDataTotal.title"
                :detail1="chartDataTotal.detail1"
                :detail2="chartDataTotal.detail2"
                :labelPoint="chartDataTotal.labelPoint"
                :inputData="chartDataTotal.values"
                :labels="chartDataTotal.labels"/>
            </div>
          </div>

          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <donut-chart
                ref="dataSourcesChart"
                :title="chartDataSources.title"
                :detail1="chartDataSources.detail1"
                :detail2="chartDataSources.detail2"
                :labelPoint="chartDataSources.labelPoint"
                :inputData="chartDataSources.values"
                :labels="chartDataSources.labels"/>
            </div>
          </div>

        </div>
        <!-- <div class="row">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Incidentes recientes</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(indicente, index) in incidentes" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="indicente.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Ciudad:</p>
                            <h6 class="mb-0 text-sm">{{ indicente.ciudad }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Reportero:</p>
                          <h6 class="mb-0 text-sm">{{ indicente.reportero.nombre }}</h6>
                        </div>
                      </td>
                      <td>

                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Confianza:</p>
                          <h6 class="mb-0 text-sm">{{ indicente.confianza }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Fuente:</p>
                          <h6 class="mb-0 text-sm">{{ indicente.fuente }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> -->

        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <data-table
                :title="reportTitle"
                :headers="reportHeaders"
                :items="reportItems"
                :searchFieldOptions="reportSearchFieldOptions"
              />
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <data-table
                :title="twitterTitle"
                :headers="twitterHeaders"
                :items="twitterItems"
                :searchFieldOptions="twitterSearchFieldOptions"
              />
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <data-table
                :title="newsTitle"
                :headers="newsHeaders"
                :items="newsItems"
                :searchFieldOptions="newsSearchFieldOptions"
              />
            </div>
          </div>
        </div>

        <!-- <div class="row mt-4"> -->
          <!-- <div class="col-lg-6">
            <categories-card
              cardTitle="Alertas recientes"/>
          </div> -->

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import DonutChart from "@/examples/Charts/DonutChart.vue";
import DataTable from "./components/DataTable.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Card from "@/examples/Cards/Card.vue";
import VueMultiselect from 'vue-multiselect'
// import CategoriesCard from "./components/CategoriesCard.vue";

// import Carousel from "./components/Carousel.vue";

// import US from "@/assets/img/icons/flags/US.png";
// import DE from "@/assets/img/icons/flags/DE.png";
// import GB from "@/assets/img/icons/flags/GB.png";
// import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard",
  props:['makeRequest'],
  components: {
    Card,
    DataTable,
    ArgonButton,
    VueMultiselect,
    GradientLineChart,
    DonutChart,
    // Carousel,
    // CategoriesCard,
  },
  data() {
    return {
      // about the icons -> https://demos.creative-tim.com/vue-argon-design-system/documentation/foundation/icons.html
      metrics: {
        citizenParticipation:{
          title: "Participación ciudadana",
          value: 0,
          detail: "reportes registrados en los ultimos 30 días",
          iconClass: "ni ni-active-40",
          iconBackground: "bg-gradient-primary"
        },
        reliableReports:{
          title: "Fiabilidad",
          value: 0,
          detail: "de fiabilidad en los reportes registrados",
          iconClass: "ni ni-check-bold",
          iconBackground: "bg-gradient-success",
        },
        alertsGenerated:{
          title: "Alertas",
          value: 0,
          detail: "en los ultimos 30 días a partir de hoy",
          iconClass: "ni ni-bell-55",
          iconBackground: "bg-gradient-danger",
        },
        coverage:{
          title: "Cobertura",
          value: 0,
          detail: "fuentes de información analizadas",
          iconClass: "ni ni-collection",
          iconBackground: "bg-gradient-warning",
        },
      },
      reportTitle: "Reportes recientes (30 días)",
      reportHeaders:[
        { text: "ID", value: "id", sortable: true},
        { text: "Usuario", value: "user_id", sortable: true},
        { text: "Descripción", value: "description"},
        { text: "Ubicación", value: "location", sortable: true },
        { text: "Karma", value: "karma", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true }
      ],
      reportItems:[],
      reportSearchFieldOptions:["description","location","karma"],
      twitterTitle: "Tweets recientes (30 días)",
      twitterHeaders:[
        { text: "ID", value: "id", sortable: true},
        { text: "Usuario", value: "user", sortable: true},
        { text: "Descripción", value: "tweet"},
        { text: "Ubicación", value: "location", sortable: true },
        { text: "Karma", value: "karma", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true }
      ],
      twitterItems:[],
      twitterSearchFieldOptions:["description","location","karma"],
      newsTitle: "Noticias recientes (30 días)",
      newsHeaders:[
        { text: "ID", value: "id", sortable: true},
        { text: "Sitio", value: "site_id", sortable: true},
        { text: "URL", value: "url"},
        { text: "Ubicación", value: "location", sortable: true },
        { text: "Karma", value: "karma", sortable: true },
        { text: "Fecha", value: "fecha", sortable: true }
      ],
      newsItems:[],
      newsSearchFieldOptions:["location","karma"],
      startDate:"",
      endDate:"",
      valueLocationSelect: "",
      optionsLocationSelect:[
        {name:"Madrid",id:0},
        {name:"Leganes",id:1},
        {name:"Getafe",id:2},
        {name:"Alcorcon",id:3},
        {name:"Torrejon",id:4},
        {name:"Rosas",id:5},
        {name:"Murcia",id:6},
      ],
      valueTopicSelect: [],
      optionsTopicSelect:[],
      valueSourceSelect: [],
      optionsSourceSelect:[
        {name:"Reportes",id:"Report"},
        {name:"Twitter",id:"Tweet"},
        {name:"Noticias",id:"News"}
      ],
      maxDate: "",
      chartDataTotal:{
        detail1: "",
        detail2: "Basado en los registros de todas las fuentes de información",
        title: "Total información reportada (30 días)",
        labels: ["Mes"],
        labelPoint: "Numero de reportes",
        values: [50],
      },
      chartDataSources:{
        detail1: "",
        detail2: "Comparación segun el origen de la información",
        title: "Reportes por fuente de información (30 días)",
        labels: ["Mes"],
        labelPoint: "Numero de reportes",
        values: [50],
      }
    };
  },
  mounted(){
    
    let url = process.env.VUE_APP_API_URL+"reports"
    //add params
    url += "?"
    url += "tables="+"Report"
    url += "&"
    url += "tables="+"Tweet"
    url += "&"
    url += "tables="+"News"
        
    var formattedAdjustedDateTime = this.getDateOf30DaysAgo()

    var temporalDate = new Date();
    let lastDay = this.getLastDayOfMonth(temporalDate.getFullYear(), temporalDate.getMonth() + 1);
    this.maxDate = `${temporalDate.getFullYear()}-${temporalDate.getMonth() + 1}-${lastDay}`;

    url += "&initial_date="+formattedAdjustedDateTime

    this.updateMetrics(url)
  },
  methods:{
    showEditionModal(){
      console.log("Edition modal");
    },
    showEliminationModal(){
      console.log("Elimination modal");
    },
    getDateOf30DaysAgo(){
      // Create a new Date object representing the current date and time
      var currentDate = new Date();

      // Subtract 30 days
      currentDate.setDate(currentDate.getDate() - 30);

      // Extract individual components of the adjusted date
      var adjustedYear = currentDate.getFullYear();
      var adjustedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      var adjustedDay = currentDate.getDate().toString().padStart(2, '0');
      var adjustedHours = currentDate.getHours().toString().padStart(2, '0');
      var adjustedMinutes = currentDate.getMinutes().toString().padStart(2, '0');

      // Format the adjusted date and time as a string
      var formattedAdjustedDateTime = `${adjustedYear}-${adjustedMonth}-${adjustedDay} ${adjustedHours}:${adjustedMinutes}`;
      return formattedAdjustedDateTime
    },
    updateMetrics(url){
      // console.log("URL Received:", url);
      let callback = (response) => {
        if(response != null){
          console.log(response)
          let totalCoverage = response.data.Report.coverage
          totalCoverage += response.data.Tweet.coverage
          totalCoverage += response.data.News.coverage
          let total_count_reports = response.data.Report.count_reports + response.data.Tweet.count_reports + response.data.News.count_reports
          let total_high_karma_reports = response.data.Report.count_high_karma + response.data.Tweet.count_high_karma + response.data.News.count_high_karma
          
          this.metrics.citizenParticipation.value = total_count_reports
          this.metrics.reliableReports.value = (total_high_karma_reports / total_count_reports) * 100
          this.metrics.reliableReports.value += "%"
          this.metrics.alertsGenerated.value = 0
          this.metrics.coverage.value = totalCoverage
          
          this.updateTables(response.data.Report, response.data.Tweet, response.data.News);
          if(this.startDate != "") this.updateTitles();
          this.updateCharts();
        }else{
          console.log("There were some problems with the request or response")
          //TODO: Show error message or notification
          this.setDefaultValues()
        }
      }
      this.makeRequest('get',url,null,callback)
    },
    setDefaultValues(){
      this.metrics.citizenParticipation.value = 0;
      this.metrics.reliableReports.value = 0;
      this.metrics.alertsGenerated.value = 0;
      this.metrics.coverage.value = 0;
      this.reportItems = [];
      this.twitterItems = [];
      this.newsItems = [];
    },
    updateTables(reports, tweets, news){

      this.reportItems = [];
      this.twitterItems = []
      this.newsItems = []

      if(reports.data.length > 0){
        for(let i in reports.data){
          this.reportItems.push({
            "id": reports.data[i].id,
            "user_id": reports.data[i].user_id,
            "description": reports.data[i].description,
            "location": reports.data[i].location,
            "karma": reports.data[i].karma,
            "fecha": reports.data[i].created_at.replace('T', ' ')
          })
        }
      }

      if(tweets.data.length > 0){
        for(let i in tweets.data){
          this.twitterItems.push({
            "id": tweets.data[i].id,
            "user": tweets.data[i].user,
            "tweet": tweets.data[i].tweet,
            "location": tweets.data[i].location,
            "karma": tweets.data[i].karma,
            "fecha": tweets.data[i].created_at.replace('T', ' ')
          })
        }
      }

      
      if(news.data.length > 0){
        for(let i in news.data){
          this.newsItems.push({
            "id": news.data[i].id,
            "site_id": news.data[i].site_id,
            "url": news.data[i].url,
            "location": news.data[i].location,
            "karma": news.data[i].karma,
            "fecha": news.data[i].created_at.replace('T', ' ')
          })
        }
      }
    },
    /**
     * Get the days difference between the start date and the current date
     */
    getDaysDifference(){
      var currentDate = new Date();
      var targetDate = new Date(this.startDate);
      let timeDiff = currentDate - targetDate;
      return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    },
    /**
     * Update the titles of the tables and the metrics with the days difference
     */
    updateTitles(){
      var daysDifference = this.getDaysDifference();

      //With the days difference we can update the titles
      this.reportTitle = "Reportes recientes ("+daysDifference+" días)";
      this.twitterTitle = "Tweets recientes ("+daysDifference+" días)";
      this.newsTitle = "Noticias recientes ("+daysDifference+" días)";

      //Also we can update the headers of the metrics
      this.metrics.citizenParticipation.detail = "reportes registrados en los ultimos "+daysDifference+" días";
      this.metrics.alertsGenerated.detail = "en los ultimos "+daysDifference+" días";
    },
    /**
     * Update the charts with the new data
     */
    updateCharts(){
      // console.log("Updating charts");
      //get the days difference
      let daysDifference = this.getDaysDifference();
      if(daysDifference > 30){
        console.log("The days difference is greater than 30");
      }else{
        var last30Dates = [];
        var currentDate = new Date();

        // Loop to generate the last 30 dates
        for (var i = 0; i < 30; i++) {
          var dateForIteration = new Date(currentDate);
          dateForIteration.setDate(currentDate.getDate() - i);

          // Format the date as YYYY-MM-DD
          var formattedDate = dateForIteration.toISOString().split('T')[0];

          // Add the formatted date to the array
          last30Dates.push(formattedDate);
        }

        //Reorder the array from the oldest to the newest date
        last30Dates.reverse();
        
        //Now, sum the values of each day
        let totalValues = [];
        for(let i = 0; i < last30Dates.length; i++){
          let totalValue = 0;
          for(let j = 0; j < this.reportItems.length; j++){
            if(this.reportItems[j].fecha.split(' ')[0] == last30Dates[i]){
              totalValue += 1;
            }
          }
          for(let j = 0; j < this.twitterItems.length; j++){
            if(this.twitterItems[j].fecha.split(' ')[0] == last30Dates[i]){
              totalValue += 1;
            }
          }
          for(let j = 0; j < this.newsItems.length; j++){
            if(this.newsItems[j].fecha.split(' ')[0] == last30Dates[i]){
              totalValue += 1;
            }
          }
          totalValues.push(totalValue);
        }

        this.chartDataTotal.values = totalValues;
        this.chartDataTotal.labels = last30Dates;
        this.$refs.dataTotalChart.updateChart(totalValues, last30Dates);

        //Update second chart
        let sourceSize = [this.reportItems.length, this.twitterItems.length, this.newsItems.length];
        let labels = ["Reportes", "Twitter", "Noticias"];
        this.chartDataSources.values = sourceSize;
        this.chartDataSources.labels= labels;
        this.$refs.dataSourcesChart.updateChart(sourceSize, labels);
      }

    },
    getLastDayOfMonth(year, month){
      // Note: Month is 0-indexed in JavaScript (January is 0, February is 1, etc.)
      const lastDay = new Date(year, month, 0).getDate();
      return lastDay;
    },
    filterData(){
      
      //check if the dates are correct
      if(this.startDate > this.endDate){
        console.log("The start date is greater than the end date")
        return
      }

      //Check the values of each filter
      let location = this.valueLocationSelect['name']
      let startDate = this.startDate
      let endDate = this.endDate
      let sources = []
      if(this.valueSourceSelect.length > 0){
        //Extract the id of each source
        
        for(let i = 0; i < this.valueSourceSelect.length; i++){
          sources.push(this.valueSourceSelect[i]['id'])
        }
      }

      //Make request with filters
      let url = process.env.VUE_APP_API_URL+"reports"
      //add params
      url += "?"
      if(sources.length > 0){
        for (let i = 0; i < sources.length; i++) {
          if(sources.length >= 1 && i != sources.length)  url += "&"
          url += "tables="+sources[i]
        }
      }
      if(location != ""){
        if(url.slice(-1) != "?") url += "&"
        url += "locations="+location
      }
      
      if(startDate != ""){
        if(url.slice(-1) != "?") url += "&"
        url += "initial_date="+encodeURIComponent(startDate);
      }else{
        var formattedAdjustedDateTime = this.getDateOf30DaysAgo()
        if(url.slice(-1) != "?") url += "&"
        url += "initial_date="+encodeURIComponent(formattedAdjustedDateTime);
      }
      if(endDate != ""){
        if(url.slice(-1) != "?") url += "&"
        url += "final_date="+encodeURIComponent(endDate);
      }

      this.updateMetrics(url)
    }
  },
  watch:{
    // chartDataTotal(newV, oldV){
    //   console.log("Changed"); 
    //   if(newV != oldV){
    //     this.$refs.dataTotalChart.updateChart();
    //     console.log("Chart data total values changed")
    //   }
    // }
    // metrics:{
    //   //If the user has changed the central, update the new values saved in the variable store.
    //   handler(val, oldVal){
    //     console.log("Data of metrics updated");
    //     console.log(val, oldVal);
    //     this.updateCharts();
    //     // console.log("Value changed:", val.values);
    //     // console.log("Chart data total values changed");
    //   },
    //   deep:true
    // },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
