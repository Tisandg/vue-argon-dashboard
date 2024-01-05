import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/personalizations.css";
import ArgonDashboard from "./argon-dashboard";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// Call connecting to neo4j database

let initDatabase = require("./config.js");
initDatabase.configurationNeo4j();
const neo4j = initDatabase.neo4j();

const appInstance = createApp(App);

// Provide the Neo4j instance globally
appInstance.provide('neo4j', neo4j);

appInstance.component('EasyDataTable', Vue3EasyDataTable);
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
