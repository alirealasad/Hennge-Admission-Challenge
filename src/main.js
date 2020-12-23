import Vue from 'vue'
import App from './App.vue'
import "bootstrap/scss/bootstrap.scss";
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import "@/assets/scss/style.scss"
import router from './router'
import Plugin from "./plugins/plugins";
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
// import './registerServiceWorker'

const datepickerOptions = {
  colors: {
  selected: '#e9e9e9',
  inRange: '#f5f5f5',
  selectedText: '#000000',
  text: '#000000',
  inRangeBorder: '#f5f5f5',
  disabled: '#ffffff',
  hoveredInRange: '#e9e9e9'
},
texts: {
  apply: 'Select',
  cancel: 'Cancel'
},
}


Vue.use(AirbnbStyleDatepicker, datepickerOptions)
Vue.use(Plugin);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
