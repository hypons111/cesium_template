const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNmNjZDdjOS05ZmFhLTQ3NTItOTI5OS00NDMzN2Y0MzQwMTIiLCJpZCI6MjIxNjQ5LCJpYXQiOjE3MTgxNjIxMTV9.8N1NuOLwQDadOEF4X0m2z9SiTCR0e5OFYWUNV5WWU1U",
    showEarth: false,
    backgroundColor: "BLACK",
    useGoogleMap: false,
    maximumZoomDistance: 10000000,
    minimumZoomDistance: 10,
  },

  model: {
    modelType: "ion",
    ModalArray: [
      {
        label: "1F",
        fileName: "2618078",
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      // {
      //   label: "1M",
      //   fileName: "2618079",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "2F",
      //   fileName: "2618080",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "3F",
      //   fileName: "2618081",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "4F",
      //   fileName: "2618082",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "RF",
      //   fileName: "2618083",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "B1",
      //   fileName: "2618084",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // },
      // {
      //   label: "B2",
      //   fileName: "2618085",
      //   x: 121.5997116931,
      //   y: 25.0561982235,
      //   z: 0,
      //   h: 61,
      //   p: 0,
      //   r: 0,
      //   s: 3,
      // }
    ],
  },

  camera: {
    zoomType: "setView",
    zoomTo: "coordinate",
    x: 121.5997,
    y: 25.0537,
    z: 100,
    h: 0,
    p: -0.25,
    r: 0,
    flyDuration: 2,
    /* Forbidden */
    // setOffset: 100, // set 專用 offset 鏡頭 offset 距離
    // flyOffset: [0, 0, 0], // fly 專用 offset 鏡頭 offset 距離
  },

  patrol: {
    /* 巡邏起點座標 */

    x: 121.59,
    y: 25.056,
    z: 2,
    h: 1.55,
    p: 0,
    r: 0,

    /* 巡邏點 */
    route: [
      [0, 50],
      [90, 25],
      [-90, 10],
      [0, 50],
    ],
  },

  entity: {
    rectangleArray: [
      {
        w: 121.58,
        s: 25.04,
        e: 121.59,
        n: 25.059,
        opacity: 0.5,
        color: "GREEN",
      },
      {
        w: 121.59,
        s: 25.05,
        e: 121.6,
        n: 25.06,
        opacity: 0.5,
        color: "BLUE",
      },
    ],
    circleArray: [
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 50,
        length1: 100,
        length2: 100,
        opacity: 0.5,
        color: "RED",
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 100,
        length1: 100,
        length2: 100,
        opacity: 0.5,
        color: "PURPLE",
      },
    ],
  },

  other: {
    useHover: true,
  },
};

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

export { settings, hidePanel, hideSpace, hideEarth };
