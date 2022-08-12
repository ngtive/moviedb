<template>
  <img :alt="iso" :src="flagSvg" class="w-8 rounded-full border"/>
</template>

<script>
export default {
    name: "Flag",
    props: {
        iso: String,
    },

    computed: {
        flagSvg() {
            if (!this.iso) {
                return null;
            }

            return "/assets/icons/flags/" + this.iso.toLowerCase() + ".svg";
        },
    },
};
</script>

<style scoped></style>
