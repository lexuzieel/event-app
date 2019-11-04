import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        backendUrl: process.env.VUE_APP_BACKEND_URL || '',
        initialized: false,
        location: [0, 0],
        eventTypes: [],
        events: [],
        user: null
    },
    mutations: {
        initialize(state) {
            state.initialized = true
        }
    }
})
