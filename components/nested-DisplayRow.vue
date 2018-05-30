<template>
  <div class="-nested-dsp-row-comp">
    <button class="btn btn-xs btn-link -nested-dsp-row-close-btn"
      @click="nested.$toggle(false)">
      <i class="fa fa-times fa-lg"></i>
    </button>
    <dl class="dl-horizontal">
      <template>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="col-md-1">Gene</th>
                  <th class="col-md-1">Accession</th>
                  <th class="col-md-1">Percent Coverage</th>
                  <th class="col-md-1">Percent Identity</th>
                  <th class="col-md-3">Product</th>
                </tr>
              </thead>
              <tbody  v-for="(val, key) in sortedAmr" :key="key">
                <tr>
                  <td class="col-md-1">{{val.gene}}</td>
                  <td class="col-md-1">{{val.accession}}</td>
                  <td class="col-md-1">{{val.percent_cov}}</td>
                  <td class="col-md-1">{{val.percent_id}}</td>
                  <td class="col-md-3">{{val.product}}</td>
                </tr>
              </tbody>
            </table>
      </template>
    </dl>
  </div>
</template>
<script>
export default {
  props: ["row", "nested"],
  computed: {
    sortedAmr: function() {
      function compare(a, b) {
        if (a.gene < b.gene) {
          return -1;
        }
        if (a.gene > b.gene) {
          return 1;
        }
        return 0;
      }
      let arr = this.row.amr;
      return arr.sort(compare);
    }
  },
  mounted() {
    console.log("Mounted DisplayRow");
  }
};
</script>
<style>
.-nested-dsp-row-comp {
  position: relative;
  padding: 10px;
}
.-nested-dsp-row-close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>