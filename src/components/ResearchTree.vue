<script setup lang="ts">
  import Tree from "./Tree.vue";
  import {nihilim,covenant,thul} from "../assets/researchData";
  import ResearchTreeEntry from "./ResearchTreeEntry.vue";

  const props = defineProps<{faction: 'Nihilim' | 'Covenant' | 'Thul'}>()
  const w = 300
  const h = 400
  const d = 100

  const colorPick = {
    'Nihilim': 'darkblue',
    'Covenant': 'darkgoldenrod',
    'Thul': 'red'
  }
  const techpick = {
    'Nihilim': nihilim,
    'Covenant': covenant,
    'Thul': thul

  }
  const color = colorPick[props.faction]
  const techs = techpick[props.faction]
</script>

<template>
  <Tree :nodes="techs" :w="w" :h="h" :d="d" :color="color">
    <template #node="i">
      <ResearchTreeEntry :cost="i.cost" :name="i.name" :description="i.desc" :benefit="i.benefit" :faction="props.faction"></ResearchTreeEntry>
    </template>
  </Tree>
</template>

<style scoped>
</style>