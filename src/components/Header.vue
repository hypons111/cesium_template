<template>
  <div id="header">

    <div id="headerRow_1" class="headerRow">

      <div id="headerAsideLeft" class="headerAside">
        <el-select class="el_select" v-model="value" placeholder="OPTION">
          <el-option v-for="item in headerAsideLeftOptions" :key="item.value" :label="item.label"
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
  height: 6em;
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
      background-size: cover;
      background-position: center top;
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
      display: flex;
      align-items: center;
      width: 20%;
      padding: 0 1em;
      // border: 1px solid cyan;

      .el-select__wrapper {
        // $--color-primary: teal;
        border: 1px solid cyan !important;
      }
    }
  }

  #headerRow_2 {
    height: 3em;
    flex-direction: column;
    // border: 1px solid cyan;

    #clock {
    }

    #marqueeContainer {
      width: calc(100vw - 25em - 25em - 2em);
      height: 2em;
      border-left: thick double red;
      border-right: thick double red;
      overflow: hidden;
      animation: fresh 1s linear infinite;

      @keyframes fresh {
        0% {
          border-left: thick double rgba(#ffffff, 0);
          border-right: thick double rgba(#ffffff, 0);
        }

        50% {
          border-left: thick double red;
          border-right: thick double red;
        }

        100% {
          border-left: thick double rgba(#ffffff, 0);
          border-right: thick double rgba(#ffffff, 0);
        }
      }

      #marqueeContents {
        width: fit-content;
        height: 100%;
        font-size: 1.5em;
        color: red;
        line-height: 1.25em;
        text-wrap: nowrap;
        animation: slide 20s linear infinite;

        @keyframes slide {
          0% {
            transform: translatex(100%)
          }
  
          100% {
            transform: translatex(-100%)
          }
        }
      }
    }
  }




}
</style>
