import BLUE_TAG from "@/assets/image/blue.png";
import BROWN_TAG from "@/assets/image/brown.png";

/* cesium 設定步驟

  `viewer`
    1. `ionDefaultAccessToken` cesium ion 的 token (如果本地模型檔案就設為空字串) (建議每個要使用的專案都申請一個新的帳號)
    2. `showEarth` 是否顯示地球
    3. `backgroundColor` 背景顏色 (`showEarth===false` 時才會有效)
    4. `useGoogleMap` 是否使用 google map
    5. `maximumZoomDistance` 設定限制視點的最遠距離 (註解此屬性會使用預設值 : 10000000)
    6. `minimumZoomDistance` 設定限制視點的最近距離 (註解此屬性會使用預設值 : 0)

  `model`
    1. `modelType` 本地模型 / ion 模型
    2. `ModalArray` 要載入的模型 (格式參考下面例子)
    3. `coordinateArray` 每個載入的模型的位置和角度 (格式參考下面例子)

  `camera`
    1. `zoomType` 鏡頭移動到模型的方式
    2. `zoomTo`  鏡頭移動到模型 / 指定位置 (當`settings.showEarth===false` 時, 會無視"coordinate", 鏡頭會移動到模型)
    3.  鏡頭移動指定位置 
        `x` 只會在經度移動, 不會受視角度影響
        `y` 只會在緯度移動, 不會受視角度影響
        `z` 與地面距離
        `h` heading 橫向視線角度
        `p` pitch 緃向視線角度
        `r` roll 地平線角度
    4. `flyDuration` // flyTo 效果持續秒數

  `patrol`
    1. `coordinate` 巡邏出發的位置和視點
    2. `route` 巡邏的路徑
*/

const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU",
    showEarth: true, // true / false
    backgroundColor: "GRAY", // 要大寫, 要使用 Cesium.Color 可使用的顏色
    useGoogleMap: false, // true / false //是否使用 ion google map
    maximumZoomDistance: 10000000, // 數值 / 註解
    minimumZoomDistance: 100 // 數值 / 註解
  },

  model: {
    modelType: "local", // "local" / "ion"
    ModalArray: [1, 2], // 本地模型 : [ 檔案名.gltf , 檔案名.gltf , 檔案名.gltf] / ion 模型 : [ Assets.ID , Assets.ID , Assets.ID]
    coordinateArray: [
      {
        x: 121.599, // 經度 數字大=模型向右移動, 只會在經度移動, 不會受視度影響
        y: 25.055, // 緯度 數字大=模型向下移動, 只會在緯度移動, 不會受視度影響
        z: 0, // 高度 
        h: 0, // heading 模型橫向角度  // 正數=逆時針，負數=順時針
        p: 0, // pitch 模型緃向角度
        r: 0, // roll 模型地平線角度
      },
      {
        x: 121.597,
        y: 25.055,
        z: 0,
        h: 0,
        p: -0.5,
        r: 0.5,
      },
    ]
  },

  camera: {
    zoomType: "flyTo", // "setView" / "flyTo" /
    zoomTo: "model", // "model" / "coordinate"
    x: 121.59, // 經度 數字大=鏡頭向右移動, 只會在經度移動, 不會受視度影響
    y: 25.05, // 緯度 數字大=鏡頭向下移動, 只會在緯度移動, 不會受視度影響
    z: 500, // 高度 
    h: 0, // heading 鏡頭橫向角度
    p: -0.75, // pitch 鏡頭緃向角度
    r: 0, // roll 鏡頭地平線角度
    flyDuration: 2, 
    /* Forbidden */
    // setOffset: 100, // set 專用 offset 鏡頭 offset 距離
    // flyOffset: [0, 0, 0], // fly 專用 offset 鏡頭 offset 距離
  },

  patrol: {
    /* 巡邏起點座標 */
    coordinate: {
      x: 121.59, //  經度 數字大=鏡頭向右移動, 只會在經度移動, 不會受視度影響
      y: 25.056, // 緯度 數字大=鏡頭向下移動, 只會在緯度移動, 不會受視度影響
      z: 2, // 與地面距離
      h: 1.55, // heading 鏡頭橫向角度
      p: 0, // pitch 鏡頭緃向角度
      r: 0, // roll 鏡頭地平線角度
    },

    /* 巡邏點 */
    route: [
      [0, 50], // /* [ 方向(正數轉左, 負數轉右) , 前進距離 ] */
      [90, 25],
      [-90, 10],
    ],
  },
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


/* cesium viewer 內部設定*/
/* 地球 */
const hideEarth = {
  imageryProvider: false, // 禁用影像圖層
  terrainProvider: false, // 禁用地形圖層
  globe: false, // 不顯示地球
};

/* 太空 */
const hideSpace = {
  skyBox: false, // false / 註解
};

/* Panel */
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


export { settings, hidePanel, hideSpace, hideEarth, tagsArray };
