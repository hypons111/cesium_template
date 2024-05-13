<template>
  <div id="RightChartPanel" class="panel">
    <stackHorizontalBarChart />
    <DoughnutChart />
    <StackedLineChart />
  </div>
</template>

<script setup>
import stackHorizontalBarChart from "@/components/charts/StackHorizontalBarChart.vue"
import DoughnutChart from "@/components/charts/DoughnutChart.vue"
import StackedLineChart from "@/components/charts/StackedLineChart.vue"
import "@/assets/css/chart.css"
</script>

<style scoped>
#RightChartPanel {
  width: 25em;
  height: calc(100vh - 48px - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

