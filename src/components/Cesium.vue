<template>
  <div id="cesium">
    <!-- <button id="patrolBtn" @click="move1">rotata Left</button>
    <button id="patrolBtn" @click="move2">rotata Right</button> -->
    <div id="viewerContainer"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
import BLUE_TAG from "@/assets/image/blue.png"
import BROWN_TAG from "@/assets/image/brown.png"

const tempTagArray = [
  { x: 121.61791056421559, y: 25.067130541767458, z: 0, name: "東湖", type: BROWN_TAG },
  { x: 121.61596654608162, y: 25.060188554007564, z: 0, name: "南港軟體園區", type: BROWN_TAG },
  { x: 121.61828397441555, y: 25.055329028162433, z: 0, name: "南港展覽館", type: BROWN_TAG },
  { x: 121.6178118985649, y: 25.05530591177109, z: 0, name: "南港展覽館", type: BLUE_TAG },
  { x: 121.6070957278744, y: 25.052002527071547, z: 0, name: "南港", type: BLUE_TAG },
  { x: 121.59315689266104, y: 25.050461396738584, z: 0, name: "昆陽", type: BLUE_TAG }
]

onMounted(() => {
  initial();
})

async function initial() {
  window.viewer = await addViewer("viewerContainer"); // 宣告 cesium viewer 實例
  // await addGLTF(); 
  await add3DTiles();
  tempTagArray.forEach(tag => {
    // addLabel(tag);
    // addBillBoard(tag);
    addMouseClickListeners();
  })
}

// 建立 viewer
function addViewer(container) {
  Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU"

  const viewer = new Cesium.Viewer(container, {
    // imageryProvider: true, // 是否顯示地球圖片
    animation: false, // 是否顯示動畫控件
    baseLayerPicker: false, // 是否顯示基礎圖層選擇器
    creditContainer: document.createElement('div'), // 將多餘嘅圖示同文字放入一個唔存在嘅 div, 咁就可以以移除呢堆嘢
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
  // viewer.scene.terrainProvider = true; // 移除地球
  viewer.scene.sun.show = false; // 是否顯示太陽
  viewer.scene.moon.show = false; // 是否顯示月亮
  viewer.scene.skyBox.show = false; // 是否顯示太空背景
  viewer.scene.skyAtmosphere.show = false; // 是否顯示大氣層
  viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT // 背景顏色
  // viewer.scene.globe.baseColor = Cesium.Color.WHITESMOKE; // 移除地球圖片後的地球顏色
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 5000000; // 限制視點的最近距離
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000; // 限制視點的最遠距離
  // viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 使用 2.5D 模式

  return viewer;
}

/* glTF */
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
    const destination = Cesium.Cartesian3.fromDegrees(121.59867013890916, 25.045, 500);
    const orientation = new Cesium.HeadingPitchRange(0, -0.5, 1000);
    viewer.zoomTo(entity, orientation);
  } catch (error) {
    console.log(`[addGLTF() ERROR] : ${error}`);
  }
}

/* 3D Tiles */
/* 模型大小，角度，縮放都在 cesium ion 上設定 */
/* 暫時只可以使用 cesium ion 的資料，只適合開放外網的環境。 */
async function add3DTiles() {
  try {

    // 載入 google map
    // const googleMap = viewer.scene.primitives.add(
    //   await Cesium.Cesium3DTileset.fromIonAssetId(2275207) // remote model
    // );

    // 載入第一個模型
    const sample_1_3DTiles = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2557681) // remote model
    )

    // 載入第二個模型
    const sample_2_3DTiles = viewer.scene.primitives.add(
      await Cesium.Cesium3DTileset.fromIonAssetId(2557680) // remote model
    )

    // 定義初始鏡頭位置
    // const destination = Cesium.Cartesian3.fromDegrees(121.59867013890916, 25.045, 500); // TCT
    // const destination = Cesium.Cartesian3.fromDegrees(121.534, 25.2865, 350); // 漁港
    const orientation = new Cesium.HeadingPitchRange(0, -0.5, 1000);

    // 方法一 : flyTo 初始鏡頭位置
    // viewer.scene.camera.flyTo({
    //   destination: destination,
    //   orientation: orientation,
    //   duration: 2,
    // });

    // 方法二: zoomTo 模型
    viewer.zoomTo(sample_1_3DTiles, orientation);

    // patrolZoom();

  } catch (error) {
    console.log(`[add3DTiles() ERROR] : ${error}`);
  }
}

// 加載 label 
function addLabel(label) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(label.x, label.y, label.z), // 實際與地面距離
    label: {
      text: label.name,
      font: '24px Helvetica',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -50),  // 與 billborad 距離
    }
  });
}

// 加載 billBoard 
function addBillBoard(billBoard) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(billBoard.x, billBoard.y, billBoard.z), // 實際與地面距離
    billboard: {
      image: billBoard.type,
      scale: 0.05,
      color: Cesium.Color.WHITE,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    }
  });
}

// 滑鼠左右點擊事件
async function addMouseClickListeners() {
  const clickListener = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

  // left click
  clickListener.setInputAction(click => {
    console.log("LEFT CLICK");
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // right click 顯示 X,Y,Z,H,P,R
  clickListener.setInputAction(movement => {
    const cartesian = viewer.scene.pickPosition(movement.position)
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const height = cartographic.height < 0 ? 0 : cartographic.height;
    console.log(`Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}`);
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

const patrolRoute = {
  counter: 0,
  checkPoint: [
    {
      x: 121,   // Longitude(視點經度)：0本初子午線、正數向東、負數向西。
      y: 25,    // Latitude(視點緯度)：0赤道、正數向北、負數向南。
      z: 10000, // Zoom(視點縮放)：
      h: 180,   // Heading(視點水平角度)：0向北、90向東、180向南、270向西。
      p: 0,     // Pitch(視點水垂直角度)：0地平線、90向天、-90向地。
      r: 1      // Range(視點與目標之間距離)：
    },
    {
      x: 121,
      y: 25,
      z: 10000,
      h: 180,
      p: 0,
      r: 1
    },
  ]
}

function patrolZoom() {
  const x = 121.61791056421559; // longitude：0本初子午線、正數向東、負數向西。
  const y = 25.067130541767458; // latitude：0赤道、正數向北、負數向南。
  const z = 1; // 距離
  const h = 180; // 0向北、90向東、180向南、270向西。
  const p = 0; // 0地平線、90向天、-90向地。
  const r = 1; // 距離

  // Lock camera to a point
  const destination = Cesium.Cartesian3.fromDegrees(x, y, z);
  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(destination);
  viewer.scene.camera.lookAtTransform(transform, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(h), Cesium.Math.toRadians(p), r));

}
function move1() {
  const degrees = 15;
  viewer.scene.camera.rotate(viewer.scene.camera.up, Cesium.Math.toRadians(degrees));
  viewer.clock.onTick.addEventListener(clock => {
    // viewer.scene.camera.rotateRight(0.001);
    // viewer.scene.camera.moveForward(0.01);
  });
}
function move2() {
  const degrees = -15;
    viewer.scene.camera.rotate(viewer.scene.camera.up, Cesium.Math.toRadians(degrees));
    viewer.clock.onTick.addEventListener(clock => {
    // viewer.scene.camera.rotateRight(0.001);
    // viewer.scene.camera.moveForward(0.01);
  });
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
