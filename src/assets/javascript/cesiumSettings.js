const settings = {
  viewer: {
    ionDefaultAccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OTgwYjIyNS0xNzlmLTQ0YWQtODRhMy1iYTAxOGRkZDQyMmYiLCJpZCI6MTk2Mzk1LCJpYXQiOjE3MTQxNDkyMDJ9.jnx-ICcOXNgxlZjN97uY3Rpdm4l0rHan8neh3fhK6RU",
    showEarth: true,
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
        fileName: "2603591",
      },
      {
        label: "1M",
        fileName: "2603595",
      },
      {
        label: "2F",
        fileName: "2603597",
      },
      {
        label: "3F",
        fileName: "2603598",
      },
      {
        label: "4F",
        fileName: "2603599",
      },
      {
        label: "RF",
        fileName: "2603600",
      }
    ],
    modelSettingArray: [
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
      {
        x: 121.5997116931,
        y: 25.0561982235,
        z: 0,
        h: 61,
        p: 0,
        r: 0,
        s: 3,
      },
    ],
  },

  camera: {
    zoomType: "setView",
    zoomTo: "coordinate",
    x: 121.5997,
    y: 25.053,
    z: 200,
    h: 0,
    p: -0.5,
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
