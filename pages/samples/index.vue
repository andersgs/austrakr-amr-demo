<template>
  <div class="container">
    <div class="container alert-info" v-if="this.selection.length==0" style="margin: 10 100 10 10" >
      <p class="fa fa-info-circle large-font">
        Search for an AMR gene (e.g., KPC-3), then select samples by checking the boxed on the left of the rows. Click on the "Analyse Sample(s)" button to move to the map windown.
      </p>
    </div>
     <no-ssr>
       <datatable v-bind="$data"></datatable>
    </no-ssr>
    <button v-if="this.selection.length>0" class="btn btn-primary" @click="goToAnalysis()">Analyse selected sample(s).</button>
  </div>
</template>
<script>
import amrQuery from "~/assets/data";
import Vue from "vue";
import FilterTh from "~/components/th-Filter";
import Opt from "~/components/td-Opt";
import DisplayRow from "~/components/nested-DisplayRow";
import { EventBus } from "~/assets/eventBus";

export default {
  components: {
    FilterTh,
    Opt,
    DisplayRow
  },
  name: "AmrTable",
  props: ["row"],
  data() {
    const amINestedComp = !!this.row;
    return {
      supportBackup: true,
      supportNested: true,
      tblClass: "table-bordered",
      tblStyle: "color: #666",
      pageSizeOptions: [5, 10, 15, 20, 25],
      columns: (() => {
        const cols = [
          {
            title: "UID",
            field: "id",
            label: "Sample ID",
            sortable: true,
            visible: "true"
          },
          {
            title: "Species",
            field: "species",
            thComp: FilterTh,
            // sortable: true,
            tdStyle: { fontStyle: "italic" }
          },
          { title: "ST", field: "st", sortable: true },
          { title: "Location", field: "location", sortable: true },
          { title: "Source", field: "source", sortable: true },
          { title: "Type", field: "type", sortable: true },
          {
            title: "AMR",
            field: "amr",
            tdComp: Opt,
            visible: "true",
            thComp: FilterTh
          }
        ];
        const groupsDef = {
          Normal: ["Species"],
          Sortable: ["UID", "Species"],
          Extra: ["AMR"]
        };
        return cols.map(col => {
          Object.keys(groupsDef).forEach(groupName => {
            if (groupsDef[groupName].includes(col.title)) {
              col.group = groupName;
            }
          });
          return col;
        });
      })(),
      data: [],
      total: 0,
      query: amINestedComp ? { uid: this.row.species } : {},
      summary: {},
      selection: [],
      xprops: {
        eventbus: new Vue()
      }
    };
  },
  watch: {
    query: {
      handler() {
        this.handleQueryChange();
      },
      deep: true
    }
  },
  methods: {
    goToAnalysis() {
      this.$store.commit("add", this.selection);
      this.$router.push("analysis");
    },
    handleQueryChange() {
      amrQuery(this.query).then(({ rows, total, summary }) => {
        this.data = rows;
        this.total = total;
        this.summary = summary;
      });
    }
  }
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

.alert-info {
  max-width: 900px;
  min-height: 50px;
  margin: 25px 0px 25px 0px;
}

.large-font {
  font-size: 1.5em;
}
</style>
