<template>
  <div class="pyro" v-if="showFireworksAnimation">
    <div class="before"></div>
    <div class="after"></div>
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";

const { theme } = useData();

// get fireworks animation control
let showFireworksAnimation = theme.value.showFireworksAnimation;
</script>

<style scoped>
.pyro {
  box-sizing: border-box;
}
.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff,
    0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
  animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  animation-delay: 1.25s, 1.25s, 1.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@keyframes bang {
  to {
    box-shadow: 161px -30.33333px #00ffdd, -157px -164.33333px #ff7300,
      -201px 27.66667px #0040ff, 221px -184.33333px #ff00e1,
      72px 26.66667px blue, 8px -82.33333px #ff0062, 140px -252.33333px #ffaa00,
      -14px 6.66667px #7b00ff, -162px 45.66667px #ff0900,
      -211px -33.33333px #ff7b00, 81px -109.33333px #0037ff,
      82px -308.33333px #ff9100, 235px -94.33333px #00a2ff,
      -149px -58.33333px #e600ff, 138px -260.33333px #0044ff,
      -93px -290.33333px #3cff00, -234px -82.33333px #ff1e00,
      -16px 15.66667px #cc00ff, 214px -298.33333px #00eaff,
      -192px -18.33333px #00ccff, 20px -227.33333px #ff00ae,
      6px -30.33333px #ff0048, 175px 13.66667px #ffe100,
      -185px -285.33333px #0dff00, 242px -269.33333px #ff0055,
      86px -1.33333px #5100ff, 228px -314.33333px #00ff80,
      229px -48.33333px #00ff4d, -55px -266.33333px #ff001e,
      68px -252.33333px #3c00ff, -134px -215.33333px #00ff11,
      37px -160.33333px #00ffe1, -223px -265.33333px #ff0033,
      184px -123.33333px #ffd000, -18px -46.33333px #009dff,
      228px -220.33333px #00ffb3, 67px -75.33333px #d900ff,
      130px 52.66667px #ffc800, -56px -97.33333px #b7ff00,
      -89px -139.33333px #00ffcc, -174px -79.33333px #3cff00,
      -141px -254.33333px #ff0048, 98px -110.33333px #0026ff,
      -66px -293.33333px #ffc400, 156px -258.33333px #001aff,
      138px -170.33333px #00ffd9, -228px -171.33333px #00ff11,
      163px -274.33333px #ffea00, 150px -112.33333px #0033ff,
      -55px 32.66667px #0048ff, -36px 65.66667px #b7ff00,
      118px -160.33333px #00ff6a, 29px -28.33333px #9900ff,
      137px 1.66667px #002fff, 242px -164.33333px #ff0059,
      -158px 9.66667px #ff00cc, -62px -231.33333px #00ff11,
      -64px -111.33333px #c8ff00, -207px 43.66667px #51ff00,
      -69px 8.66667px #ff00ae, -83px -9.33333px #6600ff;
  }
}

@keyframes gravity {
  to {
    transform: translateY(200px);
    opacity: 0;
  }
}

@keyframes position {
  0%,
  19.9% {
    margin-top: -10%;
    margin-left: 40%;
  }
  20%,
  39.9% {
    margin-top: 20%;
    margin-left: 30%;
  }
  40%,
  59.9% {
    margin-top: 10%;
    margin-left: 70%;
  }
  60%,
  79.9% {
    margin-top: 20%;
    margin-left: 20%;
  }
  80%,
  99.9% {
    margin-top: 20%;
    margin-left: 80%;
  }
}
</style>
