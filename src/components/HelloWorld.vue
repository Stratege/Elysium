<script setup lang="ts">
import Hex from "./Hex.vue";
import {entries} from "../util/hexEntriesProcessing.ts";
import type {entry} from "../util/types.ts";

function hexGrid(edgeLength: number){
  let len = 2*edgeLength - 1,
      tl = edgeLength - 1, br = 3*edgeLength - 2,
      positions = [];

  for(let y = 0; y < len; ++y){
    for(let x = 0; x < len; ++x){
      if(x+y < tl || x+y >= br) continue;
      positions.push({
        x: x,
        y: y
      });
    }
  }
  return positions;
}

let edge = 11;
let cells = hexGrid(edge);

function getEntry(x :number, y :number) : entry {
  return entries[x][y]
}

</script>

<template>
  <template v-for="cell in cells">
    <hex :cell="cell" :entry="getEntry(cell.x,cell.y)" :highlight-g-m=undefined></hex>
  </template>
</template>

<style scoped>


</style>
