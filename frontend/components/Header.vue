<template>
  <div class="header">
    <Logo/>
  </div>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="sass" scoped>
@import "bulma/sass/utilities/_all.sass"

.header
    position: absolute
    text-align: center
    width: 100%
    pointer-events: none
</style>
