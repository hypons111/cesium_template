import * as Cesium from "cesium";

const UTILS = {
  viewer : undefined,

  // 宣告 cesium viewer 實例
  setCesiumViewer : (container) => {
    UTILS.viewer = new Cesium.Viewer(container, {
      animation: false, // 不顯示動畫控件
      baseLayerPicker: false, // 不顯示基礎圖層選擇器
      fullscreenButton: false, // 不顯示全屏按鈕
      vrButton: false, // 不顯示 VR 按鈕
      geocoder: false, // 不顯示地理編碼器
      homeButton: false, // 不顯示主頁按鈕
      infoBox: false, // 不顯示信息框
      sceneModePicker: false, // 不顯示場景模式選擇器
      selectionIndicator: false, // 不顯示選擇指示器
      timeline: false, // 不顯示時間線
      navigationHelpButton: false, // 不顯示導航幫助按鈕
      navigationInstructionsInitiallyVisible: false, // 不顥示導航說明
      creditContainer: undefined, // 移除版權信息容器
      terrain: Cesium.Terrain.fromWorldTerrain(), // 使用後會使 billboard 在改變視角時移位
    });
    UTILS.viewer.scene.sun.show = false; // 移除太陽
    UTILS.viewer.scene.moon.show = false; // 移除月亮
    UTILS.viewer.scene.skyAtmosphere.show = false; // 移除大氣層
    UTILS.viewer.scene.skyBox = undefined; // 移除太空背景
    UTILS.viewer.scene.backgroundColor = Cesium.Color.BLACK; // 設定背景顏色
  },

  goToSpot : (x, y, z, zoom) => {
    // zoom = setView / flyTo
    UTILS.viewer.camera[zoom]({
      destination: Cesium.Cartesian3.fromDegrees(x, y, z),
    });
  }
}

export default UTILS;