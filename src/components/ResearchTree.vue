<script setup lang="ts">
  import Tree from "./Tree.vue";
  import SkillTreeEntry from "./SkillTreeEntry.vue";
  import {nihilim} from "../assets/researchData";

  const w = 300
  const h = 400
  const d = 100
</script>

<template>
  <Tree :nodes="nihilim" :w="w" :h="h" :d="d">
    <template #node="i">
      <SkillTreeEntry :cost="{kind: 'Any', amount:i.cost}" :name="i.name" :requirement="i.desc" :benefit="i.benefit"></SkillTreeEntry>
    </template>
  </Tree>
</template>

<style scoped>

</style>