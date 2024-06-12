<template>
  <div id="DoughnutChart" class="svgContainer large">

    <div id="topPatternContainer" class="patternContainer">
      <svg id="topPattern" class="pattern">
        <polyline class="filled" points="1,1 15,1 1,15 1,1 15,1" /> <!-- 左上三角形 -->
        <polyline class="filled" points="383,1 399,1 399,15 383,1 399,1" /> <!-- 右上三角形 -->
        <polyline class="filled" points="177,1 186,6 334,6 343,1 177,1 186,6" /> <!-- 梯形 -->
        <polyline points="1,39 1,20 20,1 170,1 185,10 335,10 350,1 377,1 399,20 399,39" /> <!-- 上框 -->
      </svg>
    </div>

    <div id="chart" ref="chartContainer"></div>

    <div id="bottomPatternContainer" class="patternContainer">
      <svg id="bottomPattern" class="pattern">
        <polyline class="filled" points="1,25 1,39 15,39 1,25 1,39" /> <!-- 左下三角形 -->
        <polyline class="filled" points="385,39 399,39 399,25 385,39 399,39" /> <!-- 右下三角形 -->
        <polyline points="1,1 1,20 20,39 380,39 399,20 399,1" /> <!-- 下框 -->
      </svg>
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import "@/assets/css/chart.css"
import "@/assets/css/svg.css"

const chartContainer = ref(null);

const fakeChartData = ref({
  title: "Stacked Bar Normalizati M",
  xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  yData: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  data: [
    [100, 302, 301, 334, 390, 330, 320, 101, 134],
    [320, 132, 101, 134, 90, 230, 210, 320, 132],
    [220, 182, 191, 234, 290, 330, 310, 330, 410],
    [150, 212, 201, 154, 190, 330, 410, 334, 390],
    [820, 832, 901, 934, 1290, 1330, 1320, 190, 330]
  ]
})

function setChart() {
  const chart = echarts.init(chartContainer.value);
  chart.setOption({
    title: {
      top: '5%',
      left: '2.5%',
      text: fakeChartData.value.title,
      textStyle: {
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'axis', // 'axis' / 'item'
    },
    legend: {
      bottom: '5%',
      selectedMode: true,
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      left: '5%',
      right: '7.25%',
      top: '20%',
      bottom: '15%',
      containLabel: true // 屬性是否包含在 grid 內
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: fakeChartData.value.xData
    },
    yAxis: {
      type: 'value'
    },
    textStyle: {
      color: 'white'
    },
    series: fakeChartData.value.yData.map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          formatter: (params) => params.value
        },
        data: fakeChartData.value.data[sid]
      };
    })
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped></style>
