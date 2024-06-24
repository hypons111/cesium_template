<template>
  <!-- 左上角 dropdown menu -->
  <div id="leftAside" class="aside">
    <el-select class="el_select" v-model="value" :placeholder="placeholder" @change="switchModel(this)">
      <el-option v-for="item in leftAsideOptions" :key="item.label" :label="item.label" :value="item.label"
        class="el_option">
      </el-option>
    </el-select>
  </div>

  <!-- 右上角 button group -->
  <div id="rightAside" class="aside">
    <button @click="resetCamera"><font-awesome-icon :icon="['fas', 'door-closed']" />重設</button>
    <button @click="patrolHandler"><font-awesome-icon :icon="['fas', 'door-closed']" />巡邏</button>
  </div>

  <!-- cesium -->
  <div id="cesium">
    <div id="viewerContainer"></div>
  </div>

  <!-- 點位 popup modal -->
  <div id="modalContainer" v-if="MODAL_STATUS.IS_SHOW">
    <Modal />
  </div>

  <!-- 滑鼠右鍵 panel -->
  <div id="CesiumMenuContainer" @contextmenu.prevent
    :style="{ top: cesiumMenuData.y + 'px', left: cesiumMenuData.x + 'px' }" v-if="cesiumMenuData.show">
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
import Modal from "@/components/Modal.vue"
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex"
import { cesiumMenuData, initialCesium, patrolHandler, resetCamera, addRectangleEntity, addCircleEntity } from '@/assets/javascript/cesiumUtils';
import { settings } from "@/assets/javascript/cesiumSettings"

const store = useStore();
const placeholder = computed(() => store.getters.CURRENT_MODEL);
const allModel = store.getters.ALL_MODEL;
const leftAsideOptions = ref([]);
const MODAL_STATUS = computed(() => store.getters.MODAL_STATUS);

onMounted(async () => {
  await initialCesium();
  await fetchModelList();
});

function fetchModelList() {
  leftAsideOptions.value.push({ label: allModel });
  settings.model.ModalArray.forEach(({ label, fileName }) => {
    leftAsideOptions.value.push({
      label: label,
      fileName: fileName
    })
  })
}

function switchModel(t) {
  if (t.value === allModel) {
    store.commit("SET_CURRENT_MODEL", allModel);
  } else {
    const currentModel = settings.model.ModalArray.filter(({ label }) => label === t.value)[0];
    store.commit("SET_CURRENT_MODEL", currentModel.label);
  }
}
</script>

<style lang="scss" scoped>
#cesium {
  height: 100%;
  overflow: hidden;
}

// ceiusm view
:deep#viewerContainer {
  height: 100%;

  * {
    width: 100%;
    height: 100%;
  }
}

#modalContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.aside {
  width: 25em;
  height: 3em;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5em;
}

#leftAside {
  top: 0;
  left: 0;

  ::v-deep .el-select__wrapper {
    height: 2.25rem;
    font-size: 1em;
    font-weight: bold;
    box-shadow: none;
    background-color: rgba(var(--BLACK), 0.5);
    border: 2px solid rgb(var(--CYAN));
    border-radius: 0.25em;

    * {
      color: rgb(var(--CYAN));
    }
  }
}

#rightAside {
  top: 0;
  right: 0;
  justify-content: flex-start;

  button {
    height: 2.25rem;
    color: rgb(var(--CYAN));
    padding: 0.5em;
    margin-left: 1em;
    background-color: rgba(var(--BLACK), 0.5);
    border: 2px solid rgb(var(--CYAN));
    border-radius: 0.25em;
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