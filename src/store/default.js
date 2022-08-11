import Vuex from "vuex";
import Vue from "vue";


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        genre: [],
        image_url: "https://image.tmdb.org/t/p",
        base_url: "https://api.themoviedb.org/3",
        api_key: "f62f750b70a8ef11dad44670cfb6aa57"
    }
});

window.store = store;

export default store;