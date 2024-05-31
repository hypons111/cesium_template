import BLUE_TAG from "@/assets/image/blue.png";
import BROWN_TAG from "@/assets/image/brown.png";

const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU",
    showEarth: true,
    backgroundColor: "BLACK",
    useGoogleMap: false,
    maximumZoomDistance: 10000000,
    minimumZoomDistance: 10
  },

  model: {
    modelType: "local",
    // ModalArray: [ 2597627, 2597631, 2597632, 2597644, 2597646, ],
    ModalArray: [ 1, 2 ],
    modelSettingArray: [
      {
        x: 121.6,
        y: 25.055,
        z: 0,
        h: 0,
        p: 0,
        r: 0,
        s: 2
      },
      {
        x: 121.6,
        y: 25.055,
        z: 0,
        h: 0,
        p: 0,
        r: 0,
        s: 1
      },
      {
        x: 121.6,
        y: 25.055,
        z: 0,
        h: 0,
        p: 0,
        r: 0,
        s: 1
      },
      {
        x: 121.6,
        y: 25.055,
        z: 0,
        h: 0,
        p: 0,
        r: 0,
        s: 1
      },
      {
        x: 121.6,
        y: 25.055,
        z: 0,
        h: 0,
        p: 0,
        r: 0,
        s: 1
      },
    ]
  },

  camera: {
    zoomType: "setView",
    zoomTo: "coordinate",
    x: 121.599,
    y: 25.05,
    z: 500,
    h: 0,
    p: -0.75,
    r: 0,
    flyDuration: 2, 
    /* Forbidden */
    // setOffset: 100, // set 專用 offset 鏡頭 offset 距離
    // flyOffset: [0, 0, 0], // fly 專用 offset 鏡頭 offset 距離
  },

  patrol: {
    /* 巡邏起點座標 */
    coordinate: {
      x: 121.59,
      y: 25.056,
      z: 2,
      h: 1.55,
      p: 0,
      r: 0,
    },

    /* 巡邏點 */
    route: [
      [0, 50], 
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
