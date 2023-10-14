<script setup lang="ts">
  import Tree from "./Tree.vue";
  import {nihilim,covenant,thul} from "../assets/researchData";
  import {completedNihiResearchs, completedCoveResearchs, completedThulResearchs} from "../assets/completedResearchs.ts";
  import ResearchTreeEntry from "./ResearchTreeEntry.vue";

  const props = defineProps<{faction: 'Nihilim' | 'Covenant' | 'Thul'}>()
  const w = 300
  const h = 400
  const d = 100

  const colorPick = {
    'Nihilim': 'darkblue',
    'Covenant': 'darkgoldenrod',
    'Thul': 'firebrick'
  }
  const techPick = {
    'Nihilim': nihilim,
    'Covenant': covenant,
    'Thul': thul
  }
  const completedColorPick = {
    'Nihilim': 'blue',
    'Covenant': 'goldenrod',
    'Thul': 'red',
  }
  const completedPick = {
    'Nihilim': completedNihiResearchs,
    'Covenant': completedCoveResearchs,
    'Thul': completedThulResearchs,
  }
  const color = colorPick[props.faction]
  const techs = techPick[props.faction]
  const completed = completedPick[props.faction]
  const completedColor = completedColorPick[props.faction]
</script>

<template>
  <Tree :nodes="techs" :w="w" :h="h" :d="d" :color="color" :recolor-nodes="completed" :recolored-color="completedColor">
    <template #node="i">
      <ResearchTreeEntry :cost="i.cost" :name="i.name" :description="i.desc" :benefit="i.benefit" :faction="props.faction"></ResearchTreeEntry>
    </template>
  </Tree>
</template>

<style scoped>
</style>