<template>
  <div id="header">
    <p id="projectTitle">{{ projectName }}</p>
    <img src="../assets/image/header.png">
  </div>
</template>

<script setup>
import { ref } from "vue"
const projectName = ref(process.env.VUE_APP_PROJECT_NAME)
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 3em;
  text-align: center;
  z-index: 10;

  #projectTitle {
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translate(-50%, 0);
    color: var(--WHITE);
    font-size: 2em;
    font-weight: 900;
    font-weight: bolder;

  }

  img {
    height: 100%;
  }
}
</style>
