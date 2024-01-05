<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>{{title}}</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">

        <div class="map-container">
          <l-map ref="map" v-model:zoom="zoom" :center="coordinates" :bounds="bounds" @ready="mapReady" :options="{zoomControl: false}">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-control :disableScrollPropagation="true" position="topleft">
              <div class="search-routes-section">
                <div class="autocomplete">
                  <input id="source" 
                    type="text"
                    name="source"
                    v-model="searchOrigin"
                    @input="onChangeOrigin"
                    placeholder="Desde" />

                  <ul v-show="isOpenOrigin" class="autocomplete-results">
                    <li v-for="(result, i) in resultsOrigin" :key="i" class="autocomplete-result" @click="setOrigin(result)">
                      {{ result.address }}
                    </li>
                  </ul>

                </div>

                <div class="autocomplete">
                  <input id="dest" 
                    type="text"
                    name="dest"
                    v-model="searchDestination"
                    @input="onChangeDestination"
                    placeholder="Hacia" />

                  <ul v-show="isOpenDestination" class="autocomplete-results">
                    <li v-for="(result, i) in resultsDestination" :key="i" class="autocomplete-result" @click="setDestination(result)">
                      {{ result.address }}
                    </li>
                  </ul>

                </div>
                
                <argon-button color="info" size="sm" class="" :action="getRoute">Buscar</argon-button>
                
              </div>
            </l-control>
            <l-control-zoom position="bottomright"></l-control-zoom>
            <l-control position="bottomright" >
              <button class="current-location-btn" @click="getCurrentLocation"><i class="ni ni-pin-3"></i></button>
            </l-control>
            <l-marker
              v-for="marker in markers"
              :key="marker.id"
              :visible="marker.visible"
              :draggable="marker.draggable"
              :lat-lng="marker.position"
              :icon="marker.icon"
              @click="alert(marker)"
            >
              <l-popup :content="marker.tooltip" />
              <l-tooltip :content="marker.tooltip" />

            </l-marker>
            <l-polyline
              :lat-lngs="routeCoords"
              :visible="true"
              @click="alert(polyline)"
            />
          </l-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { latLngBounds } from 'leaflet';
import ArgonButton from "@/components/ArgonButton.vue";
import { LMap, LTileLayer, LControl, LControlZoom, LMarker, LPopup, LPolyline, LTooltip} from "@vue-leaflet/vue-leaflet";

