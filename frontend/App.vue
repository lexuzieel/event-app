<template>
  <div id="app">
    <Map/>
    <div class="section">
      <div class="container">
        <Header/>
      </div>
    </div>
  </div>
</template>

<script>
require("./assets/sass/app.sass");

import Header from "./components/Header.vue";
import Map from "./components/Map.vue";

export default {
  components: {
    Header,
    Map
  },
  mounted() {
    axios
      .get(`${this.$store.state.backendUrl}/api/users/me`, {
        withCredentials: true
      })
      .then(({ data }) => {
        this.$store.commit("updateUser", data);
      })
      .finally(() => {
        this.$store.commit("initialize");
      });
  }
};
</script>

<style lang="sass">
#app > .section
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
</style>
