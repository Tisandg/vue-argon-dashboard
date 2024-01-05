<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12 mb-4">
        <data-table
          :title="title"
          :headers="headers"
          :items="items"
          :searchFieldOptions="searchFieldOptions"
          @edit-item="editItem"
          @notify-item="notifyItem"
        />
      </div>
    </div>
  </div>
  <Modal v-if="showModal" @close="save" @cancel="cancelModal">
    <template #header>
      <h3 class="blue">Modificar alerta</h3>
    </template>

    <template #body>
      <div>
        <div class="form-group">
          <label for="inputTitle">Titulo</label>
          <input v-model="itemSelected.title" type="text" class="form-control" id="inputTitle" aria-describedby="titleHelp" placeholder="Titulo de la alerta" disabled>
        </div>
        <div class="form-group">
          <label for="inputDescription">Descripción:</label>
          <textarea v-model="itemSelected.description" type="text" class="form-control" id="inputDescription" aria-describedby="descriptionHelp" placeholder="Descripción de la alerta" disabled></textarea>
        </div>
        <div class="form-group">
          <label for="inputPriority">Prioridad:</label>
          <input v-model="itemSelected.priority" type="number" class="form-control" id="inputPriority" aria-describedby="priorityHelp" placeholder="Prioridad de la alerta" disabled>
        </div>
        <div class="form-group">
          <label for="inputKarmaData">Karma data:</label>
          <input v-model="itemSelected.karma_data" type="number" class="form-control" id="inputKarmaData" aria-describedby="karmaDataHelp" placeholder="Karma data de la alerta" disabled>
        </div>
        <div class="form-group">
          <label for="inputKarmaUser">Karma user:</label>
          <input v-model="itemSelected.karma_user" type="number" class="form-control" id="inputKarmaUser" aria-describedby="karmaUserHelp" placeholder="Karma user de la alerta" disabled>
        </div>
        <div class="form-group">
          <label for="inputReportType">Tipo de reporte:</label>
          <input v-model="itemSelected.report_type" type="text" class="form-control" id="inputReportType" aria-describedby="reportTypeHelp" placeholder="Fuente de información de la alerta" disabled>
        </div>
        
        <div class="form-group">
          <label for="inputCentral">¿Aprobar reporte?</label>
          <!-- @change="onChangeCentral($event)" -->
          <select v-model="itemSelected.approved" class="form-control" id="inputCentral">
            <option selected :value="null">Seleccione una opción</option>
            <option selected :value="true">Si</option>
            <option selected :value="false">No</option>
          </select>
        </div>
      </div>
    </template>

    <template #footer>
      <button class="btn-primary" data-dismiss="modal" @click="hideModal">
        Cancelar
      </button>
      <button class="btn-secondary ml-2" @click="save">
        Guardar
      </button>
    </template>
    </Modal>
</template>

<script>
import DataTable from "@/views/components/DataTable.vue";
import Modal from "@/views/components/Modal.vue";

export default {
  name: "tables",
  components: { DataTable, Modal },
  props: ['makeRequest'],
  data() {
    return {
      showModal: false,
      title: "Notificaciones",
      headers: [
        { text: "Id", value: "id", sortable: true},
        { text: "Titulo", value: "title", sortable: true},
        { text: "Descripcion", value: "description", sortable: true},
        { text: "Prioridad", value: "priority", sortable: true},
        { text: "Aprobado", value: "approved", sortable: true},
        { text: "Acciones", value: "acciones", width: 150, params: [
          { text: "Editar", icon: "fa fa-pencil", backgroundClass: "bg-gradient-primary", action: "edit-item" },
          { text: "Notificar", icon: "fa fa-bullhorn", backgroundClass: "bg-gradient-primary", action: "notify-item" },
        ]},
      ],
      items: [],
      searchFieldOptions: ["title", "description", "priority", "approved"],
      itemSelected: {},
    };
  },
  mounted(){
    this.getAlerts()
  },
  methods:{
    hideModal(){
      this.showModal = false
      //Clean variable
      this.itemSelected = {}
    },
    editItem(item){
      this.showModal = true
      this.itemSelected = item
      console.log("Editing item:", item)
    },
    notifyItem(item){
      console.log("Notifying item:", item)
    },
    validateForm(){
      if(this.itemSelected.approved == null){
        console.log("You must to select an option")
      }
    },
    getAlerts(){
      let url = process.env.VUE_APP_NOTIFICATIONS_API_URL+"alerts"
      const callback = (res) => {
        if(res!=null){
          console.log("res obtained:", res.data)
          this.items = res.data.data
        }else{
          console.log("Problemas al obtener alertas")
          this.items = []
        }
      }
      this.makeRequest('get',url,null,callback)
    },
    save(){
      console.log("updating alert", this.itemSelected)
      let url = "http://localhost:8000/api/v1/alerts"
      this.validateForm()
      let dataUpdates = {
        approved: this.itemSelected.approved
      }
      const callback = (res) => {
        if(res!=null){
          console.log("res obtained:", res.data)
          this.items = res.data
        }else{
          console.log("Problemas al obtener alertas")
          this.items = []
        }
      }
      this.makeRequest('put',url,dataUpdates,callback)
      return true
    },
    cancelModal(){
      return true
    },
  }
};
</script>
