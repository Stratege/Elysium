<script setup lang="ts">

const props = defineProps<{
  name : string,
  description : string,
  cost : number,
  benefit : string,
  faction : 'Nihilim' | 'Covenant' | 'Thul'
}>()

const resName = {
  Nihilim: 'Gnosis',
  Covenant: 'Faith',
  Thul: 'Blood'
}

let cost = props.cost + " " + resName[props.faction]

</script>

<template>
  <div :style="{'padding-top': '10px'}"><b>Name</b>: {{props.name}}</div>
  <div><br></div>
  <div><b>Description</b>: {{props.description}}</div>
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