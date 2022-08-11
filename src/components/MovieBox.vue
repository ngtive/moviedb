<template>
    <div class="border movie-box border-box box-radius p-1 flex flex-nowrap">
        <img :src="$store.state.image_url + thumbUrl" :alt="title + ' cover'"
             class="w-1/2 box-img-radius">
        <div class="w-1/2">
            <h2 class="font-bold">Marvel Avengers Assemble</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "MovieBox",
    props: {
        thumbUrl: String,
        title: String,
        releaseDate: String,
    },
    data: function () {
        return {

        }
    }
}
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

</style>