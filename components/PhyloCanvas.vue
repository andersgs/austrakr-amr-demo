<template>
    <div id="phylocanvas"></div>
</template>

<script>
import Phylocanvas from "phylocanvas";
import { phyloTree } from "~/assets/data/tree";

export default {
  data() {
    return {
      tree: phyloTree,
      selected: []
    };
  },
  methods: {
    addTree() {
      this.tree = this.input_tree;
    }
  },
  created() {
    // this.tree = phyloTree;
    this.selected = this.$store.state.selected;
  },
  mounted() {
    console.log(this.tree);

    this.phylo = Phylocanvas.createTree("phylocanvas");
    this.phylo.load(this.tree);
    this.phylo.setTreeType("rectangular");
    if (this.selected.length > 0) {
      let idArray = [];
      for (let s = 0; s < this.selected.length; s++) {
        idArray.push(this.selected[s].id);
      }
      for (let l = 0; l < this.phylo.leaves.length; l++) {
        let tmpId = +this.phylo.leaves[l].id;
        if (idArray.includes(tmpId)) {
          this.phylo.leaves[l].highlighted = true;
        }
      }
      this.phylo.draw();
    }
  },
  beforeUpdate() {
    console.log("About to update!");
    this.phylo.cleanup();
  },
  beforeDestroy() {
    console.log("About to destroy!");
    this.phylo.cleanup();
  }
};
</script>

