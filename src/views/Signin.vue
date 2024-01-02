<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>

  <!-- <argon-alert>
      <strong>Primary!</strong> This is a primary alert—check it out!
    </argon-alert> -->

  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            
            <!-- Left panel -->
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Iniciar sesión</h4>
                  <p class="mb-0">Ingresa tu correo electronico y contraseña</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit="sigIn" method="post" action="/something">
                    <p v-if="errors.length">
                      <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
                      <ul>
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                      </ul>
                    </p>
                    <div class="mb-3">
                      <!--  -->
                      <!-- <p>Message is: {{ email }}</p> -->
                      <argon-input
                        :value="email"
                        @update:value="newValue => email = newValue"
                        :success="emailValid"
                        :error="!emailValid && email !== ''"
                        type="email"
                        placeholder="Correo electronico"
                        name="email"
                        size="lg"/>
                    </div>
                    <div class="mb-3">
                      <argon-input
                        :value="password"
                        @update:value="newValue => password = newValue"
                        :success="passwordValid"
                        :error="!passwordValid && password !== ''"
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        size="lg" />
                    </div>
                    <!-- <argon-switch id="rememberMe">Recuerdame</argon-switch> -->

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="info"
                        fullWidth
                        size="lg"
                      >Iniciar sesión</argon-button>
                      <!-- @click="sigIn" -->
                    </div>
                  </form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div> -->
              </div>
            </div>

            <!-- Right panel -->
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('/madrid_city.jpg');
                background-size: cover;"
              >
                <span class="mask bg-gradient-info opacity-7"></span>
                <h3
                  class="mt-5 text-white font-weight-bolder position-relative"
                >Safer Cities</h3>
                <p
                  class="text-white position-relative"
                >Plataforma de seguridad ciudadana colaborativa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
// import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
// import ArgonAlert from "@/components/ArgonAlert.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  data(){
    return {
      errors: [],
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
    }
  },
  components: {
    Navbar,
    ArgonInput,
    // ArgonSwitch,
    ArgonButton,
    // ArgonAlert
  },
  methods: {
    handleInput(value) {
      console.log('Input event emitted with value:', value);
    },
    sigIn(e) {
      e.preventDefault();

      console.log("sigIn");
      console.log("email:", this.email);
      console.log("password:", this.password);
      this.errors = [];

      // console.log("from:", this.emailValid)
      // this.emailValid = !!this.email;
      // console.log("to:", this.emailValid)
      // this.passwordValid = !!this.password;

      if (!this.password) {
        this.errors.push("El password es obligatorio.");
      }
      if (!this.email) {
        this.errors.push('El correo electrónico es obligatorio.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('El correo electrónico debe ser válido.');
      }

      console.log(this.errors.length)
      if (!this.errors.length) {
        // Add your sign-in logic here
        // After successful sign-in, redirect to the dashboard
        console.log("redirecting...")
        this.$router.push("/dashboard");
      }

      

      // if (!this.emailValid || !this.passwordValid) {
      //   // Show notification to the user
      //   console.log('Please fill in both email and password')
      //   // alert('Please fill in both email and password');
      // } else {

      // }
    },
    validEmail (email) {
      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // return re.test(email);
      return email;
    }
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
