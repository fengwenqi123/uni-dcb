// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import goods from './modules/goods'
import remarks from './modules/remarks'
import unConfirmed from './modules/unConfirmed'
import eat from './modules/eat'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    goods,
    remarks,
    unConfirmed,
    eat
  },
  getters
})

export default store
