<template>
  <div id="rootContainer">
    <div id="headerContainer">
      <Header />
    </div>

    <div id="cesiumContainer">
      <!-- <Cesium /> -->
    </div>

    <div id="leftContainer">
      <LeftChartPanel />
    </div>

    <div id="rightContainer">
      <RightChartPanel />
      <!-- <Tree /> -->
    </div>

    <div id="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue"
import Tree from "@/components/Tree.vue"
import LeftChartPanel from "@/components/LeftChartPanel.vue"
import RightChartPanel from "@/components/RightChartPanel.vue"
import Cesium from "@/components/Cesium.vue"
import Footer from "@/components/Footer.vue"
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore();
const currentView = computed(() => store.getters.CURRENT_VIEW);


</script>

<style lang="scss" scoped>
#rootContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/image/background.png");

  #headerContainer {
    width: 100%;
    position: absolute;
    // border: 1px solid red;
  }

  #leftContainer {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    // border: 1px solid red;
  }

  #rightContainer {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }

  #cesiumContainer {
    height: 100%;
  }

  #footerContainer {
    width: 100%;
    position: absolute;
    bottom: 0;
    // border: 1px solid red;
  }
}
</style>