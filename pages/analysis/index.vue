<template>
    <div class="container">
        <no-ssr>
          <phylo-canvas></phylo-canvas>
        </no-ssr>
        <no-ssr class="mini-map">
            <div id="map-wrap" style="height: 100%">
                    <l-map :zoom=13 :center="[-37.8136, 144.9631]">
                        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                        <l-marker v-for="s in selection" :key="s.id" :lat-lng="[s.lat, s.long]">
                          <l-tooltip>
                            <div><span class="tip">ID:</span> {{s.id}}</div>
                            <div><span class="tip">Species:</span> {{s.species}}</div>
                            <div><span class="tip">ST:</span> {{s.st}}</div>
                            <div><span class="tip">Collection Date:</span> {{s.collecton_date}}</div>
                            <div><span class="tip">Source:</span> {{s.source}}</div>
                            <div><span class="tip">Type:</span> {{s.type}}</div>
                          </l-tooltip>
                        </l-marker>

                    </l-map>
            </div>
        </no-ssr>
        </div>
</template>

<script>
import PhyloCanvas from "~/components/PhyloCanvas";
import { EventBus } from "~/assets/eventBus";

export default {
  components: {
    PhyloCanvas
  },
  data() {
    return {
      selection: []
    };
  },
  created() {
    this.selection = this.$store.state.selected;
  }
};
</script>


<style src="leaflet/dist/leaflet.css"></style>
<style scoped>
.container {
  height: 500px;
  display: flex;
  flex: 1 1 auto;
  order: 2;
  justify-content: flex-start;
}

.tree {
  width: 34%;
  /* flex: 1 1 auto; */
  background: lightgreen;
  color: white;
}

.mini-map {
  width: 66%;
  height: 500px !important;
  /* flex: 1 1 auto; */
}

.tip {
  font-weight: bold;
}
</style>


