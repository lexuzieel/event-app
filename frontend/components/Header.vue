<template>
  <div class="header">
    <Logo/>
    <profile-button/>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import ProfileButton from "./ProfileButton.vue";

export default {
  components: {
    Logo,
    ProfileButton
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
    .profile-button
        margin: 2.5em 0
        +mobile
            display: none
</style>
