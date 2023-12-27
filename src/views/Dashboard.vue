<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.participacion.title"
              :value="stats.participacion.value"
              :percentage="stats.participacion.percentage"
              :iconClass="stats.participacion.iconClass"
              :iconBackground="stats.participacion.iconBackground"
              :detail="stats.participacion.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.confianza.title"
              :value="stats.confianza.value"
              :percentage="stats.confianza.percentage"
              :iconClass="stats.confianza.iconClass"
              :iconBackground="stats.confianza.iconBackground"
              :detail="stats.confianza.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.alertas.title"
              :value="stats.alertas.value"
              :percentage="stats.alertas.percentage"
              :iconClass="stats.alertas.iconClass"
              :iconBackground="stats.alertas.iconBackground"
              :percentageColor="stats.alertas.percentageColor"
              :detail="stats.alertas.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.cobertura.title"
              :value="stats.cobertura.value"
              :percentage="stats.cobertura.percentage"
              :iconClass="stats.cobertura.iconClass"
              :iconBackground="stats.cobertura.iconBackground"
              :detail="stats.cobertura.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <!-- <div class="row">

          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2">
              <gradient-line-chart
                title="Información reportada"
                detail1=""
                detail2=""/>
            </div>
          </div>

          <div class="col-lg-5">
            <carousel />
          </div>

        </div> -->
        <div class="row">
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
                          <!-- <div>
                            <img :src="indicente.flag" alt="Country flag" />
                          </div> -->
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
        </div>

        <div class="row mt-4">
          <div class="col-12 mb-lg-0 mb-4">
            <div class="col-12">
              <alerts-table title="Alertas recientes"/>
            </div>
          </div>
        </div>
        <div class="row mt-4">

          

          

          <!-- <div class="col-lg-6">
            <categories-card
              cardTitle="Alertas recientes"/>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import AlertsTable from "./components/AlertsTable.vue";
// import CategoriesCard from "./components/CategoriesCard.vue";
// import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
// import Carousel from "./components/Carousel.vue";

// import US from "@/assets/img/icons/flags/US.png";
// import DE from "@/assets/img/icons/flags/DE.png";
// import GB from "@/assets/img/icons/flags/GB.png";
// import BR from "@/assets/img/icons/flags/BR.png";

export default {
  name: "dashboard-default",
  components: {
    Card,
    AlertsTable
    // GradientLineChart,
    // Carousel,
    // CategoriesCard,
  },
  data() {
    return {
      stats: {
        // about the icons -> https://demos.creative-tim.com/vue-argon-design-system/documentation/foundation/icons.html
        participacion: {
          title: "Participación ciudadana",
          value: "1,000",
          // percentage: "+3%",
          iconClass: "ni ni-active-40",
          detail: "reportes en los ultimos 30 dias",
          iconBackground: "bg-gradient-primary",
        },
        confianza: {
          title: "Confianza sobre la información",
          value: "89%",
          // percentage: "+3%",
          iconClass: "ni ni-check-bold",
          iconBackground: "bg-gradient-success",
          detail: "información reportada confiable",
        },
        alertas: {
          title: "Alertas generadas",
          value: "100",
          // percentage: "-2%",
          iconClass: "ni ni-bell-55",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-danger",
          detail: "en los ultimos 30 dias",
        },
        cobertura: {
          title: "Cobertura",
          value: "3",
          // percentage: "+5%",
          iconClass: "ni ni-collection",
          iconBackground: "bg-gradient-warning",
          detail: "fuentes de información analizada",
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
    };
  },
};
</script>
