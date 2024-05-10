<template>
  <div id="header">
    <div id="leftAside" class="aside">
      <el-select v-model="value" placeholder="OPTION">
        <el-option v-for="item in leftAsideOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div id="projectTitle">
      <p>{{ projectName }}</p>
    </div>
    <div id="rightAside" class="aside">
      <Clock />
      <el-select v-model="value" placeholder="OPTION">
        <el-option v-for="item in rightAsideOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Clock from "@/components/Clock.vue"
const projectName = ref(process.env.VUE_APP_PROJECT_NAME)

const leftAsideOptions = [{
  value: '0',
  label: 'option_1'
}, {
  value: '1',
  label: 'option_2'
}, {
  value: '2',
  label: 'option_3'
}, {
  value: '3',
  label: 'option_4'
}, {
  value: '4',
  label: 'option_5'
}]

const rightAsideOptions = [{
  value: '0',
  label: '模型復原'
}, {
  value: '1',
  label: '設備清單'
}, {
  value: '2',
  label: '視角清單'
}, {
  value: '3',
  label: '登入'
}]
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 10;

  #projectTitle {
    width: 50%;
    height: 100%;
    border: 1px solid lime;
    background-image: url("../assets/image/header.png");
    background-size: contain;
    background-position: center center;

    p {
      display: inline-block;
      color: var(--WHITE);
      font-size: 1.75em;
      font-weight: 900;
      font-weight: bolder;
      line-height: 1.5em;
    }

  }

  .aside {
    width: 25%;
    border: 1px solid gold;
  }
}
</style>
