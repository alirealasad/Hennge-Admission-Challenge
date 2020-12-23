import SortedTable from "@/components/Sort/SortedTable.vue";
import SortLink from "@/components/Sort/SortLink.vue";
import DateFilter from "@/plugins/date.filter";
import clickOutside from '@/plugins/click-outside.js';

const Plugin = {
  install: function(Vue) {
    Vue.component(SortedTable.name, SortedTable);
    Vue.component(SortLink.name, SortLink);
    Vue.filter("date", DateFilter);
    Vue.directive('click-outside', clickOutside);

    if (!Vue.prototype.$_ && typeof window !== "undefined" && window._) {
      Vue.prototype.$_ = window._;
    }
  }
};

export default Plugin;
