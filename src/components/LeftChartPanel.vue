<template>
  <div id="LeftChartPanel" class="panel">
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

<style></style>
