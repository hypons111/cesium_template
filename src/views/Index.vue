<template>
  <div id="rootContainer">
    <div id="headerContainer">
      <Header />
    </div>

    <div id="mainContainer">
      <Cesium :key="currentModel" v-if="currentSection !== 'section2'" />
      <!-- <Heatmap :key="currentModel" v-if="currentSection === 'section1'" /> -->
      <Table v-if="currentSection === 'section2'" />
    </div>

    <div id="modalContainer" v-if="MODAL_STATUS.IS_SHOW">
      <Modal />
    </div>

    <div id="leftContainer">
      <LeftPanel v-if="currentSection === 'section3'" />
    </div>

    <div id="rightContainer">
      <RightPanel v-if="currentSection === 'section3' || currentSection === 'section4'" />
    </div>

    <div id="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import Header from "@/components/Header.vue"
import LeftPanel from "@/components/LeftPanel.vue"
import RightPanel from "@/components/RightPanel.vue"
import Cesium from "@/components/Cesium.vue"
import Modal from "@/components/Modal.vue"
import Table from "@/components/Table.vue"
import Footer from "@/components/Footer.vue"

const store = useStore();
const currentSection = computed(() => store.getters.CURRENT_SECTION);
const currentModel = computed(() => store.getters.CURRENT_MODEL); // 讓 vue 知道要更新 <Cesium />
const MODAL_STATUS = computed(() => store.getters.MODAL_STATUS);

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
  }

  #mainContainer {
    height: 100%;
  }

  #modalContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #leftContainer {
    position: absolute;
    top: 50%;
    left: 0.5em;
    transform: translate(0, -50%);
  }

  #rightContainer {
    position: absolute;
    top: 50%;
    right: 0.5em;
    transform: translate(0, -50%);
  }

  #footerContainer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>