<template>
  <div id="app">
    <Map @loaded="onMapLoad"/>
    <div class="section">
      <div class="container">
        <Header/>
      </div>
    </div>
    <div class="section mobile-bottom-section">
      <div class="container">
        <profile-button is-mobile/>
      </div>
    </div>
    <transition name="loading-overlay-transition">
      <div
        v-if="false"
        class="loading-overlay"
      >
        <img
          class="loading-overlay-logo"
          :class="{
            animate:loaded
          }"
          :src="randomSplashLogo"
        >
      </div>
    </transition>
  </div>
</template>

<script>
require("./assets/sass/app.sass");

import Header from "./components/Header.vue";
import ProfileButton from "./components/ProfileButton.vue";
import Map from "./components/Map.vue";

export default {
  components: {
    Header,
    ProfileButton,
    Map
  },
  data() {
    return {
      loaded: false,
      splashFinished: false
    };
  },
  computed: {
    randomSplashLogo() {
      const colors = ["orange", "green", "blue", "purple"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return `/markers/${color}.svg`;
    }
  },
  mounted() {
    axios
      .get(`${this.$store.state.backendUrl}/api/users/me`, {
        withCredentials: true
      })
      .then(({ data }) => {
        this.$store.commit("updateUser", data);
      })
      .catch(error => {
          //
      })
      .finally(() => {
        this.$store.commit("initialize");
      });
  },
  methods: {
    onMapLoad() {
      this.loaded = true;
      setTimeout(() => {
        this.splashFinished = true;
      }, 500);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "bulma/sass/utilities/_all.sass"

#app > .section:first-of-type
    padding-top: 1.5rem
    &::before
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 50%
        min-height: 200px
        max-height: 400px
        background: linear-gradient(to bottom, white, transparent)
        pointer-events: none

.mobile-bottom-section
    text-align: center
    position: absolute
    margin: auto
    bottom: 0
    right: 0
    left: 0
    display: none
    +mobile
        display: initial

.loading-overlay
    position: fixed
    background: #fff
    top: 0
    left: 0
    width:100%
    height:100%
    z-index: 9999
.loading-overlay-transition-enter-active,
.loading-overlay-transition-leave-active
    transition: opacity .75s ease-in
.loading-overlay-transition-enter,
.loading-overlay-transition-leave-to
    opacity: 0

// https://css-tricks.com/making-css-animations-feel-natural/
@keyframes logo-animation
    0%
        transform: scale(3,3) translateY(0)
    10%
        transform: scale(3.1,2.9) translateY(0)
    30%
        transform: scale(2.9,3.1) translateY(-35px)
    50%
        transform: scale(3.05,2.95) translateY(0)
    40%
        transform: scale(2.95,2.5) translateY(15px)
    80%
        transform: scale(3,3) translateY(0)
    100%
        transform: scale(3,3) translateY(0)

.loading-overlay-logo
    position: absolute
    margin: auto
    left: 0
    right: 0
    bottom: 0
    top: 0
    transform: scale(3,3) translateY(0)
    &.animate
        animation-duration: 1.2s
        animation-name: logo-animation
        animation-fill-mode: forwards
</style>
