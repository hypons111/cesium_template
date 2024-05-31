<template>
  <!-- cesium 容器 -->
  <div id="cesium">
    <div id="viewerContainer"></div>
  </div>

  <!-- 滑鼠右鍵 panel -->
  <div 
    id="CesiumMenuContainer" 
    @contextmenu.prevent
    :style="{ top: cesiumMenuData.y + 'px', left: cesiumMenuData.x + 'px' }" v-if="cesiumMenuData.show"
  >
    <div id="CesiumMenu" class="">
      <ul>
        <li @click="resetCamera"><button>重設視點</button></li>
        <li @click="patrolHandler"><button>巡邏</button></li>
        <li>經度 : {{ cesiumMenuData.longitude }}</li>
        <li>緯度 : {{ cesiumMenuData.latitude }}</li>
        <li>高度 : {{ cesiumMenuData.height }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { cesiumMenuData, initialCesium, patrolHandler, resetCamera } from '@/assets/javascript/cesiumUtils';

onMounted(() => {
  initialCesium();
});
</script>

<style lang="scss" scoped>
#cesium {
  height: 100%;
  overflow: hidden;
}

:deep#viewerContainer {
  height: 100%;

  * {
    width: 100%;
    height: 100%;
  }
}

@keyframes showMenu {
  0% {
    height: 0;
  }
  100% {
    height: 20em;
  }
}

#CesiumMenuContainer {
  position: absolute;
  width: 15em;
  height: 0;
  z-index: 10;
  font-size: 1rem;
  background-color: rgb(var(--WHITE));
  border: 5px solid red;
  animation-direction: normal;
  animation-name: showMenu;
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
}
</style>