<template>
  <router-link
    :to="{ name: 'movie-detail', params: { id: id } }"
    class="border movie-box border-box box-radius p-1 flex flex-nowrap gap-3"
    tag="a"
  >
    <img
      :alt="title + ' cover'"
      :src="$store.state.image_url + thumbUrl"
      class="w-1/2 box-img-radius"
    />
    <div class="w-1/2 flex flex-col justify-between">
      <h2 class="font-bold text-lg mt-4">{{ title }}</h2>

      <div>
        <calendar-icon class="inline"></calendar-icon>
        <span class="inline mx-1 color-box-detail text-sm">{{
          releaseDate
        }}</span>
        <div class="mb-4 mt-2">
          <ul>
            <li
              v-for="(genre, key) in genres"
              :key="key"
              class="text-sm color-box-detail"
            >
              {{ genre }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import CalendarIcon from "./CalendarIcon";

export default {
  name: "MovieBox",
  components: { CalendarIcon },
  props: {
    id: Number,
    thumbUrl: String,
    title: String,
    releaseDate: String,
    genres: Array,
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.box-radius {
  border-radius: 6px;
}

.box-img-radius {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.border-box {
  @apply border;
  border-color: rgba(196, 196, 196, 1);
}

.movie-box {
  background-color: rgba(241, 241, 241, 1);
}

.color-box-detail {
  color: rgba(78, 78, 78, 1);
}

ul li {
  display: inline;
}

ul li:not(:last-child):after {
  content: "\2022";
}
</style>
