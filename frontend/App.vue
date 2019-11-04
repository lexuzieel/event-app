<template>
  <div id="app">
    <Map/>
  </div>
</template>

<script>
require("./assets/sass/app.sass");

import Map from "./components/Map.vue";

export default {
  components: {
    Map
  }
};
</script>
