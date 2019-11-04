<template>
  <yandex-map
    ref="map"
    :zoom="zoom"
    :coords="$store.state.location"
    :controls="controls"
    ymap-class="background-map"
    @map-was-initialized="initialized"
  >
    <ymap-marker
      v-for="marker in markers"
      :key="marker.id"
      cluster-name="default-cluster"
      :coords="marker.coords"
      :marker-id="marker.id"
      :hint-content="marker.hint"
      :icon="marker.icon"
      :callbacks="{
        click:onMarkerClick
      }"
    />
  </yandex-map>
</template>

<script>
export default {
  data() {
    return {
      controls: [],
      zoom: 15
    };
  },
  computed: {
    markers() {
      let markers = [];

      this.$store.state.events.forEach(event => {
        markers.push({
          id: event.id,
          coords: [event.latitude, event.longitude],
          icon: this.getIcon(event.type.color),
          hint: event.name
        });
      });

      return markers;
    }
  },
  methods: {
    initialized() {
      this.initializeLocation().then(location => {
        this.$store.state.location = [location.lat, location.lng];
        this.$emit("loaded");
      });
    },
    getIcon(color) {
      return {
        layout: "default#image",
        imageHref: `/markers/${color}.svg`,
        imageSize: [55, 72], // icon size в px
        imageOffset: [-24, -64] // offset в px
      };
    },
    onMarkerClick(e) {
      this.$store.state.location = e.get("coords");
    },
    cacheLocation(location) {
      localStorage.setItem("geolocation", JSON.stringify(location));
    },
    initializeLocation() {
      return new Promise(resolve => {
        // Check if geolocation has been previously cached
        if (localStorage && localStorage.getItem("geolocation")) {
          resolve(JSON.parse(localStorage.getItem("geolocation")));
          // Check whether geolocation exists in the browser
        } else if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            position => {
              let location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              this.cacheLocation(location);
              resolve(location);
            },
            error => {
              this.getFallbackLocation().then(location => {
                resolve(location);
              });
            }
          );
        } else {
          this.getFallbackLocation().then(location => {
            resolve(location);
          });
        }
      });
    },
    getFallbackLocation() {
      return axios
        .post("https://www.googleapis.com/geolocation/v1/geolocate", null, {
          params: {
            key: process.env.VUE_APP_GOOGLE_API_KEY
          }
        })
        .then(({ data }) => {
          let location = data.location;
          this.cacheLocation(location);
          return location;
        })
        .catch(error => {
          return [0, 0]; // TODO: Change to some city?
        });
    }
  }
};
</script>

<style lang="sass">
.background-map
    position: absolute
    width: 100%
    height: 100%
</style>
