<template>
  <div class="header">
    <Logo/>
    <profile-button/>
    <search-widget/>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import ProfileButton from "./ProfileButton.vue";
import SearchWidget from "./SearchWidget.vue";

export default {
  components: {
    Logo,
    ProfileButton,
    SearchWidget
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
    & > *
        pointer-events: initial
    .profile-button
        margin: 2.5em 0
        +mobile
            display: none
    .search-widget
        margin: auto
        width: 50%
        +mobile
            margin-top: 1.5em
            width: 100%
</style>
