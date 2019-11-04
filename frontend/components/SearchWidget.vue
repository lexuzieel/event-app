<template>
  <div
    v-if="ready"
    class="search-widget"
  >
    <input
      v-model="name"
      type="text"
      placeholder="Название события..."
      class="text-field"
      @input="debouncedSearch"
      @focus="onFocus"
      @blur="onBlur"
    >
    <div class="filter">
      <span class="title">Фильтр</span>
      <span class="circle"/>
    </div>
    <div
      v-if="hasEvents"
      class="result-list"
    >
      <div
        v-for="event in events"
        :key="event.id"
        class="item"
        @click="focusEvent(event)"
      >
        <span
          class="color"
          :style="getIconStyle(event)"
        />
        <span class="name">
          {{ event.name }}
        </span>
        <span class="date">
          {{ $moment(event.arrangedAt).format('D MMMM') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      previousName: "",
      events: [],
      ready: false,
      loading: false
    };
  },
  computed: {
    hasEvents() {
      return this.events.length > 0;
    },
    debouncedSearch() {
      return _.debounce(this.search, 500);
    }
  },
  mounted() {
    axios
      .get(`${this.$store.state.backendUrl}/api/events/types`)
      .then(({ data }) => {
        this.$store.state.eventTypes = data;
      })
      .finally(() => {
        this.ready = true;
        this.$emit("ready");
      });
  },
  methods: {
    focusEvent(event) {
      this.events = [];
      this.loading = false;
      this.previousName = this.name = "";
      this.$store.state.location = [event.latitude, event.longitude];
    },
    search() {
      if (this.previousName != this.name) {
        if (_.isEmpty(this.name)) {
          this.events = [];
        } else {
          this.loadEvents(this.name);
        }
      }

      this.previousName = this.name;
    },
    loadEvents(name) {
      this.loading = true;

      return axios
        .get(`${this.$store.state.backendUrl}/api/events`, {
          params: {
            name,
            limit: 7
          }
        })
        .then(({ data }) => {
          this.events = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getIconStyle(event) {
      let map = {
        orange: "#FFAA64",
        green: "#95DD4E",
        blue: "#64B0FF",
        purple: "#A864FF",
        red: "#FF6464"
      };

      let color = map[event.type.color];

      return {
        "background-color": color,
        "box-shadow": `0 0 4px ${color}`
      };
    },
    onFocus() {
      this.expanded = true;
    },
    onBlur() {
      this.expanded = false;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "bulma/sass/utilities/_all.sass"

.search-widget
    box-shadow: 0 2px 16px rgba(0, 0, 0, .3)
    border-radius: 8px
    background: white
    padding: 0 18px
    position: relative
    .text-field
        font-size: 18px
        padding: 0 8px
        border: none
        height: 40px
        width: 100%
        outline: none !important
    .filter
        position: absolute
        top: 0
        right: 0
        line-height: 40px
        margin-right: 16px
        padding-right: 24px
        cursor: pointer
        .title
            font-size: 14px
            color: #999
            +mobile
                visibility: hidden
        .circle
            position: absolute
            top: 0
            bottom: 0
            margin: auto
            right: 0
            border: 2px solid #999
            // box-shadow: 0 0 4px #999
            display: block
            border-radius: 32px
            width: 16px
            height: 16px
    .result-list
        .item
            height: 30px
            display: flex
            cursor: pointer
            border-top: 1px solid rgb(230, 230, 230)
            .color
                border-radius: 32px
                background-color: grey
                box-shadow: 0 0 4px grey
                width: 16px
                min-width: 16px
                height: 16px
                line-height: 24px
                margin-top: 6px
                margin-right: 10px
            .name
                flex-grow: 1
                font-size: 16px
                text-align: left
            .date
                min-width: 100px
                font-size: 14px
                text-align: right
                +mobile
                    display: none
            .name, .date
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                line-height: 24px
            &:hover
                .name, .date
                    opacity: .75
    .load-more
        height: 30px
        font-size: 14px
        line-height: 25px
        opacity: 0.75
        transition: opacity .5s
        &:hover
            opacity: 1
            cursor: pointer
        &.is-loading
            opacity: 0
</style>
