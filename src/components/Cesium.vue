<template>
  <div id="cesium">
    <div id="viewerContainer"></div>
  </div>

  <div id="CesiumMenuContainer" @contextmenu.prevent
    :style="{ top: cesiumMenuData.y + 'px', left: cesiumMenuData.x + 'px' }" v-if="cesiumMenuData.show">
    <div id="CesiumMenu" class="">
      <ul>
        <li @click="patrol"><button>巡邏</button></li>
        <li>經度 : {{ cesiumMenuData.longitude }}</li>
        <li>緯度 : {{ cesiumMenuData.latitude }}</li>
        <li>高度 : {{ cesiumMenuData.height }}</li>
      </ul>
    </div>
  </div>


</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import * as Cesium from "cesium";
import { settings, hidePanel, hideSpace, hideEarth, tagsArray } from "@/assets/javascript/cesiumSetting"
import { useStore } from "vuex";

const store = useStore();

const currentModel = computed(() => store.getters.CURRENT_MODEL);
const cesiumMenuData = ref({
  show: false,
  x: 0,
  y: 0,
  longitude: 0,
  latitude: 0,
  height: 0
});

onMounted(() => {
  initial();
});

async function initial() {
  window.viewer = await addViewer("viewerContainer"); // 宣告 cesium viewer 實例
  await addGLTF();
  // await add3DTiles();
  tagsArray.forEach((tag) => {
    addLabel(tag);
    addBillBoard(tag);
    addMouseClickListeners();
  });
}

// 建立 viewer
async function addViewer(container) {
  Cesium.Ion.defaultAccessToken = settings.viewer.ionDefaultAccessToken; // ion token
  const viewerConfig = settings.viewer.showEarth === true ? { ...hidePanel, ...hideSpace } : { ...hidePanel, ...hideSpace, ...hideEarth }; // 加入需要的 viewer 設定
  const viewer = new Cesium.Viewer(container, viewerConfig); // 套用 viewer 設定
  viewer.scene.backgroundColor = Cesium.Color[settings.viewer.backgroundColor]; // 移除太空底圖後的背景顏色
  viewer.scene.screenSpaceCameraController.maximumZoomDistance = settings.viewer.maximumZoomDistance || 10000000; // 限制視點的最遠距離
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = settings.viewer.minimumZoomDistance || 0; // 限制視點的最近距離
  // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 使用 2.5D 模式

  /* 使用 google 地圖時, 關閉 bing 地圖, 可加快載入 */
  if (settings.viewer.useGoogleMap) {
    viewer.scene.terrainProvider = true;
    viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2275207) // remote model
    );
  }
  return viewer;
}

