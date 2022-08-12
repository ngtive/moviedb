<template>
    <div>
        <div class="flex">
            <button class="pagination-link"
                    :disabled="currentPage == 1"
                    :class="{'disabled': currentPage == 1}"
                    @click="$emit('change', currentPage - 1)">Previous Page
            </button>
            <div class="border-r border-gray-700 mx-3"></div>
            <button class="pagination-link"
                    :disabled="currentPage == totalPages"
                    :class="{'disabled': currentPage == totalPages}"
                    @click="$emit('change', currentPage + 1)">Next Page</button>
        </div>
        <div class="text-center mt-5">
            <span>Showing results {{ currentPage }}-{{ totalPages }}</span>

        </div>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        totalPages: Number,
        currentPage: Number,
    }
}
</script>

<style scoped>
</style>