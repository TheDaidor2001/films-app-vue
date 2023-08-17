<script setup>
import { onMounted, computed } from 'vue';
import { useMoviesStore } from '../stores/movies';
import { RouterLink } from 'vue-router';

const moviesStore = useMoviesStore()

onMounted(() => {
    moviesStore.getMovies()
})

const noteColor = computed(() => {
    const note = parseInt(moviesStore.movies.vote_average)
    if (note >= 6.5) {
        return 'border-green-500'
    }

    if (note < 6.5 && moviesStore.movies.vote_average >= 5) {
        return 'border-yellow-500'
    }

    if (note < 5) {
        return 'border-red-500'
    }
})

const seeMore = () => {
    moviesStore.page += 1
}
</script>

<template>
    <div class="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 place-content-center max-w-7xl mx-auto p-10 lg:p-0">
        <div v-for="movie in moviesStore.movies" :key="movie.id">
            <div class="relative mb-3">
                <img class="rounded-xl w-44" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
                <div class="bg-gray-900 w-10 h-10 rounded-full absolute top-5 left-3">
                    <div class="flex justify-center items-center h-full text-xs  border-2 rounded-full w-10 border-green-500"
                        :class="noteColor">
                        {{ movie.vote_average }}
                    </div>
                </div>
            </div>
            <RouterLink :to="`movies/${movie.id}`" class="text-lg text-white font-bold hover:text-blue-500"> {{ movie.title }}
            </RouterLink>
            <p class="text-xs mt-2">{{ movie.release_date }}</p>
        </div>
    </div>
    <div class="flex justify-center">
        <button v-if="moviesStore.laoding && moviesStore.movies.length" class="btn mx-auto mt-5 my-10">
            <span class="loading loading-spinner"></span>
            cargando
        </button>
        <button v-if="!moviesStore.laoding && moviesStore.movies.length" @click="moviesStore.seeMoreFilms()"
            class="btn mt-5 my-10 mx-auto">Ver más</button>
    </div>
</template>
