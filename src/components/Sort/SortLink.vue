<template>
  <a href="#" class="sort-link" :class="{'font-weight-bold':isActive(name)}" @click.prevent="sortBy(name)">
      <slot>{{ name }}</slot>
        <slot name="icon">
          <span v-if="isActive(name)">
            <span v-if="getSortIcon()">
              <img src="@/assets/svg/icon_arrow01.svg" height="12px" width="10px" alt="">
            </span>
            <span v-else>
             <img src="@/assets/svg/icon_arrow01.svg" style="transform: rotate(180deg);" height="12px" width="10px" alt="">
            </span>
          </span>
        </slot>
  </a>
</template>

<script>
export default {
  name: "SortLink",
  inject: ["getSortIcon", "sortBy", "isActive"],
  props: {
    name: {
      type: String,
      required: true,
      default: ""
    }
  }
};
</script>

<style lang="scss">
a {
   color: black;
 }
</style>
