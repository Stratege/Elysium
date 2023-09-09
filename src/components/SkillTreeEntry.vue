<script setup lang="ts">

import {Cost} from "../util/types";

const props = defineProps<{
  name : string,
  requirement : string,
  cost : Cost,
  benefit : string,
}>()

let cost = props.cost.amount + " " + props.cost.kind

</script>

<template>
  <div :style="{'padding-top': '10px'}"><b>Name</b>: {{props.name}}</div>
  <div><br></div>
  <div><b>Requirement</b>: {{props.requirement}}</div>
  <div><br></div>
  <div><b>Cost</b>: {{cost}}</div>
  <div><br></div>
  <div><b>Benefit</b>: {{props.benefit}}</div>
</template>

<style scoped>
div {
  text-align: left;
  padding-left: 10px;
}
</style>