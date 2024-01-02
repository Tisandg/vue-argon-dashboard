<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <!-- <div class="table align-items-center mb-0"> -->
          <EasyDataTable
            ref="dataTable"
            :headers="headers"
            :items="items"
            :search-field="searchField"
            :search-value="searchValue"
            :filter-options="filterOptions"
            :loading="loading"
            rowsPerPageMessage="Filas por página"
            rowsOfPageSeparatorMessage="de"
            emptyMessage="No hay datos disponibles"
            table-class-name="table align-items-center mb-0 custom-datatable"
            buttons-pagination
            :rows-items="rowItemsOptions"
            :rows-per-page="rowsT"
          >
          </EasyDataTable>

        <!-- </div> -->
       

          <!-- <template #item-prioridad="item">
            <div style="text-align: center;">
              <span>{{ item.prioridad }}</span>
            </div>
          </template>

          <template #item-acciones="item">
            <button class="btn-primary" @click="editElement(item)"><i class="bi bi-pencil-square"></i></button>
            <button class="btn-secondary" @click="removeElement(item)"><i class="bi bi-trash"></i></button>
          </template>

          <template #loading>
            <img
              src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
              style="width: 100px; height: 80px;"
            />
          </template> -->

        
        <!-- <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Titulo</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Descripción</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >Fecha y hora</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center"
              >Ubicación</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center"
              >Confianza</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-20">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Incendio en calle de La Alcarria</h6>
                  </div>
                </div>
              </td>
              <td class="w-30">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <p class="text-xs text-secondary mb-0">El incendio se ha originado en el edificio 4, parece haber personas en el ultimo piso pidiendo ayuda</p>
                  </div>
                </div>
              </td>
              <td class="w-10">
                <p class="text-xs font-weight-bold mb-0">23/04/18 5:12pm</p>
                <p class="text-xs text-secondary mb-0">23/04/18 5:12pm</p>
              </td>
              <td class="align-middle text-center text-sm w-10">
                <p class="text-xs text-secondary mb-0">23/04/18 5:12pm</p>
                <span class="badge badge-sm bg-gradient-success">Leganes, Madrid</span>
              </td>
              <td class="align-middle text-center w-10">
                <span class="text-secondary text-xs font-weight-bold">98 pts</span>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
import EasyDataTable from 'vue3-easy-data-table'
import { ref } from "vue";

export default {
  data(){
    return{
      searchField: ref(""),
      searchValue: ref(""),
      // showGroupFilter: ref(false),
      rowsT:10,
      rowItemsOptions: [10,20,50],
      headersDump:[
        { text: "Name", value: "name" },
        { text: "Height (cm)", value: "height", sortable: true },
        { text: "Weight (kg)", value: "weight", sortable: true },
        { text: "Age", value: "age", sortable: true }
      ],
      itemsDump:[
        { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
        { "name": "James", "height": 180, "weight": 75, "age": 21 },
        { "name": "Jordan", "height": 181, "weight": 73, "age": 22 }
      ],
    }
  },
  components:{ EasyDataTable },
  props: {
    headers: Array,
    items: Array,
    searchFieldOptions: Array,
    // editElement: {type: Function},
    // removeElement: {type: Function},
    // decimales: Number,
    filterOptions: Array,
    // gruposFilterOptions: Array,
    loading: Boolean,
    title: {
      type: String,
      default: "Titulo tabla",
    },
  },
  name: "data-table",
};
</script>

<style scoped>
  .search-input{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .search-input > * {
    color: var(--main-color);
  }
  .search-input > span{
    align-self: center;
    width: 7rem;
    text-align: start;
    margin-right: 0.25rem;
  }
  
  .search-input > select,
  .search-input > input{
    padding: 0.2rem;
    height: fit-content;
  }

  .col-7.search-input > span {
    width: 4rem;
  }

  .customize-table > div > table {
    border-collapse: collapse;
  }

  .vue3-easy-data-table__message{
    color: var(--main-color) !important;
    font-size: 16px !important;
  }

  .custom-datatable{
    border: none !important;
  }

  .customize-table {
    
    --easy-table-header-border: 2px solid var(--main-color);
    /* --easy-table-row-border: 2px solid rgba(191,184,175, .75); */

    --easy-table-header-font-size: 16px;
    /* --easy-table-header-height: 50px; */
    --easy-table-header-font-color: var(--main-color);
    /* --easy-table-header-background-color: #2d3a4f; */

    --easy-table-header-item-padding: 1rem 1rem;

    --easy-table-body-even-row-font-color: #fff;
    /* --easy-table-body-even-row-background-color: #4c5d7a; */

    --easy-table-body-row-font-color: var(--main-color);
    /* --easy-table-body-row-background-color: #2d3a4f; */
    /* --easy-table-body-row-height: 50px; */
    --easy-table-body-row-font-size: 16px;

    --easy-table-body-row-hover-font-color: var(--main-color);
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 0.5rem;

    /* --easy-table-footer-background-color: #2d3a4f; */
    --easy-table-footer-font-color: var(--main-color);
    --easy-table-footer-font-size: 16px;
    --easy-table-footer-padding: .5rem;
    /* --easy-table-footer-height: 50px; */

    --easy-table-scrollbar-track-color: var(--secondary-color);
    /* --easy-table-scrollbar-color: #bfb8ae; */
    /* --easy-table-scrollbar-thumb-color: #bfb8ae; */
    /* --easy-table-scrollbar-corner-color: #bfb8ae; */

    --easy-table-loading-mask-background-color: var(--main-color);
  }
</style>