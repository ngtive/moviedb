<template>
    <div class="container mx-auto">
        <div class="mt-20 flex justify-center">
            <div class="bg-color-gray py-8 rounded flex justify-around items-center w-full">
                <div>
                    <label>Search by release date:</label>
                    <input>
                </div>
                <button class="btn btn-primary">Search</button>
            </div>
        </div>
        <div class="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4">
            <MovieBox
                v-for="movie in movies.results"
                :thumb-url="'/w500/' + movie.poster_path"
                :key="movie.id">
            </MovieBox>
        </div>
    </div>
</template>

<script>
import MovieBox from "../../components/MovieBox";

export default {
    name: "List",
    components: {MovieBox},
    data: function () {
        return {
            genre: store.state.genre,
            movies: store.state.movies,
        }
    },
    methods: {
        genres(genre_ids) {

        }
    },

    async beforeRouteEnter(to, from, next) {
        try {
            let genreResult = await axios.get(store.state.base_url + '/genre/movie/list', {
                params: {
                    api_key: store.state.api_key,
                }
            });

            let movies = await axios.get(store.state.base_url + '/discover/movie', {
                params: {
                    api_key: store.state.api_key,
                    sort_by: 'popularity.desc',
                }
            });

            store.state.movies = movies.data;
            store.state.genre = genreResult.data.genres;
            next();

        } catch (e) {
            next();
        }
    }
}
</script>

<style scoped>

</style>