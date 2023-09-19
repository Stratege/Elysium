<script setup lang="ts">

import {Cost} from "../util/types";

const props = defineProps<{
  name : string,
  requirement : string,
  cost : Cost,
  benefit : string,
  special? : string,
}>()

function displayName(c : Cost)
{
  const displayName = {
    Soulstone: "Soulstone",
    "Infused Wood": "Infused Wood",
    "Mindsteel": "Mindsteel",
    "All": "of every ability resource",
    "Any": "ability resources in any combination"
  }
  if(c.kind == "Any" && c.amount == 1) {
    return "ability resource (any kind)"
  }
  return displayName[c.kind]
}

let cost = props.cost.amount + " " + displayName(props.cost)

</script>

<template>
  <div :style="{'padding-top': '10px'}"><b>Name</b>: {{props.name}}</div>
  <div><br></div>
  <div><b>Requirement</b>: {{props.requirement}}</div>
  <div><br></div>
  <div><b>Cost</b>: {{cost}}</div>
  <div><br></div>
  <div><b>Benefit</b>: {{props.benefit}}</div>
  <div v-if="props.special != undefined"><b>Special</b>: {{props.special}}</div>
</template>

<style scoped>
div {
  text-align: left;
  padding-left: 10px;
}
</style>