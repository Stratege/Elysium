<script setup lang="ts">

import TooltipContainer from "./tooltipContainer.vue";
import type {entry, GM} from "../util/types.ts";

const props = defineProps<{ cell: { x: number, y:number }, entry: entry, highlightGM: GM | undefined }>()
let vx = Math.sin(Math.PI/6), vy = Math.cos(Math.PI/6)
let cell2 = {
  x: vx*props.cell.y + props.cell.x,
  y: vy*props.cell.y
}
const claimedColorDict = {
  'Nihi': 'blue',
  'Cove': 'goldenrod',
  'Thul': 'firebrick',
  'Dragon': 'purple',
  'Dungeon': 'grey',
  'GMOnly': 'white',
  'Unexplored': 'black',
  'isHighlighted': 'purple',
}
const buildingColorDict = {
  'Nihi': 'lightblue',
  'Cove': 'gold',
  'Thul': 'red',
  'Dragon': 'purple',
  'Dungeon' : undefined,
}
let size = 50
let widthcss = size+'px'
let halfwidthcss = (size/2)+'px'
let heightcss = size*0.6+'px'
let halfheightcss = size*0.3+'px'
let neghalfheightcss = '-'+halfheightcss
let outercolorIndex : keyof typeof claimedColorDict = props.entry.faction
if (props.highlightGM && (props.entry.owningGM === props.highlightGM)) {
  outercolorIndex = 'isHighlighted'
} else if (props.entry.owningGM != null && props.entry.faction  == 'Dungeon') {
  outercolorIndex = 'GMOnly'
} else if(props.entry.terrain == null) {
  outercolorIndex = 'Unexplored'
}
let outercolor = claimedColorDict[outercolorIndex]
let innercolor = (props.entry.building || props.entry.faction === 'Dragon' ? buildingColorDict[props.entry.faction] : null) ??'lightgrey'

//    {{ cell.x }} , {{ cell.y}}
let textcolor = buildingColorDict[props.entry.faction]
</script>

<template>
  <TooltipContainer :style="{'top': cell2.y * size + 'px', 'left': cell2.x * size + 'px', position:'absolute', width: size+'px', height:size+'px', coke:'test'}">
    <div class="hex">
    </div>
    <div class="hex inner">
      {{entry.building ?? (entry.owningGM != null ? '' : cell.x+","+cell.y)}}
    </div>
    <template v-slot:tooltip>
      <div class="ttline">Faction: {{entry.faction}}</div>
      <div class="ttline">Building: {{entry.building ?? 'None'}}</div>
      <div class="ttline">GM: {{entry.owningGM ?? 'None'}}</div>
      <div class="ttline">Terrain: {{entry.terrain ?? 'Unexplored'}}</div>
      <div class="ttline">Note: {{entry.note ?? ''}}</div>
    </template>
  </TooltipContainer>
</template>

<style scoped>
.ttline {
  text-align: left;
  width: 200px;
  margin-left:5px;
  color: v-bind('textcolor');
}
.hex {
  width: v-bind('widthcss');
  height: v-bind('heightcss');
  background: v-bind('outercolor');
  position: absolute;
}
.hex:before, .hex:after {
  content:"";
  left: 0px;
  border-left: v-bind('halfwidthcss') solid transparent;
  border-right: v-bind('halfwidthcss') solid transparent;
  position: absolute;
}
.hex:before {
  top: v-bind('neghalfheightcss');
  border-bottom: v-bind('halfheightcss') solid v-bind('outercolor');
}
.hex:after {
  bottom: v-bind('neghalfheightcss');
  border-top: v-bind('halfheightcss') solid v-bind('outercolor');
}
.hex.inner {
  background-color: v-bind('innercolor');
  -webkit-transform: scale(.9, .9);
  -moz-transform: scale(.9, .9);
  transform: scale(.9, .9);
  z-index:1;
}
.hex.inner:before {
  border-bottom: v-bind('halfheightcss') solid v-bind('innercolor');
}
.hex.inner:after {
  border-top: v-bind('halfheightcss') solid v-bind('innercolor');
}
</style>