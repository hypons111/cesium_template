<template>
  <div id="StackedLineChart" class="chartContainer">
    <div id="chart" ref="chartContainer"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import * as echarts from 'echarts';

const chartContainer = ref(null);
const fakeChartData = ref({
  title: "標題",
  xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      name: 'A',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'B',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'C',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'D',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'E',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
);

function setChart() {
  const chart = echarts.init(chartContainer.value);
  chart.setOption({
    title: {
      top: '3%',
      left: '3%',
      text: fakeChartData.value.title,
      textStyle: {
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'axis', // 'axis' / 'item'
    },
    /* 刪除 legend 代表不顯示每種顏色代表的屬性 */
    legend: {
      bottom: '5%',
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      left: '5%',
      right: '7.25%',
      top: '20%',
      bottom: '17.5%',
      containLabel: true // 屬性是否包含在 grid 內
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: fakeChartData.value.xData
    },

    yAxis: {
      type: 'value'
    },

    series: fakeChartData.value.series,

    textStyle: {
      color: 'white'
    }
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped></style>
