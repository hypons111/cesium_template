<template>
  <div id="cesium">
    <button id="patrolBtn" @click="patrol()">Patrol</button>
    <div id="viewerContainer"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
import { settings, hidePanel, hideEarth, tagsArray } from "@/assets/config/cesiumConfig"

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
    // addMouseClickListeners();
  });
}

// 建立 viewer
function addViewer(container) {
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU";

  const viewerConfig = settings.viewer.showEarth === true ? hidePanel : { ...hidePanel, ...hideEarth };

  const viewer = new Cesium.Viewer(container, viewerConfig);
  viewer.scene.backgroundColor = Cesium.Color[settings.viewer.backgroundColor]; // 移除太空底圖後的背景顏色
  // viewer.scene.globe.baseColor = Cesium.Color.BLACK; // 移除地球底圖後的地球顏色
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 5000000; // 限制視點的最近距離
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000; // 限制視點的最遠距離
  // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 使用 2.5D 模式

  /* 使用 google 地圖時, 關閉 bing 地圖, 可加快載入 */
  if (settings.model.useGoogleMap) {
    viewer.scene.terrainProvider = settings.model.useGoogleMap;
  }
  return viewer;
}

/* 3D Tiles 模型 */
/* ion 資源：模型大小，角度，縮放在 cesium ion 上設定 */
/* local 資源：模型大小，角度，縮放設定位置暫時不明 */
async function add3DTiles() {
  try {
    const camera = settings.camera;
    let primitives = undefined;
    let destination = undefined;
    let orientation = new Cesium.HeadingPitchRange(camera.coordinate.h, camera.coordinate.p, camera.coordinate.r);

    /* 是否使用 google map */
    /* 請在 cesiumConfig.js 設定 */
    if (settings.useGoogleMap) {
      viewer.scene.primitives.add(
        await Cesium.Cesium3DTileset.fromIonAssetId(2275207) // remote model
      );
    }

    /* 使用 本地/ion 模型 */
    /* 請在 cesiumConfig.js 設定 */
    if (settings.model.modelType === "local") {
      for (const model of settings.model.localModalArray) {
        const tileset = await Cesium.Cesium3DTileset.fromUrl(`/3DTiles/${model.name}/tileset.json`); // local model
        primitives = viewer.scene.primitives.add(tileset);

        const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
        const original = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        const offset = Cesium.Cartesian3.fromDegrees(model.x, model.y, model.z);
        const translation = Cesium.Cartesian3.subtract(offset, original, new Cesium.Cartesian3());

        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

      };
    } else if (settings.model.modelType === "ion") {
      for (const model of settings.model.ionModalArray) {
        primitives = viewer.scene.primitives.add(
          await Cesium.Cesium3DTileset.fromIonAssetId(model) // ion model
        );
      }
    }

    /* 鏡頭使用 模型/座標 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomTo === "model") {
      destination = primitives.boundingSphere.center; // 3D Tileset 包圍盒的中心位置
    } else if (camera.zoomTo === "coordinate") {
      destination = Cesium.Cartesian3.fromDegrees(camera.coordinate.x, camera.coordinate.y, camera.coordinate.z); // zoom 的位置, 可以是 model / Cartesian座標
    }

    /* 鏡頭使用 set/fly 方法移動 */
    /* 請在 cesiumConfig.js 設定 */
    if (camera.zoomType === "set") {
      let offset = primitives.boundingSphere.radius * camera.setOffset
      viewer.camera.setView({
        destination: destination,
        orientation: orientation,
      });
      viewer.camera.moveBackward(offset); // 向後移動相機，設定距離
    } else if (camera.zoomType === "fly") {
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
    const orientation = new Cesium.HeadingPitchRange(camera.h, camera.p, camera.r);
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
