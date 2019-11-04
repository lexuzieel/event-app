import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        backendUrl: process.env.VUE_APP_BACKEND_URL || '',
        initialized: false,
        user: null
    },
    mutations: {
        initialize(state) {
            state.initialized = true
        },
        updateUser(state, user) {
            state.user = user
        }
    }
})
