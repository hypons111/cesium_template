import BLUE_TAG from "@/assets/image/blue.png";
import BROWN_TAG from "@/assets/image/brown.png";

const _3DTilesArray = [2557681, 2557680];

const _3DTilesSettings = {
  showEarth: true,
  useGoogleMap: false, // 是否使用 google map
  zoomToModel: false,

  originCamera : {
    x: 121.598,
    y: 25.045,
    z: 500,
    h: 0, // heading
    p: -0.5, // pitch
    r: 1000, // range
  },

  zoomModel: {
    modelOrigin: "default", // "default" / "ion"
    zoomType: "fly", // "default" / "fly" /
  },
};

const originCamera = {
  x: 121.598,
  y: 25.045,
  z: 500,
  h: 0, // heading
  p: -0.5, // pitch
  r: 1000, // range
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

/* [ 方向(正數轉左, 負數轉右) , 前進距離 ] */
const patrolSpotsArray = [
  [0, 50],
  [90, 25],
  [-90, 10],
];

export {
  _3DTilesArray,
  _3DTilesSettings,
//   originCamera,
  tagsArray,
  patrolSpotsArray,
};
