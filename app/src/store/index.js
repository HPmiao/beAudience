import Vuex from "vuex";
import Vue from "vue";
import global from "./global.js";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { global }
})