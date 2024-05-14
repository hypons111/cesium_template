<template>
  <div id="cesium">
    <button id="patrolBtn" @click="patrol()">Patrol</button>
    <div id="viewerContainer"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
import { _3DTilesArray, _3DTilesSettings, tagsArray, patrolSpotsArray } from "@/assets/config/cesiumConfig"

onMounted(() => {
  initial();
});

async function initial() {
  window.viewer = await addViewer("viewerContainer"); // 宣告 cesium viewer 實例
  // await addGLTF();
  await add3DTiles();
  tagsArray.forEach((tag) => {
    addLabel(tag);
    addBillBoard(tag);
    addMouseClickListeners();
  });
}

// 建立 viewer
function addViewer(container) {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU";

  const viewer = new Cesium.Viewer(container, {
    // imageryProvider:  false, // 是否顯示地球圖片
    animation: false, // 是否顯示動畫控件
    baseLayerPicker: false, // 是否顯示基礎圖層選擇器
    creditContainer: document.createElement("div"), // 將多餘嘅圖示同文字放入一個唔存在嘅 div, 咁就可以以移除呢堆嘢
    contextOptions: { webgl: { alpha: true } }, // 加呢段先可以設定背景顏色為透明
    fullscreenButton: false, // 是否顯示全屏按鈕
    geocoder: false, // 是否顯示地理編碼器
    homeButton: false, // 是否顯示主頁按鈕
    infoBox: false, // 是否顯示信息框
    navigationHelpButton: false, // 是否顯示導航幫助按鈕
    navigationInstructionsInitiallyVisible: false, // 是否顯示導航說明
    requestRenderMode: true, // 啟用請求渲染模式
    sceneModePicker: false, // 是否顯示場景模式選擇器
    selectionIndicator: false, // 是否顯示選擇指示器
    timeline: false, // 是否顯示時間線
    vrButton: false, // 是否顯示 VR 按鈕
  });

  /* viewer.scene 設定 */
  viewer.scene.sun.show = false; // 是否顯示太陽
  viewer.scene.moon.show = false; // 是否顯示月亮
  viewer.scene.skyBox.show = false; // 是否顯示太空背景
  viewer.scene.skyAtmosphere.show = false; // 是否顯示大氣層
  viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT; // 背景顏色
  viewer.scene.globe.baseColor = Cesium.Color.WHITESMOKE; // 移除地球圖片後的地球顏色
  // viewer.scene.terrainProvider = true; // 移除地球
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 5000000; // 限制視點的最近距離
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000; // 限制視點的最遠距離
  // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 使用 2.5D 模式
  return viewer;
}

/* 3D Tiles 模型 */
/* ion 資源：模型大小，角度，縮放在 cesium ion 上設定 */
/* local 資源：模型大小，角度，縮放設定位置暫時不明 */
async function add3DTiles() {
  try {
    if (_3DTilesSettings.useGoogleMap) {
      viewer.scene.primitives.add(
        await Cesium.Cesium3DTileset.fromIonAssetId(2275207) // remote model
      );
    }

    // 定義初始鏡頭位置
    // const destination = Cesium.Cartesian3.fromDegrees(121.59867013890916, 25.045, 500); // TCT
    // const destination = Cesium.Cartesian3.fromDegrees(121.534, 25.2865, 350); // 漁港

    let destination = undefined;


    /* 載入模型的方法 */
    if (_3DTilesSettings.zoomModel.modelOrigin === "default") {
      const tileset = await Cesium.Cesium3DTileset.fromUrl('/3DTiles/New/tileset.json');
      destination = viewer.scene.primitives.add(tileset);
    } else if (_3DTilesSettings.zoomModel.modelOrigin === "ion") {
      for (const model of _3DTilesArray) {
        destination = viewer.scene.primitives.add(
          await Cesium.Cesium3DTileset.fromIonAssetId(model) // remote model
        );
      }
    }

    /* zoom 到模型的方法 */
    if (_3DTilesSettings.zoomModel.zoomType === "default") {
      const orientation = new Cesium.HeadingPitchRange(_3DTilesSettings.originCamera.h, _3DTilesSettings.originCamera.p, _3DTilesSettings.originCamera.r);
      viewer.zoomTo(destination, orientation);
    } else if (_3DTilesSettings.zoomModel.zoomType === "fly") {

      if (_3DTilesSettings.zoomToModel === true) {
        destination = destination.boundingSphere.center; // destination.boundingSphere.center 是 3D Tileset 包圍盒的中心位置
      } else {
        destination = Cesium.Cartesian3.fromDegrees(_3DTilesSettings.originCamera.x, _3DTilesSettings.originCamera.y, _3DTilesSettings.originCamera.z);
      }

      viewer.scene.camera.flyTo({
        destination: destination,
        orientation: _3DTilesSettings.originCamera,
        duration: 2,
      });
    }

  } catch (error) {
    console.log(`[add3DTiles() ERROR] : ${error}`);
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
async function addMouseClickListeners() {
  const clickListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // left click
  clickListener.setInputAction((click) => {
    console.log("LEFT CLICK");
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // right click 顯示 X,Y,Z,H,P,R
  clickListener.setInputAction((movement) => {
    const cartesian = viewer.scene.pickPosition(movement.position);
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height < 0 ? 0 : cartographic.height;
    console.log(
      `Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}`
    );
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

async function patrol() {
  const destination = Cesium.Cartesian3.fromDegrees(121.59, 25.056, 2);
  const orientation = new Cesium.HeadingPitchRange(1.55, 0, 0);

  // 設定 patrol 初始位置
  viewer.camera.setView({
    destination: destination,
    orientation: orientation,
  });

  for (const spot of patrolSpotsArray) {
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


/* glTF 模型 */
/* 停用 */
/* 適合只有模型時使用 */
/* 可使用本地資源 */
async function addGLTF() {
  try {
    // const MODEL_URI = await Cesium.IonResource.fromAssetId(2559040); // cesium ion model URL
    // const MODEL_URI = process.env.VUE_APP_GLTF_PATH + process.env.VUE_APP_GLTF_NAME; // 正式 model URL
    const MODEL_URI = process.env.VUE_APP_GLTF_PATH_LOCAL + process.env.VUE_APP_GLTF_NAME; // 本地 model URL
    const entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(121.5994799498, 25.056333648, 0),
      model: {
        uri: MODEL_URI,
      },
    });
    viewer.trackedEntity = entity;
    const destination = Cesium.Cartesian3.fromDegrees(
      121.59867013890916,
      25.045,
      500
    );
    const orientation = new Cesium.HeadingPitchRange(_3DTilesSettings.originCamera.h, _3DTilesSettings.originCamera.p, _3DTilesSettings.originCamera.r);
    viewer.zoomTo(entity, orientation);
  } catch (error) {
    console.log(`[addGLTF() ERROR] : ${error}`);
  }
}
</script>

<style lang="scss" scoped>
#cesium {
  height: 100%;
  overflow: hidden;
}

#cesium :deep(canvas) {
  width: 100%;
}

#patrolBtn {
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
