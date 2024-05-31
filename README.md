# 使用說明

## 注意
1. **不**建議把 cesium.js 的功能寫在 cesium.vue 以外的地方。
2. 大部份設定都放在 `cesiumSetting.js`，如非必要**不**要改動 `Cesium.vue` 中跟 cesium 有關的程式。

## Header.vue
1. 系統名稱：`.env` → `VUE_APP_PROJECT_NAME`。
2. 左邊 menu：切換模型。`value` = ion 編號 / glTF 檔名。
3. 跑馬燈內容在 `Marquee.vue` → `fetchMarqueeContents()`。

## Footer.vue
1. 增加/移除 section：`viewBtnGroup`

## LeftChartPanel.vue
## RightChartPanel.vue
1. 主要用作 charts 的容器，分3格。
2. 更換 charts 要以子組件方法載入。
3. charts 組件分3格、2格、1格三種尺寸。
3. charts 組件存放路徑：`@/components/charts/組件`。

## charts
1. 一種圖表一個 `.vue` 檔。
2. 圖表有共用 css：`@/assets/css/chart`。

## cesiumSetting.js
### viewer	
1. `ionDefaultAccessToken`：cesium ion 的 token (如果本地模型檔案就設為空字串) (建議每個要使用的專案都申請一個新的帳號)。
2. `showEarth`：是否顯示地球。參數：true / false。
3. `backgroundColor`：背景顏色 (`showEarth===false`時才會有效)。 要大寫，要使用 `Cesium.Color` 可使用的顏色。
4. `useGoogleMap`：是否使用 google map (google map 有地形效果，有機會模型會被埋在地底)。參數：true / false。
5. `maximumZoomDistance`：設定限制視點的最遠距離 (註解此屬性會使用預設值：10000000)。參數：數字 / 註解。
6. `minimumZoomDistance`：設定限制視點的最近距離 (註解此屬性會使用預設值：0)。參數：數字 / 註解。

### model
1. `modelType`：參數："local" / "ion"
2. `ModalArray`：要載入的模型。本地模型 ：`[gltf 檔名，gltf 檔名，gltf 檔名]` / ion 模型 ：`[ion ID ，ion ID ，ion ID]`。
3. `modelSettingArray`：
    `x`：經度，只會在經度移動，不會受視角影響
    `y`：緯度，只會在緯度移動，不會受視角影響
    `z`：高度 
    `h`：模型橫向角度
    `p`：模型緃向角度
    `r`：模型地平線角度
    `s`：模型大小

### camera
1. `zoomType`：鏡頭移動到模型的方式。參數："setView" / "flyTo"。
2. `zoomTo`：鏡頭移動到模型 / 指定位置。參數："model" / "coordinate"。
>(當 `settings.showEarth===false` 時，會無視"coordinate"，鏡頭會移動到模型)。 
3. `x`：經度，只會在經度移動，不會受視角影響。
  `y`：緯度，只會在緯度移動，不會受視角影響。
  `z`：高度。
  `h`：鏡頭橫向角度。
  `p`：鏡頭緃向角度。
  `r`：鏡頭地平線角度。
4. `flyDuration`：flyTo 效果持續秒數。

### patrol
1. `coordinate`：
    `x`：經度，只會在經度移動，不會受視度影響。
    `y`：緯度，只會在緯度移動，不會受視度影響。
    `z`：與地面距離。
    `h`：鏡頭橫向角度。
    `p`：鏡頭緃向角度。
    `r`：鏡頭地平線角度。
2. `route`：巡邏的路徑。`[方向， 前進距離]`。方向正數轉左，方向負數轉右。