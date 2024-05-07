<template>
  <div id="RightChartPanel"></div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
onMounted(() => {})
</script>

<style>
#RightChartPanel {
  width: 25em;
  height: calc(100vh - 6em - 2em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: auto;
  /* border: 1px solid red; */

  .chartContainer {
    height: calc(100% / 3 - 1em);
    /* background-image: url("@/assets/image/TEMP.png"); */
    /* background-image: linear-gradient(to right, cyan 0.5%, var(--BLUE) 3%, black 45%, black 95%, var(--BLUE) 97%, cyan 99.5%); */
    background-color: rgba(0, 0, 0, 0.75);
    border: 1px solid cyan;
  }
}
</style>
