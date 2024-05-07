<template>
  <div id="DoughnutChart" class="chartContainer">
    <div id="chart" ref="chartContainer"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import * as echarts from 'echarts';

const chartContainer = ref(null);
const fakeChartData = ref({
  title: "標題",
  xData: ['A', 'B', 'C', 'D', 'E'],
  series: [
    {
      type: 'pie',
      center: ['57.5%', '52.5%'],
      radius: ['20%', '75%'],
      data: [
        {
          name: 'A',
          value: 120,
        },
        {
          name: 'B',
          value: 220
        },
        {
          name: 'C',
          value: 150
        },
        {
          name: 'D',
          value: 320
        },
        {
          name: 'E',
          value: 820
        }
      ],
      /* pie 旁邊的文字 */
      label: {
        formatter: '{b} : {c}',
        fontSize: 12,
        color: 'white'
      },
      /* pie 旁邊的線 */
      labelLine: {
        length: 10,
        length2: 10,
      },
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
      trigger: 'item',
      // formatter: 'Label : {a} <br/> Y軸 : {b} <br/> 值 : {c}', // 可以放各個軸的參數 
    },
    /* 刪除 legend 代表不顯示每種顏色代表的屬性 */
    legend: {
      orient: 'vertical',
      left: '3%',
      top: 'center',
      textStyle: {
        color: 'white'
      }
    },
    series: fakeChartData.value.series,
    textStyle: {
      color: 'white'
    },

    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped></style>
