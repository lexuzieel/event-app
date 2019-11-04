import Vue from 'vue'
import App from './App.vue'
import store from './store'
import YandexMaps from 'vue-yandex-maps'

window._ = require('lodash')
window.axios = require('axios')

Vue.config.productionTip = false

const moment = require('moment')

moment.locale('ru')

Vue.use(require('vue-moment'), {
    moment
})

Vue.use(YandexMaps, {
    apiKey: process.env.VUE_APP_YANDEX_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
})

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
