<template>
    <div class="container mx-auto">
        <div class="mt-20 flex justify-center">
            <div
                class="bg-color-gray py-8 rounded flex justify-around items-center w-full"
            >
                <div class="flex items-center gap-2">
                    <label>Search by release date:</label>
                    <VueDatepickerUi
                        v-model="$store.state.search"
                        :date-format="{
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }"
                        lang="en"
                        range
                    ></VueDatepickerUi>
                    <button class="btn" @click="clearSearch">Clear</button>
                </div>
                <button class="btn btn-primary" @click="searchSubmit">Search</button>
            </div>
        </div>
        <div class="mt-20 grid grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-12">
            <MovieBox
                v-for="movie in movies.results"
                :id="movie.id"
                :key="movie.id"
                :genres="genres(movie.genre_ids)"
                :release-date="movie.release_date"
                :thumb-url="'/w500/' + movie.poster_path"
                :title="movie.original_title"
            >
            </MovieBox>
        </div>
        <div class="py-20 flex justify-center">
            <pagination
                :current-page="movies.page"
                :total-pages="movies.total_pages"
                @change="pageChange"
            ></pagination>
        </div>
    </div>
</template>

<script>
import MovieBox from "../../components/MovieBox";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import moment from "moment";
import Pagination from "../../components/Pagination";

export default {
    name: "List",
    components: {Pagination, MovieBox, VueDatepickerUi},
    data: function () {
        return {
            genre: store.state.genre,
            movies: store.state.movies,
            search: store.state.search,
        };
    },
    methods: {
        genres(genre_ids) {
            return genre_ids.map((i) => {
                return this.genre[this.genre.findIndex((genre) => i == genre.id)].name;
            });
        },
        async searchSubmit() {
            try {
                let movies = await axios.get(store.state.base_url + "/discover/movie", {
                    params: {
                        api_key: store.state.api_key,
                        sort_by: "popularity.desc",
                        "primary_release_date.lte": this.searchFormatReleaseDate[1],
                        "primary_release_date.gte": this.searchFormatReleaseDate[0],
                    },
                });
                this.movies = movies.data;
            } catch (e) {
                console.error(e);
            }
        },
        async clearSearch() {
            try {
                let movies = await axios.get(store.state.base_url + "/discover/movie", {
                    params: {
                        api_key: store.state.api_key,
                        sort_by: "popularity.desc",
                    },
                });
                this.movies = movies.data;
                this.search = [];
                store.state.search = [];
                store.state.page = 1;
            } catch (e) {
                console.error(e);
            }
        },
        async pageChange(page) {
            try {
                let params = {};
                if (this.$store.state.search.length == 2) {
                    params["primary_release_date.lte"] = this.searchFormatReleaseDate[1];
                    params["primary_release_date.gte"] = this.searchFormatReleaseDate[0];
                }
                params.sort_by = "popularity.desc";
                params.api_key = this.$store.state.api_key;

                params.page = page;

                let movies = await axios.get(store.state.base_url + "/discover/movie", {
                    params,
                });
                this.movies = movies.data;
                store.state.page = page;
            } catch (e) {
                console.error(e);
            }
        },
    },
    computed: {
        searchFormatReleaseDate() {
            return this.$store.state.search.map((date) => {
                return moment(date).format("YYYY-MM-DD");
            });
        },
    },

    async beforeRouteEnter(to, from, next) {
        try {
            let genreResult = await axios.get(
                store.state.base_url + "/genre/movie/list",
                {
                    params: {
                        api_key: store.state.api_key,
                    },
                }
            );

            let params = {
                api_key: store.state.api_key,
                sort_by: "popularity.desc",
                page: store.state.page,
            };
            if (store.state.search.length == 2) {
                const search = store.state.search.map((date) => {
                    return moment(date).format("YYYY-MM-DD");
                });
                params["primary_release_date.lte"] = search[1];
                params["primary_release_date.gte"] = search[0];
            }

            let movies = await axios.get(store.state.base_url + "/discover/movie", {
                params: params,
            });

            store.state.movies = movies.data;
            store.state.genre = genreResult.data.genres;
            next();
        } catch (e) {
            next();
            console.error(e);
        }
    },
};
</script>

<style scoped></style>
