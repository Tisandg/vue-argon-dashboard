<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
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
              <!-- <th class="text-secondary opacity-7"></th> -->
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
                <!-- <p class="text-xs font-weight-bold mb-0">23/04/18 5:12pm</p> -->
                <p class="text-xs text-secondary mb-0">23/04/18 5:12pm</p>
              </td>
              <td class="align-middle text-center text-sm w-10">
                <!-- <p class="text-xs text-secondary mb-0">23/04/18 5:12pm</p> -->
                <span class="badge badge-sm bg-gradient-success">Leganes, Madrid</span>
              </td>
              <td class="align-middle text-center w-10">
                <span class="text-secondary text-xs font-weight-bold">98 pts</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Titulo tabla",
    },
  },
  name: "alerts-table",
};
</script>
