import Vue from 'vue'
import App from './App.vue'
import store from './store'
import YandexMaps from 'vue-yandex-maps'
import VueAnalytics from 'vue-analytics'

window._ = require('lodash')
window.axios = require('axios')

Vue.config.productionTip = false
if (process.env.VUE_APP_GOOGLE_ANALYTICS_ID) {
    Vue.use(VueAnalytics, {
        id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
        debug: {
            sendHitTask: process.env.NODE_ENV == 'production',
        }
    })
}

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
