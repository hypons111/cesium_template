<template>
  <div id="LeftChartPanel" class="panel">
    <DoughnutChart />
    <StackedBarNormalizati_M />
    <!-- <DoughnutChart /> -->
    <!-- <stackHorizontalBarChart /> -->
    <!-- <StackedLineChart /> -->
  </div>
</template>

<script setup>
import DoughnutChart from "@/components/charts/DoughnutChart_S.vue"
import StackedBarNormalizati_M from "@/components/charts/StackedBarNormalizati_M.vue"
import stackHorizontalBarChart from "@/components/charts/StackHorizontalBarChart_S.vue"
import StackedLineChart from "@/components/charts/StackedLineChart_S.vue"
import "@/assets/css/chart.css"
</script>

<style scoped>
#LeftChartPanel {
  width: 25em;
  height: calc(100vh - 3em - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
