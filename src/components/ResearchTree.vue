<script setup lang="ts">
  import Tree from "./Tree.vue";
  import {nihilim} from "../assets/researchData";
  import ResearchTreeEntry from "./ResearchTreeEntry.vue";

  const w = 300
  const h = 400
  const d = 100
</script>

<template>
  <Tree :nodes="nihilim" :w="w" :h="h" :d="d" :color="'darkblue'">
    <template #node="i">
      <ResearchTreeEntry :cost="i.cost" :name="i.name" :description="i.desc" :benefit="i.benefit" :faction="'Nihilim'"></ResearchTreeEntry>
    </template>
  </Tree>
</template>

<style scoped>
</style>