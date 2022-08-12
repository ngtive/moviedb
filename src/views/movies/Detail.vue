<template>
  <div class="container mx-auto pb-36">
    <div class="mt-20 flex justify-center">
      <div class="bg-color-gray py-8 px-14 rounded flex items-center w-full">
        <button class="btn btn-primary" @click="$router.go(-1)">
          <img
            alt="Right arrow icon"
            class="inline"
            src="/assets/icons/right-arrow.svg"
          />
          Back
        </button>

        <div class="flex flex-col justify-center">
          <h2 class="mx-24 text-xl font-bold">{{ movie.original_title }}</h2>
          <span class="mx-24">
            {{ movie.tagline }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-20">
      <div class="flex">
        <div class="w-full md:w-1/3">
          <img
            :src="$store.state.image_url + '/original' + movie.poster_path"
            class="poster-img"
          />
        </div>
        <div class="w-full md:w-2/3 mx-20 mt-10">
          <ul class="detail">
            <li class="detail-row">
              <b>Budget</b>
              <span>${{ movie.budget.toLocaleString() }}</span>
            </li>
            <li class="detail-row">
              <b>Revenue</b>
              <span>${{ movie.revenue.toLocaleString() }}</span>
            </li>
            <li class="detail-row">
              <b>Release Date</b>
              <span>{{ movie.release_date }}</span>
            </li>
            <li class="detail-row">
              <b>Runtime</b>
              <span>{{ runtime }}</span>
            </li>
            <li class="detail-row">
              <b>Score</b>
              <div>
                <StarRating
                  v-model="movie.vote_average / 2"
                  :fixed-points="1"
                  :increment="0.01"
                  :max-rating="5"
                  :rating="5"
                  :show-rating="false"
                  :star-size="20"
                  inline
                  read-only
                ></StarRating>
                <span class="inline"
                  >{{ movie.vote_average.toFixed(1) }} ({{
                    movie.vote_count.toLocaleString()
                  }}
                  votes)</span
                >
              </div>
            </li>
            <li class="detail-row">
              <b>Genres</b>
              <ul class="genre flex flex-wrap">
                <li v-for="genre in movie.genres" :key="genre.id">
                  &nbsp;{{ genre.name }}
                </li>
              </ul>
            </li>
            <li class="detail-row">
              <b>IMDB link</b>
              <a
                :href="'https://imdb.com/title/' + movie.imdb_id"
                class="text-sky-500 underline"
                >Link</a
              >
            </li>
            <li class="detail-row">
              <b>HomePage</b>
              <a :href="movie.homepage" class="text-sky-500 underline">Link</a>
            </li>
            <li class="detail-row">
              <b>Production Countries</b>
              <ul class="flex flex-wrap gap-2">
                <li
                  v-for="country in movie.production_countries"
                  :key="country.iso_3166_1"
                >
                  <flag :iso="country.iso_3166_1"></flag>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <p style="color: rgba(30, 30, 30, 1)">{{ movie.overview }}</p>
    </div>

    <div class="mt-10">
      <b>Credit: </b>
      <ul class="casts flex flex-wrap mt-4">
        <li v-for="(cast, key) in casts.casts" :key="key">
          &nbsp;{{ cast.name }}
        </li>
        <li v-if="casts.more > 0" class="more">
          &nbsp;and {{ casts.more }} more.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Flag from "../../components/Flag";
import StarRating from "vue-star-rating";

export default {
  name: "Detail",
  components: { Flag, StarRating },
  data: function () {
    return {
      movie: store.state.movie,
    };
  },

  computed: {
    runtime() {
      var hours = this.movie.runtime / 60;
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);

      return rhours + "h " + rminutes + "m";
    },

    casts() {
      const sorted_casts = this.$store.state.casts
        .map((i) => ({
          popularity: i.popularity,
          name: i.name,
        }))
        .sort((a, b) => (a.popularity < b.popularity ? 1 : -1));

      if (sorted_casts.length > 10) {
        return {
          more: sorted_casts.length - 10,
          casts: sorted_casts.slice(0, 10),
        };
      } else {
        return { more: 0, casts: sorted_casts };
      }
    },
  },

  async beforeRouteEnter(to, from, next) {
    const movie_id = to.params.id;
    try {
      let result = await axios.get(
        store.state.base_url + "/movie/" + movie_id,
        {
          params: {
            api_key: store.state.api_key,
          },
        }
      );
      store.state.movie = result.data;

      let castResult = await axios.get(
        store.state.base_url + "/movie/" + movie_id + "/credits",
        {
          params: {
            api_key: store.state.api_key,
          },
        }
      );
      store.state.casts = castResult.data.cast;
      next();
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.poster-img {
  border-radius: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

ul.detail {
  display: flex;
  flex-flow: column nowrap;
  gap: 18px;
}

ul.genre li:not(:last-child):after,
ul.casts li:not(:nth-last-child(2)):not(.more):after {
  content: ",";
}

ul.cast li {
  color: rgba(30, 30, 30, 1);
}
</style>
