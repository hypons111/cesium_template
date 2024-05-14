<template>
  <div id="header">

    <div id="headerRow_1" class="headerRow">

      <div id="headerAsideLeft" class="headerAside">
        <el-select class="el_select" v-model="value" placeholder="OPTION">
          <el-option class="el_option" v-for="item in headerAsideLeftOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>

      </div>

      <div id="headerMain">
        <p>{{ projectName }}</p>
      </div>

      <div id="headerAsideRight" class="headerAside">
        <el-select class="el_select" v-model="value" placeholder="OPTION">
          <el-option v-for="item in headerAsideRightOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>

    </div>

    <div id="headerRow_2" class="headerRow">
      <Clock id="clock" />
      <Marquee id="marquee" />
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Clock from "@/components/tools/Clock.vue";
import Marquee from "@/components/tools/Marquee.vue";
const projectName = ref(process.env.VUE_APP_PROJECT_NAME);

const headerAsideLeftOptions = [{
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

const headerAsideRightOptions = [{
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
  height: 6.5em;
  display: flex;
  flex-direction: column;
  z-index: 10;

  .headerRow {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #headerRow_1 {
    height: 3em;

    #headerMain {
      width: 60%;
      height: 100%;
      position: relative;
      background-image: url("../assets/image/header.png");
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      // border: 1px solid cyan;

      p {
        display: inline-block;
        color: var(--WHITE);
        font-size: 1.75em;
        font-weight: 900;
        font-weight: bolder;
        line-height: 1.5em;
      }
    }

    .headerAside {
      position: relative;
      display: flex;
      align-items: center;
      width: 20%;
      padding: 0 1em;
      // border: 1px solid red;

      ::v-deep .el-select__wrapper {
        font-size: 1em;
        font-weight: bold;
        padding: 0.75em;

        background-color: var(--BLUE_4);
        box-shadow: none;
        border: 1px solid cyan;
        border-radius: 0;

        * {
          color: var(--WHITE);
        }

      }
    }
  }

  #headerRow_2 {
    height: 3.5em;
    flex-direction: column;

    #clock {}

    #marqueeContainer {}
  }
}
</style>

<style lang="scss">
.el-popper {
  * {
    color: var(--WHITE);
    background-color: var(--BLUE_4);
  }
}
</style>