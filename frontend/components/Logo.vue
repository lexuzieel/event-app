<template>
  <div class="logo">
    <div class="bar primary"/>
    <div class="bar secondary"/>
  </div>
</template>

<script>
export default {
  //
};
</script>

<style lang="sass" scoped>
@import "bulma/sass/utilities/_all.sass"

.logo
    width: 50%
    +mobile
        width: 100%
    margin: auto
    max-height: 40px
    min-height: 24px
    height: 5vw
.bar
    float: left
    height: 100%
    border-radius: 64px
.primary
    width: 65%
    margin-right: 5%
    background-color: #FFAA64
.secondary
    width: 30%
    background-color: #64B0FF
</style>
