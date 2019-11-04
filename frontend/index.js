import Vue from 'vue'
import App from './App.vue'
import store from './store'
import YandexMaps from 'vue-yandex-maps'

window._ = require('lodash')
window.axios = require('axios')

Vue.config.productionTip = false

Vue.use(YandexMaps, {
    apiKey: process.env.VUE_APP_YANDEX_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
})

console.log(process.env)

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
