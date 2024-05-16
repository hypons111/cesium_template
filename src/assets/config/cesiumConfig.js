import BLUE_TAG from "@/assets/image/blue.png";
import BROWN_TAG from "@/assets/image/brown.png";



const settings = {
  viewer: {
    showEarth: true, // 是否顯示地球
    backgroundColor: "BLACK", // 要大寫, 要使用 Cesium.Color 可使用的顏色
  },

  model: {
    modelType: "local", // "local" / "ion"
    useGoogleMap: false, // 是否使用 ion google map

    // 要載入的 local 模型
    localModalArray : ["building", "floor"], // 暫時載入一個以上 local 模型會重疉顯示

    // 要載入的 ion 模型
    ionModalArray : [2557681, 2557680]
  },

  camera: {
    /* 座標 */
    coordinate: {
      // 富基漁港 x: 121.534, y: 25.284, z: 500,
      x: 121.598, // 數字大=向右移動, 只會在經度移動, 不會受視度影響
      y: 25.045,// 數字大=向下移動, 只會在緯度移動, 不會受視度影響
      z: 500, // 與地面距離
      h: 0, // heading 橫向視線角度
      p: -0.5, // pitch 緃向視線角度
      r: 0, // roll 地平線角度
    },
    
    zoomType: "fly", // "set" / "fly" /
    setOffset: 10, // set 專用 offset 鏡頭 offset 距離
    flyOffset: [-250, 500, -250], // fly 專用 offset 鏡頭 offset 距離
    flyDuration: 2, // fly 專用 flyTo 效果持續秒數

    
    /* "model" 鏡頭會自動切換到模型位置 */
    /* "coordinate" 鏡頭會切換到座標 */
    /* settings.showEarth = false 時會無視"coordinate", 切換到模型位置 */
    zoomTo: "model", // "model" / "coordinate"  
  },

  patrol: {
    /* 巡邏起點座標 */
    coordinate : {
      x: 121.59, // 數字大=向右移動, 只會在經度移動, 不會受視度影響
      y: 25.056, // 數字大=向下移動, 只會在緯度移動, 不會受視度影響
      z: 2, // 與地面距離
      h: 1.55, // heading 橫向視線角度
      p: 0, // pitch 緃向視線角度
      r: 0, // roll 地平線角度
    },
    
    /* [ 方向(正數轉左, 負數轉右) , 前進距離 ] */
    route : [
      [0, 50],
      [90, 25],
      [-90, 10]
    ]
  }
};

/* 設定 cesium viewer */
/* 用 settings 控制 */
const hideEarth = {
  /*  cesium 地圖 */
  imageryProvider: false, // 禁用影像圖層
  terrainProvider: false, // 禁用地形圖層
  globe: false, // 不顯示地球
  skyBox: false, // 不顯示天空盒 包括太陽,月亮
  skyAtmosphere: false, // 不顯示大氣層
};

/* 設定 cesium viewer */
/* 用 settings 控制 */
const hidePanel = {
  /* 隱藏 cesium panel */
  animation: false, // 隱藏動畫小部件
  baseLayerPicker: false, // 隱藏底圖選擇器
  fullscreenButton: false, // 隱藏全屏按鈕
  vrButton: false, // 顯示 VR 模式按鈕，預設為 false
  geocoder: false, // 隱藏地理編碼器
  homeButton: false, // 隱藏首頁按鈕
  infoBox: false, // 隱藏信息框
  sceneModePicker: false, // 隱藏場景模式切換按鈕
  selectionIndicator: false, // 隱藏選擇指示器
  timeline: false, // 隱藏時間軸
  navigationHelpButton: false, // 隱藏導航幫助按鈕
  navigationInstructionsInitiallyVisible: false, // 預設顯示導航說明，預設為 true
  creditContainer: document.createElement("div"), // 隱藏版權信息
};

/* label 是文字 */
/* billboard 是圖片，圖片要先用 `import from` 導入 */
const tagsArray = [
  {
    x: 121.61791056421559,
    y: 25.067130541767458,
    z: 0,
    label: "東湖",
    billboard: BROWN_TAG,
  },
  {
    x: 121.61596654608162,
    y: 25.060188554007564,
    z: 0,
    label: "南港軟體園區",
    billboard: BROWN_TAG,
  },
  {
    x: 121.61828397441555,
    y: 25.055329028162433,
    z: 0,
    label: "南港展覽館",
    billboard: BROWN_TAG,
  },
  {
    x: 121.6178118985649,
    y: 25.05530591177109,
    z: 0,
    label: "南港展覽館",
    billboard: BLUE_TAG,
  },
  {
    x: 121.6070957278744,
    y: 25.052002527071547,
    z: 0,
    label: "南港",
    billboard: BLUE_TAG,
  },
  {
    x: 121.59315689266104,
    y: 25.050461396738584,
    z: 0,
    label: "昆陽",
    billboard: BLUE_TAG,
  },
];

export { settings, hidePanel, hideEarth, tagsArray };