/* glTF 模型 */
async function addGLTF() {
  const camera = settings.camera;
  const model = settings.model;

  try {
    const coordinate = model.coordinateArray
    let MODEL_URI = undefined;
    let entity = undefined;

    for (let i = 0; i < model.ModalArray.length; i++) {
      if (currentModel.value === "" || currentModel.value === model.ModalArray[i]) {
        console.log(currentModel.value)
        console.log(model.ModalArray[i])
        console.log(currentModel.value === model.ModalArray[i])
      }
      if (currentModel.value === "" || currentModel.value === model.ModalArray[i]) { // 切換模型
        if (model.modelType === "local") { // local model
          MODEL_URI = `/gltf/${model.ModalArray[i]}.gltf`;
        } else if (model.modelType === "ion") { // ion model
          MODEL_URI = await Cesium.IonResource.fromAssetId(model.ModalArray[i]);
        }
      };

      const position = Cesium.Cartesian3.fromDegrees(coordinate[i].x, coordinate[i].y, coordinate[i].z);
      const heading = Cesium.Math.toRadians(coordinate[i].h);
      const pitch = Cesium.Math.toRadians(coordinate[i].p);
      const roll = Cesium.Math.toRadians(coordinate[i].r);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));
      entity = viewer.entities.add({
        position: position,
        orientation: orientation,
        model: { uri: MODEL_URI }
      });
    }

    /* 鏡頭使用 模型/座標 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomTo === "model" || !settings.viewer.showEarth) {
      viewer.trackedEntity = entity;
    } else if (camera.zoomTo === "coordinate") {
      const destination = Cesium.Cartesian3.fromDegrees(camera.x, camera.y, camera.z); // zoom 的位置, 可以是 model / Cartesian座標
      const orientation = new Cesium.HeadingPitchRange(camera.h, camera.p, camera.r);
      viewer.camera[camera.zoomType]({
        destination: destination,
        orientation: orientation,
      });
    }
  } catch (error) {
    console.log(`[addGLTF() ERROR] : ${error}`);
  }
}

// 加載 label
function addLabel(tag) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(tag.x, tag.y, tag.z), // 實際與地面距離
    label: {
      text: tag.label,
      font: "24px Helvetica",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -50), // 與 billborad 距離
    },
  });
}

// 加載 billBoard
function addBillBoard(tag) {
  viewer.entities.add(
    {
      position: Cesium.Cartesian3.fromDegrees(tag.x, tag.y, tag.z), // 實際與地面距離
      billboard: {
        image: tag.billboard,
        scale: 0.05,
        color: Cesium.Color.WHITE,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
    });
}

// 滑鼠左右點擊事件
function addMouseClickListeners() {
  const clickListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // left click
  clickListener.setInputAction((click) => {
    cesiumMenuData.value.show = false;
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // right click 顯示 X,Y,Z,H,P,R
  clickListener.setInputAction(async (movement) => {
    const { x, y } = movement.position;
    const cartesian = viewer.scene.pickPosition(movement.position);
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height < 0 ? 0 : cartographic.height;
    cesiumMenuData.value = {
      show: false,
      x: x,
      y: y,
      longitude: longitude,
      latitude: latitude,
      height: height
    };
    nextTick(() => {
      cesiumMenuData.value.show = true;
    });
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

async function patrol() {
  cesiumMenuData.value.show = false;

  const patrol = settings.patrol;
  const destination = Cesium.Cartesian3.fromDegrees(patrol.coordinate.x, patrol.coordinate.y, patrol.coordinate.z);
  const orientation = new Cesium.HeadingPitchRange(1.55, 0, 0);

  // 設定 patrol 初始位置
  viewer.camera.setView({
    destination: destination,
    orientation: orientation,
  });

  for (const spot of patrol.route) {
    await rotateCamera(spot[0]);
    await moveForward(spot[1]);
  }
}

function rotateCamera(angle) {
  return new Promise((resolve, reject) => {
    let rotated = 0;
    const rotateStep = angle / 300; // 每次旋轉多少 (數字越大旋轉速度越慢)
    const rotationInterval = setInterval(() => {
      viewer.camera.lookLeft(Cesium.Math.toRadians(rotateStep));
      rotated += rotateStep;
      if (Math.abs(rotated) >= Math.abs(angle)) {
        clearInterval(rotationInterval);
        resolve();
      }
    }, 10); // 隔多少毫秒旋轉一次 (數字越大越不流暢)
  });
}

function moveForward(distance) {
  return new Promise((resolve, reject) => {
    let sCounter = 0;
    const moveInterval = setInterval(() => {
      viewer.camera.moveForward(1); // 每次移動多少 (數字越大移動距離越遠)
      sCounter++;
      if (sCounter >= distance) {
        clearInterval(moveInterval);
        resolve();
      }
    }, 50); // 隔多少毫秒移動一次 (數字越大越不流暢)
  });
}

/* Forbidden */
/* 3D Tiles 模型 */
/* ion 資源：模型大小，角度，縮放在 cesium ion 上設定 */
async function add3DTiles() {
  try {
    const camera = settings.camera;
    let primitives = undefined;
    let destination = undefined;
    let orientation = new Cesium.HeadingPitchRange(camera.h, camera.p, camera.r);

    /* 使用 local/ion 模型 */
    /* 請在 cesiumConfig.js 設定 */
    if (settings.model.modelType === "local") { // local model
      for (const model of settings.model.localModalArray) {
        if (currentModel.value === "" || model.name === currentModel.value) { // 切左換模型/顯示全部模型
          const tileset = await Cesium.Cesium3DTileset.fromUrl(`/3DTiles/${model.name}/tileset.json`); // 從 URL 加載 3D Tiles 數據
          primitives = viewer.scene.primitives.add(tileset); // 將加載的數據集添加到 Cesium 的場景中的 primitives 物件
          const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center); // cartographic ＝ 模型邊界盒中心點轉換成的經度、緯度、高度 (模型原始位置) 
          const original = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0); // original = cartographic 轉換成的笛卡兒座標
          const offset = Cesium.Cartesian3.fromDegrees(model.x, model.y, model.z); // offset = 計算新的偏移的笛卡兒坐標
          const translation = Cesium.Cartesian3.subtract(offset, original, new Cesium.Cartesian3()); // translation = 從原始位置到新位置的位移向量
          tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation); // 套用 translation
        };
      }
    } else if (settings.model.modelType === "ion") { // ion model
      for (const model of settings.model.ionModalArray) {
        primitives = viewer.scene.primitives.add(
          await Cesium.Cesium3DTileset.fromIonAssetId(model)
        );
      }
    }

    /* 鏡頭使用 模型/座標 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomTo === "model" || !settings.viewer.showEarth) {
      destination = primitives.boundingSphere.center; // 3D Tileset 包圍盒的中心位置
    } else if (camera.zoomTo === "coordinate") {
      destination = Cesium.Cartesian3.fromDegrees(camera.x, camera.y, camera.z); // zoom 的位置, 可以是 model / Cartesian座標
    }

    /* 鏡頭使用 set/fly 方法移動 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomType === "setView") {
      let offset = primitives.boundingSphere.radius * camera.setOffset
      viewer.camera.setView({
        destination: destination,
        orientation: orientation,
      });
      viewer.camera.moveBackward(offset); // 向後移動相機，設定距離
    } else if (camera.zoomType === "flyTo") {
      /* Cartesian3 相加函數 */
      /* 3D Tileset 包圍盒的中心位 + offset */
      destination = Cesium.Cartesian3.add(
        destination,
        new Cesium.Cartesian3(camera.flyOffset[0], camera.flyOffset[1], camera.flyOffset[2]),
        new Cesium.Cartesian3() // 這個參數不要刪除, 可提高效能
      );
      await viewer.scene.camera.flyTo({
        destination: destination,
        orientation: orientation,
        duration: camera.flyDuration,
      });
    }

  } catch (error) {
    console.log(`[add3DTiles() ERROR] : ${error}`);
  }
}

</script>

<style lang="scss" scoped>
#cesium {
  height: 100%;
  overflow: hidden;
  // border: 1px solid red;
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
  animation-duration:  0.25s;
  animation-fill-mode: forwards;
  //  linear infinite;
}
</style>