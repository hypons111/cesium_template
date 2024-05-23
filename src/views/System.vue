<template>
  <div id="system">
    <div id="systemContainer">
      <div>
        <button @click="pickSystem('index')">3D</button>    
      </div>
       <div>
        <button @click="pickSystem('other')">Other</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function pickSystem(page) {
  router.push(`/${page}`);
}
</script>

<style lang="scss" scoped>
#system {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/image/loginBackground.png");
    background-size: cover;
    background-repeat: no-repeat;


}
</style>