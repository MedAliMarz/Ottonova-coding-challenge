<template>
  <div ref="map" id="map">
  </div>
</template>

<script lang="ts">
import View from 'ol/View'
  import Map from 'ol/Map'
  import TileLayer from 'ol/layer/Tile'
  import OSM from 'ol/source/OSM'
  import * as proj from 'ol/proj'
  import 'ol/ol.css'

  export default {
    name: 'Map',
    components: {},
    props: {
        lat: Number,
        lng: Number
    },
    mounted() {

      const map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM() 
          }),
        ],
        view: new View({
          zoom: 16,
          center: proj.transform([this.lng, this.lat], 'EPSG:4326', 'EPSG:3857') ,
        }),
        
      })
      map.setProperties({
          source:  [37.1482933,9.586628],
      })
    },
  }
</script>

<style scoped>
#map{
   width: 500px;
    height: 300px;
}
</style>