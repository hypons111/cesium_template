<template>
  <div id="clock">
    <div id="clockContainer">{{ clock }}</div>
  </div>
</template>

<script setup>
class DateTime {
  constructor() {4
    this.weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.Date = new Date();
    this.year = this.Date.getFullYear();
    this.month = (this.Date.getMonth() + 1).toString().padStart(2, '0');
    this.date = this.Date.getDate().toString().padStart(2, '0');
    this.hour = this.Date.getHours().toString().padStart(2, '0');
    this.minute = this.Date.getMinutes().toString().padStart(2, '0');
    this.second = this.Date.getSeconds().toString().padStart(2, '0');
    this.day = this.Date.getDay();
  }

  getDate() {
    return `${this.year}-${this.month}-${this.date}`;
  }

  getTime() {
    return `${this.hour}:${this.minute}:${this.second}`;
  }

  getWeekday() {
    return this.weekday[this.day];
  }

  getDatetime() {
    return `${this.year}-${this.month}-${this.date} ${this.hour}:${this.minute}:${this.second} ${this.getWeekday()}`;
  }
}

import { ref, onMounted, onUnmounted } from "vue"
import '@/assets/font/DSfont.css' 

let intervalSwitch;
const clock = ref("");

function getRealTime() {
  intervalSwitch = setInterval(() => {
    const DT = new DateTime();
    clock.value = `${DT.getDatetime()}`;
  }, 1000);
}

onMounted(() => {
  getRealTime();
})
onUnmounted(() => {
  clearInterval(intervalSwitch);
})

</script>


<style lang="scss" scoped>
#clockContainer {
  width: fit-content;
  height: 1em;
  font-size: 1.25em;
  color: var(--GRAY_1);
  font-family: 'DSDigital';
}
</style>
