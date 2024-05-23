import BLUE_TAG from "@/assets/image/blue.png";
import BROWN_TAG from "@/assets/image/brown.png";

/*
  `viewer`
    1. `showEarth` 設定是否顯示地球
    2. 如果不顯示地球可以用 `backgroundColor` 設定背景顏色

  `model`
    1. `useGoogleMap` 設定是否使用 google map
    2. `modelType` 設定模型來源 
    3.a `localModalArray` // 每個模型都要獨立的屬性數值物件 (參考下面范例)
    3.b `ionModalArray`  // 只需要提供模型 id，各種屬性數值都在 ion 上設定

    `viewer`
    1.  `zoomTo`: "coordinate"，`flyOffsety` 就用 [0, 0, 0]
*/

const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU",
    showEarth: true, // true / false
    backgroundColor: "GRAY", // 要大寫, 要使用 Cesium.Color 可使用的顏色
    useGoogleMap: false, // true / false //是否使用 ion google map
    // minimumZoomDistance: 100, // 限制視點的最近距離
    // maximumZoomDistance: 100000 // 限制視點的最遠距離
  },

  model: {
    
    modelType: "local", // "local" / "ion"

    ModalArray: [1, 2], // ion ID / .glTF 檔名 
    
    coordinateArray: [
      {
        x: 121.598,
        y: 25.055,
        z: 0,
        h: 0, // heading 橫向視線角度  // 正數=逆時針，負數=順時針
        p: 0, // pitch 緃向視線角度
        r: 0, // roll 地平線角度
      },
      {
        x: 121.597,
        y: 25.055,
        z: 0,
        h: 0, // heading 橫向視線角度
        p: -0.5, // pitch 緃向視線角度
        r: 0.5, // roll 地平線角度
      },
    ]
  },

  camera: {
    zoomType: "setView", // "setView" / "flyTo" /

    /* "model" 鏡頭會自動切換到模型位置 */
    /* "coordinate" 鏡頭會切換到座標 */
    /* settings.showEarth = false 時會無視"coordinate", 切換到模型位置 */
    zoomTo: "coordinate", // "model" / "coordinate"

    /* 座標 */
    x: 121.598, // 數字大=向右移動, 只會在經度移動, 不會受視度影響
    y: 25.05, // 數字大=向下移動, 只會在緯度移動, 不會受視度影響
    z: 500, // 與地面距離
    h: 0, // heading 橫向視線角度
    p: -0.75, // pitch 緃向視線角度
    r: 0, // roll 地平線角度


    setOffset: 100, // set 專用 offset 鏡頭 offset 距離
    flyOffset: [0, 0, 0], // fly 專用 offset 鏡頭 offset 距離
    flyDuration: 2, // fly 專用 flyTo 效果持續秒數
  },

  patrol: {
    /* 巡邏起點座標 */
    coordinate: {
      x: 121.59, // 數字大=向右移動, 只會在經度移動, 不會受視度影響
      y: 25.056, // 數字大=向下移動, 只會在緯度移動, 不會受視度影響
      z: 2, // 與地面距離
      h: 1.55, // heading 橫向視線角度
      p: 0, // pitch 緃向視線角度
      r: 0, // roll 地平線角度
    },

    /* [ 方向(正數轉左, 負數轉右) , 前進距離 ] */
    route: [
      [0, 50],
      [90, 25],
      [-90, 10],
    ],
  },
};

/* 設定 cesium viewer */
/* 用 settings 控制 */
const hideEarth = {
  /* cesium 地圖 */
  imageryProvider: false, // 禁用影像圖層
  terrainProvider: false, // 禁用地形圖層
  globe: false, // 不顯示地球
};

const hideSpace = {
  skyBox: false, // 太陽, 月亮 // false / 註解
  // skyAtmosphere: false, // 大氣層 // false / 註解
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

export { settings, hidePanel, hideSpace, hideEarth, tagsArray };
