<template>
  <div class="container col-md-10">
    <br>
    <div class="row">
        <div class="col-md-10">
          <div class="input-group">
  <input type="text" class="form-control search" v-model="search.term" placeholder="Search Mail" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <div class="dropdown">
<button class="btn dropdown-toggle theme-color" @click="modals.classic = true" type="button">
</button>
</div>
    <button type="button" class="btn theme-color" @click="filteredList()"> <img src="@/assets/svg/icon_search.svg" height="20px" alt=""></button>
  </div>
</div>

          </div>
        </div>
          <br>
            <h6 class="font-weight-bold">Results:<span class="size-5">{{filtered.length}}</span> mail(s)</h6>
<div v-if="filtered.length !== 0">
  <sorted-table :values="filtered" class="collection collection-container" @sort-table="onSortTable">
      <div class="item item-container">
          <div class="attribute mail-icon"></div>
          <div class="attribute from">
            <sort-link name="from"> From </sort-link>
          </div>
          <div class="attribute to"><sort-link name="to">To </sort-link></div>
          <div class="attribute badger"></div>
          <div class="attribute subject"><sort-link name="subject">Subject </sort-link></div>
          <div class="attribute attactments"></div>
          <div class="attribute time"><sort-link name="time">Date </sort-link></div>
        </div>
    <template #body="sort">
      <router-link class="item item-container" v-for="value in sort.values" :to="{ name: 'Mail', params: {id:value.id} }" :key="value.id">
          <div class="attribute mail-icon">
            <img src="@/assets/svg/icon_mail_sp.svg" height="50px" width="18px" alt="">
          </div>
          <div class="attribute from" :class="{'font-weight-bold':isActive('from')}">
              {{ value.from }}
          </div>
          <div class="attribute to" :class="{'font-weight-bold':isActive('to')}">
              {{ value.to.join(", ") }}
          </div>
          <div class="attribute badger">
            <span class="badge badge-secondary" v-if="value.to.length > 1">+{{value.to.length-1}}</span>
          </div>
          <div class="attribute subject" :class="{'font-weight-bold':isActive('subject')}">
              {{ value.subject }}
          </div>
          <div class="attribute attactments">
            <span v-if="value.attachments.length !== 0">
              <img src="@/assets/svg/icon_clip.svg" height="16px" alt=""></span>
            </div>
          <div class="attribute time" :class="{'font-weight-bold':isActive('time')}">
            {{ value.time | date  }}
          </div>
          <div class="attribute arrow">
            <img src="@/assets/svg/icon_arrow02.svg?data" height="10px" alt="">
          </div>
      </router-link>
    </template>
  </sorted-table>
</div>
<div v-else>
  <hr>
  <div class="container">
    <div class="row">
        <div class="col-12">
            <img class="mx-auto d-block logo" src="logo.png">
        </div>
    </div>
</div>
</div>
<modal :show.sync="modals.classic" headerClasses="justify-content-center">
  <div class="form-group">
      <label for="contain">From</label>
      <input v-model="search.from" class="form-control" type="text" />
    </div>
    <div class="form-group">
      <label for="contain">To</label>
      <input v-model="search.to" class="form-control" type="text" />
    </div>
    <div class="form-group">
      <label for="contain">has the words</label>
      <input v-model="search.term" class="form-control" type="text" />
    </div>
    <div class="form-group">
      <label for="contain">Time</label>
      <div class="datepicker-trigger">
        <div class="input-group">
        <input
          class="date_element form-control"
          type="text"
          id="datepicker-trigger"
          placeholder="Select dates"
          :value="formatDates(dateOne, dateTwo)"
        >
        </div>
        <AirbnbStyleDatepicker
          :trigger-element-id="'datepicker-trigger'"
          :mode="'range'"
          :fullscreen-mobile="true"
          :date-one="dateOne"
          :date-two="dateTwo"
          @date-one-selected="val => { dateOne = val }"
          @date-two-selected="val => { dateTwo = val }"
          :showShortcutsMenuTrigger="false"
        />
      </div>
    </div>
<template slot="footer">
<button type="button" class="btn theme-color" @click="modals.classic = false"> Close</button>
<button type="button" class="btn theme-color" @click="filteredList()">Search</button>
</template>
</modal>
  </div>
</template>

<script>
import db from "../db.json";
import format from 'date-fns/format';
import moment from "moment";
import Modal from '@/components/Modal.vue';

export default {
  name: 'Home',
  components:{
      Modal
  },
  methods: {
  onSortTable(currentSort, currentDir){
    this.currentSort = currentSort;
    this.currentDir = currentDir;
  },
  formatDates(dateOne, dateTwo) {
    let formattedDates = ''
    if (dateOne) {
      formattedDates = format(dateOne, this.dateFormat)
    }
    if (dateTwo) {
      formattedDates += ' - ' + format(dateTwo, this.dateFormat)
    }
    return formattedDates
  },
  isActive(feild){
    return this.currentSort === feild;
  },
  fromFilter(email){
    if (this.search.from !== "") {
      return email.from === this.search.from;
    }
    return true;
  },
  toFilter(email){
    if (this.search.to !== "") {
      return email.to.includes(this.search.to);
    }
    return true;
  },
  dateFilter(email){
    if (this.dateOne !== "" && this.dateTwo !== "") {
      return parseInt(moment(this.dateOne, this.dateFormat).unix())*1000 <= parseInt(email.time) && parseInt(moment(this.dateTwo, this.dateFormat).unix())*1000 >= parseInt(email.time);
    }
    return true;
  },
  termFilter(email){
    if (this.search.term !== "") {
      return email.subject.toLowerCase().match(this.search.term.toLowerCase())||email.body.toLowerCase().match(this.search.term.toLowerCase());
    }
    return true;
  },
  filteredList(){
    this.filtered = this.values.filter(email => {
      return this.dateFilter(email) && this.termFilter(email) && this.toFilter(email) && this.fromFilter(email);
    })
    if (this.modals.classic) {
      this.modals.classic = false;
    }
  }
},
created() {
  this.filteredList();
},
  data() {
    return {
      values: db.emails,
      dateFormat: 'YYYY-MM-DD',
      dateOne: '',
      dateTwo: '',
      currentSort: '',
      currentDir: '',
      filtered:[],
      search:{
        from:'',
        to:'',
        term:''
      },
      modals: {
     classic: false,
 },
  }
}
}
</script>

<style>
.date_element {
    background-position: absolute;
    background-image: url("./../assets/svg/icon_calender.svg");
    background-repeat: no-repeat;
    background-position: 10px;
    background-origin: content-box;
    background-size: 1.5rem 1.5rem;
    background-origin: border-box;
    padding: 0px 0px 0px 50px;
    border-radius:6px;
    border-width: thin;
}
.date_element > ::placeholder {
  padding-left: 30px;
}

.search{
  max-width: 235px
}

.date_element>input[type="text"]{
  padding-left: 30px;
}

.logo{
  margin-top: 220px;
}

.input-group-append{
  border-radius:6px;
  border-width: bold;
}

.form-control{

}

.show>.dropdown-menu {
  left: 50%;
  transform: translateX(-50%);
}
</style>
