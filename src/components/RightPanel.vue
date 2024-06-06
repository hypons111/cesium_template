<template>
  <div id="RightPanel" class="panel">
    <DoughnutChart_M v-if="currentSection === 'section3'"/>
    <StackedLineChart v-if="currentSection === 'section3'"/>
    <Tree v-if="currentSection === 'section4'"/>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import DoughnutChart_M from "@/components/parts/DoughnutChart_M.vue"
import StackedLineChart from "@/components/parts/StackedLineChart_S.vue"
import Tree from "@/components/parts/Tree.vue"

const store = useStore();
const currentSection = computed(() => store.getters.CURRENT_SECTION);
</script>

<style scoped>
#RightPanel {
  width: 25em;
  height: calc(100vh - 48px - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

