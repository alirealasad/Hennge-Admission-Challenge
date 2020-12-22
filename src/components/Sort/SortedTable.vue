<template>
  <div>
    <slot></slot>
    <slot name="head"></slot>
    <slot name="body" :values="sortedValues"></slot>
    <slot name="foot"></slot>
  </div>
</template>

<script>
export default {
  name: "SortedTable",
  provide: function() {
    return {
      getCurrentSort: this.getCurrentSort,
      getSortIcon: this.getSortIcon,
      sortBy: this.sortBy,
      isActive:this.isActive
    };
  },
  props: {
    values: {
      type: Array,
      required: true,
      default: null
    },
    dir: {
      type: String,
      default: "asc"
    },
    sort: {
      type: String,
      default: "id"
    },
    onSort: {
      type: null,
      default: null
    }
  },
  data: function() {
    return {
      currentDir: this.dir,
      currentSort: this.sort
    };
  },
  computed: {
    get: function() {
      if (this.$_) {
        return this.$_.get;
      } else {
        return this.getValue;
      }
    },
    sortedValues: function() {
      if (this.onSort) {
        return this.values;
      } else {
        return this.values.slice().sort(
          function(a, b) {
            let modifier = 1;
            if (this.currentDir === "desc") {
              modifier = -1;
            }
            if (this.get(a, this.currentSort) < this.get(b, this.currentSort)) {
              return -1 * modifier;
            }
            if (this.get(a, this.currentSort) > this.get(b, this.currentSort)) {
              return 1 * modifier;
            }
            return 0;
          }.bind(this)
        );
      }
    }
  },
  methods: {
    getValue: function(array, key) {
      return array[key];
    },
    getCurrentSort: function() {
      return this.currentSort;
    },
    isActive(feild){
      return this.currentSort === feild;
    },
    getSortIcon: function() {
      if (this.currentDir === "asc") {
        return true;
      } else {
        return false;
      }
    },
    sortBy: function(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentDir = this.currentDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
      this.$emit("sort-table", this.currentSort, this.currentDir);
      if (this.onSort) {
        this.onSort(this.currentSort, this.currentDir);
      }
    }
  }
};
</script>
