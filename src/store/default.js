import Vuex from "vuex";
import Vue from "vue";


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        genre: [],
        image_url: "https://image.tmdb.org/t/p"
    ,
    }
});

window.store = store;

export default store;