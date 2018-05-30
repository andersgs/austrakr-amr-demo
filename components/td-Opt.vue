<template>
  <div class="btn-group btn-group-sm">
    <button class="btn btn-default" title="Display row"
      :class="{ '-nested-comp-open-btn': isDisplayRowVisible }"
      @click="toggleNestedComp('DisplayRow')">
      <i class="fa fa-list-ul"></i>
    </button>
    <button class="btn btn-default" title="AMR Genes"
      :class="{ '-nested-comp-open-btn': isAmrTableVisible }"
      @click="toggleNestedComp('AmrTable')">
      <i class="fa fa-bolt"></i> {{ row.amr.length }}
    </button>
  </div>
</template>
<script>
import DisplayRow from "~/components/nested-DisplayRow";
export default {
  components: {
    DisplayRow
  },
  props: ["row", "nested"],
  mounted() {
    $(this.$el)
      .find("button[title]")
      .tooltip();
  },
  computed: {
    isDisplayRowVisible() {
      if (this.nested.comp !== "DisplayRow") return;
      return this.nested.visible;
    },
    isAmrTableVisible() {
      if (this.nested.comp !== "AmrTable") return;
      return this.nested.visible;
    }
  },
  methods: {
    toggleNestedComp(comp) {
      const { nested } = this;
      if (nested.comp === comp) return nested.$toggle();
      nested.$toggle(DisplayRow, true);
    }
  }
};
</script>
<style>
.-nested-comp-open-btn {
  color: #fff !important;
  background-color: #337ab7 !important;
}
</style>
