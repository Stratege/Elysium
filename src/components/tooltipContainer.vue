<script setup lang="ts">
</script>

<template>
  <div class="tooltip">
    <slot></slot>
    <div class="tooltiptext">
      <div class="tooltipinner">
      <slot name="tooltip"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltipinner {
  background-color:black;
  padding: 5px;
}
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: grey;
  color: #fff;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 2;
  transform: translateY(-50%) translateY(14px);
  left: 110%;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent grey transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>