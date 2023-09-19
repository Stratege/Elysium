<script setup lang="ts" generic="T">
import {toMap} from "../util/helpers";
import {TreeNode} from "../util/types";

const props = withDefaults(defineProps<{nodes : TreeNode<T>[], w:number, h:number, d:number, color? : string}>(),{
  color: "grey"
})
const xs = props.nodes.map(x => x.x)
const ys = props.nodes.map(x => x.y)
const maxX = Math.max(0,...xs)
const maxY = Math.max(0,...ys)
//const minX = Math.min(0,...xs)
//const minY = Math.min(0,...ys)
const index = toMap(props.nodes, x => x.name)


const w = props.w+props.d
const h = props.h+props.d
const maxXcss = (maxX+1)*w+'px'
const maxYcss = (maxY+1)*h+'px'
const wcss = props.w+'px'
const hcss = props.h+'px'

function xPos(x : number) {
  return x*w
}
function yPos(y : number) {
  return y*h
}

const lines : {x1: number, y1:number, x2:number,y2:number}[]= []
props.nodes.forEach(node => {
  node.dependOn.forEach(depName => {
    const dep = index[depName]
    if(dep === undefined) {
      console.log("element "+node.name+" has dependency on undefined "+node.dependOn)
      return
    }
    lines.push({x1:xPos(dep.x)+props.w/2, x2:xPos(node.x)+props.w/2,y1:yPos(dep.y)+props.h, y2:yPos(node.y)})
  })
})
console.log(lines)
</script>

<template>
  <svg>
    <line v-for="l in lines" :x1="l.x1+'px'" :y1="l.y1+'px'" :x2="l.x2+'px'" :y2="l.y2+'px'"></line>
  </svg>
  <template v-for="n in props.nodes">
    <div :style="{top: yPos(n.y)+'px', left: xPos(n.x)+'px'}" class="node">
      <slot name="node" v-bind="n.elem"/>
    </div>
  </template>
</template>

<style scoped>
svg{
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind('maxXcss');
  height: v-bind('maxYcss');
}

line{
  stroke-width:2px;
  stroke:v-bind('props.color');
}
.node {
  position:absolute;
  background-color: v-bind('props.color');
  color: white;
  width: v-bind('wcss');
  height: v-bind('hcss');
  overflow: auto;
}
</style>