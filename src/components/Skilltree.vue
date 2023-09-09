<script setup lang="ts">
import Tree from "./Tree.vue";
import SkillTreeEntry from "./SkillTreeEntry.vue";
import {skillTree} from "../assets/skilltreeData";

const w = 300
const h = 400
const d = 100
</script>

<template>
  <Tree :nodes="skillTree" :w="w" :h="h" :d="d">
    <template #node="i">
      <SkillTreeEntry :cost="i.cost" :name="i.name" :requirement="i.req" :benefit="i.benefit"></SkillTreeEntry>
    </template>
  </Tree>
</template>

<style scoped>

</style>