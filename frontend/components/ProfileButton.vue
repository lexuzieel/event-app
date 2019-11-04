<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="profile-button button"
      :class="{
        'is-loading': loading,
        'logged-in': loggedIn,
      }"
      @click="click"
    >
      <template v-if="loggedIn">
        <div
          class="avatar"
          :style="{
            'background-image': `url(${user.avatarUrl})`
          }"
        />
        <p class="name">
          {{ user.name }}
        </p>
        <p class="logout">
          Выйти
        </p>
      </template>
      <template v-else>
        Войти через VK
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    visible() {
      return this.$store.state.initialized;
    },
    user() {
      return this.$store.state.user;
    },
    loggedIn() {
      return this.user != null;
    }
  },
  methods: {
    click() {
      this.loading = true;

      if (this.loggedIn) {
        location = `${this.$store.state.backendUrl}/auth/logout`;
      } else {
        location = `${this.$store.state.backendUrl}/auth/vkontakte`;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "bulma/sass/utilities/_all.sass"

.profile-button
    background-color: #4680C2
    border: none !important
    color: white !important
    width: 200px
    height: 70px
    border-radius: 16px
    box-shadow: 0 4px 16px rgba(70, 128, 194, .75)
    transition: all .25s
    margin: auto
    pointer-events: all
    &:hover
        background-color: #4C87CA
        box-shadow: 0 4px 16px rgba(70, 128, 194, .8)
    &.is-loading::after
        height: 2.5em
        width: 2.5em
        border: 2px solid rgba(255, 255, 255, 0.75)
        border-top-color: transparent
        border-right-color: transparent
        left: calc(50% - (2.5em / 2))
        top: calc(50% - (2.5em / 2))
    &.logged-in
        position: relative
        overflow: hidden
        padding: 0
        .avatar
            position: absolute
            height: 100%
            width: 36%
            left: -2px
            background-size: contain
            background-repeat: no-repeat
            background-position: center
        .name, .logout
            width: 64%
            right: 0
            position: absolute
            font-size: 1.1em
            white-space: initial
            line-height: 1.1em
            padding: 0 10px
            transition: opacity .25s
        .logout
            opacity: 0
        &:hover
            .name
                opacity: 0
            .logout
                opacity: 1
</style>
