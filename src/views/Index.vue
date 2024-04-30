<template>
  <div id="rootContainer">
    <div id="headerContainer">
      <Header />
    </div>
    <div id="leftContainer"></div>
    <div id="cesiumContainer">
      <Cesium />
    </div>
    <div id="rightContainer">
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
import Cesium from "@/components/Cesium.vue"
import Footer from "@/components/Footer.vue"
</script>

<style lang="scss" scoped>
#rootContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  #headerContainer {
    width: 100%;
    position: absolute;
  }

  #leftContainer {
    position: absolute;
    left: 0;
  }
  
  #cesiumContainer {
    height: 100%;
  }
  
  #rightContainer {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }

  #footerContainer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>