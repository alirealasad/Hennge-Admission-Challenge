<template>
<div class="container">
  <div class="col-md-10">
    <h2>{{getEmail.subject}}</h2>
    <h5>From: {{getEmail.from }}</h5>
    <h5>to: {{getEmail.to.join(', ') }}</h5>
    <h6 class="font-weight-bold">{{getEmail.time | date}}</h6>
    <hr>
    <p>{{getEmail.body}}</p>
  </div>
</div>
</template>

<script>
import db from "../db.json";

export default {
  name:"mail",
  computed:{
    getEmail(){
      return this.values.find(val => val.id === this.$route.params.id)
    },
  },
  data() {
    return {
      values: db.emails
    }
    }

}
</script>

<style lang="scss" scoped>
</style>
