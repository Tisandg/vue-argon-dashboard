const neo4jModule = require('neo4j-driver');
// console.log('Before dotenv config');
// const path = require('path')
// require('dotenv').config({debug: true, path: path.resolve(__dirname, '../.env.development')});
// require('dotenv').config({ debug: true, path: path.join(__dirname, '..', '.env.development')})

// require('dotenv').config({ debug: true})
// console.log('After dotenv config');
let neo4jDriver;

function configurationNeo4j() {
  try{
    const {VUE_APP_NEO4J_URI, VUE_APP_NEO4J_USER, VUE_APP_NEO4J_PASSWORD} = process.env;
    // console.log(process.env)
    // console.log(VUE_APP_NEO4J_URI, VUE_APP_NEO4J_USER, VUE_APP_NEO4J_PASSWORD);
    if(!VUE_APP_NEO4J_URI || !VUE_APP_NEO4J_USER || !VUE_APP_NEO4J_PASSWORD){
      throw new Error('Missing configuration for Neo4j. Please config .env file');
    }
    const config = {
      maxTransactionRetryTime: 3000,
      maxConnectionLifetime: 100000,
      maxConnectionPoolSize: 50,
    };
    const driver = neo4jModule.driver(VUE_APP_NEO4J_URI, neo4jModule.auth.basic(VUE_APP_NEO4J_USER, VUE_APP_NEO4J_PASSWORD), config);
    neo4jDriver = driver;
    console.log('Neo4j connected');
  }catch(error){
    console.log("Neo4j Database error: ", error.message);
  }
}

function neo4j(){
  return neo4jDriver;
}

module.exports = {
  configurationNeo4j,
  neo4j,
};