export default {
  name: "map-card",
  components:{LMap, LTileLayer, LControl, LControlZoom, ArgonButton, LMarker, LPopup, LPolyline, LTooltip},
  inject: ['neo4j'],
  props: {
    title: {
      type: String,
      default: "Map",
    },
  },
  data() {
    return {
      zoom: 11,
      driver: null,
      route: [],
      currentFocus: null,
      markers: [],
      polyline: [],
      routeCoords: [],
      map: null,
      popup: null,
      bounds: null,
      tiles: null,
      coordinates:[0,0],
      searchOrigin: "",
      searchOriginObj: {},
      searchDestination: "",
      searchDestinationObj: {},
      resultsOrigin: [],
      resultsDestination: [],
      isOpenOrigin: false,
      isOpenDestination: false,
    };
  },
  mounted(){
    this.route = [];
    document.addEventListener('click', this.handleClickOutside);


    // document.getElementById("routeButton").addEventListener("click", (e) => {
    //   e.preventDefault();
    //   this.getRoute(
    //     //source: document.getElementById("source").value,
    //     document.getElementById("source").dataset.id,
    //     document.getElementById("dest").dataset.id
    //     //dest: document.getElementById("dest").value,
    //   );
    // });

    // document.getElementById("btn-location").addEventListener("click", (e) => {
    //   e.preventDefault();
    //   this.getLocation();
    // });

    // this.markers = []
    // this.map = L.map("map", { zoomControl: false }).setView(
    //   [40.4165, -3.70256],
    //   13
    // );

    // L.control
    //   .zoom({
    //     position: "bottomright",
    //   }).addTo(this.map);

    // this.tiles = L.tileLayer(
    //   "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    //   {
    //     maxZoom: 19,
    //     attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //   }
    // ).addTo(this.map);

    // this.popup = L.popup();
    // this.route = [];
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    mapReady(){
      console.log("Map Ready");
      this.getCurrentLocation();
    },
    filterResults(address, source) {
      let session = this.neo4j.session();
      session.run(
        `CALL db.index.fulltext.queryNodes("search_index", $searchString) 
        YIELD node, score
        RETURN coalesce(node.name, node.full_address) AS value, score, labels(node)[0] AS label, node.id AS id
        ORDER BY score DESC LIMIT 10`,
        { searchString: address }
      )
      .then((result) => {
        console.log(result);
        let localResults = [];
        result.records.forEach((record) => {
          const address = record.get("value");
          const nodeId = record.get("id")
          localResults.push({"address":address, "nodeId":nodeId});
        });

        if(source == "origin"){
          this.resultsOrigin = localResults;
        }else{
          this.resultsDestination = localResults;
        }
      });
    },
    onChangeOrigin(){
      if(this.searchOrigin.length >= 4){
        this.filterResults(this.searchOrigin,"origin");
        this.isOpenOrigin = true;
      }else{
        this.isOpenOrigin = false;
      }
    },
    onChangeDestination(){
      if(this.searchDestination.length >= 4){
        this.filterResults(this.searchDestination,"destination");
        this.isOpenDestination = true;
      }else{
        this.isOpenDestination = false;
      }
    },
    setOrigin(result) {
      this.searchOrigin = result.address;
      this.searchOriginObj = result;
      this.isOpenOrigin = false;
    },
    setDestination(result) {
      this.searchDestination = result.address;
      this.searchDestinationObj = result;
      this.isOpenDestination = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpenDestination = false;
        this.isOpenOrigin = false;
      }
    },
    /**
     * Get the current location of the user, and set the map to that location
     */
    getCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => { this.coordinates = [position.coords.latitude, position.coords.longitude]; },
          error => {  console.error("Error getting location: ", error); }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    getRoute(){

      if(Object.keys(this.searchOriginObj).length == 0 || Object.keys(this.searchDestinationObj).length == 0){
        console.log("Origin AND destination must be provided to get the route")
        return
      }
        
      //Clean markers and the line drawn on the map
      this.markers = [];
      
      // for(var i = 0; i < this.markers.length; i++){
      //     this.map.removeLayer(this.markers[i]);
      // }

      console.log("source & destination", this.searchOriginObj.address, this.searchDestinationObj.address)
      let source = this.searchOriginObj.nodeId;
      let dest = this.searchDestinationObj.nodeId;
      // var session = this.driver.session({
      //   database: "neo4j",
      //   defaultAccessMode: this.$neo4j.session.READ,
      // });
      let session = this.neo4j.session();

      const routeQuery = `
                MATCH (to {id: $dest})-[:NEAREST_INTERSECTION]->(source:Intersection) 
                MATCH (from {id: $source})-[:NEAREST_INTERSECTION]->(target:Intersection)
                CALL apoc.algo.dijkstra(source, target, 'ROAD_SEGMENT', 'length', 3)
                YIELD path, weight
                RETURN [n in nodes(path) | [n.location.latitude, n.location.longitude]] AS route
                    `;

      // const routeQuery = `
      // MATCH (to {id: $dest})-[:ROAD_SEGMENT]->(source:Intersection) 
      // MATCH (from {id: $source})-[:ROAD_SEGMENT]->(target:Intersection)
      // CALL apoc.algo.dijkstra(
      //     source,
      //     target,
      //     'ROAD_SEGMENT',  // Relationship type representing roads
      //     'length',  // Property representing distance
      // ) YIELD path, weight

      // WITH path, weight
      // // Calculate the safety score for the path
      // WITH path, weight, reduce(safety = 0, rel in relationships(path) | safety + rel.risk_score) AS totalRisk
      // RETURN [n in nodes(path) | [n.location.latitude, n.location.longitude]] AS route
      // ORDER BY weight ASC, totalRisk ASC
      // LIMIT 1
      //       `;


      // var session = this.driver.session({
      //   database: "neo4j",
      //   defaultAccessMode: neo4j.session.READ,
      // });

      session
        .run(routeQuery, { source, dest })
        .then((routeResult) => {
          routeResult.records.forEach((routeRecord) => {
            const routeCoords = routeRecord.get("route");
            this.routeCoords = routeCoords;
            console.log("routeCoords", routeCoords);

            let localMarkers = [
              {id:"source", position: routeCoords[0], tooltip: "Origen", dragable:false, visible:true},
              {id:"dest", position: routeCoords[routeCoords.length-1], tooltip: "Destino", dragable:false, visible:true}
            ]

            this.markers = localMarkers;

            // var polyline = L.polyline(routeCoords).setStyle({ color: "blue", weight: 7 })

            // this.markers.push(polyline)
            // polyline.addTo(this.map);

            // console.log(routeCoords[0])
            // console.log(routeCoords[routeCoords.length-1])

            // var corner1 = L.latLng(routeCoords[0][0], routeCoords[0][1]),
            // corner2 = L.latLng(routeCoords[routeCoords.length-1][0], routeCoords[routeCoords.length-1][1])

            // let marker_1 = L.marker(corner1);
            // this.markers.push(marker_1)
            // marker_1.addTo(this.map);

            // let marker_2 = L.marker(corner2);
            // this.markers.push(corner2)
            // marker_2.addTo(this.map);
            
            // this.bounds = L.latLngBounds(corner1, corner2);
            this.bounds = latLngBounds(routeCoords);

            // this.map.panInsideBounds(this.bounds)
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.route = [];
          session.close();
        });
    }
  },

};
</script>

<style scoped>
  .map-container{
    height: 70vh;
    width: 100%;
  }
  .current-location-btn{
    width: 2rem;
    height: 2rem;
    background-color: white;
    border: 2px solid #ccc;
    padding: 0;
    font-size: 16px;
    border-radius: 4px;
  }
  .current-location-btn:hover{
    background-color: #f0f0f0;
  }

  .search-routes-section{
    display: flex;
    flex-direction: column;
    width: 16rem;

    input{
      margin-bottom: 4px;
    }

    button{
      margin-top: 4px;
    }
  }

  .autocomplete {
    position: relative;
  }

  .autocomplete > input {
    width: 100%;
  }

  .autocomplete-results {
    position: absolute;
    z-index: 1;
    margin-top: -4px !important;
    background-color: white;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    height: auto;
    width: 100%;
    min-height: 1em;
    max-height: 12rem;    
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>

