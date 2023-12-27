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
                  
                  <div class="filter-container">
                    <!-- entidad -->
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
                  </div>

                  <div class="filter-container">
                    <!-- fechas -->
                    <label>Fechas Inicial:</label>
                    <input
                      class="form-control"
                      type="date"
                      :max="currentDate"
                      v-model="startDate"/>
                  </div>

                  <div class="filter-container">
                    <!-- fechas -->
                    <label>Fechas final:</label>
                    <input
                      class="form-control"
                      type="date"
                      :max="currentDate"
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

                  <argon-button color="success" size="sm" class="">Aplicar</argon-button>

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
                title="Información reportada"
                detail1=""
                detail2=""/>
            </div>
          </div>

          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
                title="Información reportada"
                id="chart-line2"
                detail1=""
                detail2=""/>
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
              <alerts-table title="Reportes recientes"/>
            </div>
          </div>
        </div>
        
        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <alerts-table title="Tweets recientes"/>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <alerts-table title="Noticias recientes"/>
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
import Card from "@/examples/Cards/Card.vue";
import AlertsTable from "./components/AlertsTable.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import VueMultiselect from 'vue-multiselect'
// import CategoriesCard from "./components/CategoriesCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
// import Carousel from "./components/Carousel.vue";

// import US from "@/assets/img/icons/flags/US.png";
// import DE from "@/assets/img/icons/flags/DE.png";
// import GB from "@/assets/img/icons/flags/GB.png";
// import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-default",
  props:['makeRequest'],
  components: {
    Card,
    AlertsTable,
    ArgonButton,
    VueMultiselect,
    GradientLineChart,
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
          detail: "Reportes en los ultimos 30 días",
          iconClass: "ni ni-active-40",
          iconBackground: "bg-gradient-primary"
        },
        reliableReports:{
          title: "Fiabilidad de la información",
          value: 0,
          detail: "de fiabilidad en los reportes registrados",
          iconClass: "ni ni-check-bold",
          iconBackground: "bg-gradient-success",
        },
        alertsGenerated:{
          title: "Alertas de seguridad creadas",
          value: 0,
          detail: "en los ultimos 30 días a partir de hoy",
          iconClass: "ni ni-bell-55",
          iconBackground: "bg-gradient-danger",
        },
        coverage:{
          title: "Cobertura de la información",
          value: 0,
          detail: "fuentes distintas analizadas",
          iconClass: "ni ni-collection",
          iconBackground: "bg-gradient-warning",
        },
      },
      incidentes: {
        accidente_coche: {
          ciudad: "Leganes",
          reportero: {
            id:1,
            nombre:"Juan Perez",
          },
          fuente: "Reporte ciudadano",
          confianza: "80",
          // flag: SP,
        },
        terremoto: {
          ciudad: "Madrid",
          reportero: {
            id:1,
            nombre:"David Genoy",
          },
          fuente: "Twitter",
          confianza: "75",
          // flag: SP,
        },
        tiroteo: {
          ciudad: "Murcia",
          reportero: {
            id:1,
            nombre:"Murcia Noticias",
          },
          fuente: "Noticias",
          confianza: "100%",
          // flag: SP,
        },
        emergencia_sanitaria: {
          ciudad: "Segovia",
          reportero: {
            id:1,
            nombre:"Julian Besteiros",
          },
          fuente: "Reporte ciudadano",
          confianza: "70%",
          // flag: SP,
        },
      },
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
      currentDate: "",
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

    
    var temporalDate = new Date();
    let lastDay = this.getLastDayOfMonth(temporalDate.getFullYear(), temporalDate.getMonth() + 1);
    this.currentDate = `${temporalDate.getFullYear()}-${temporalDate.getMonth() + 1}-${lastDay}`;
    
    // Format the adjusted date and time as a string
    var formattedAdjustedDateTime = `${adjustedYear}-${adjustedMonth}-${adjustedDay} ${adjustedHours}:${adjustedMinutes}`;

    url += "&"
    url += "initial_date="+formattedAdjustedDateTime

    let callback = (response) => {
      if(response != null){
        console.log(response)
        let totalCoverage = response.data.Report.coverage
        totalCoverage += response.data.Tweet.coverage
        totalCoverage += response.data.News.coverage
        let total_count_reports = response.data.Report.count_reports + response.data.Tweet.count_reports + response.data.News.count_reports
        let total_high_karma_reports = response.data.Report.count_high_karma + response.data.Tweet.count_high_karma + response.data.News.count_high_karma
        
        this.metrics.citizenParticipation.value = total_count_reports
        //this.citizenParticipation = total_count_reports
        this.metrics.reliableReports.value = (total_high_karma_reports / total_count_reports) * 100
        this.metrics.reliableReports.value += "%"
        //this.reliableReports = (total_high_karma_reports / total_count_reports) * 100
        this.metrics.alertsGenerated.value = 0
        // this.alertsGenerated = 0
        this.metrics.coverage.value = totalCoverage
        // this.coverage = totalCoverage
      }else{
        console.log("There were some problems with the request or response")
      }
    }
    this.makeRequest('get',url,null,callback)
  },
  methods:{
    getLastDayOfMonth(year, month){
      // Note: Month is 0-indexed in JavaScript (January is 0, February is 1, etc.)
      const lastDay = new Date(year, month, 0).getDate();
      return lastDay;
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
