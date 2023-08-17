<script setup>
import { computed, onMounted, ref } from 'vue';
import {useRoute} from 'vue-router'
import { useMoviesStore } from '../stores/movies';

const movieStore = useMoviesStore()
const route = useRoute()
const {id} = route.params
const date = ref('')

onMounted(async () => {
    await movieStore.getMovie(id)
    await movieStore.getCast(id)
    date.value = movieStore.movie?.release_date
})

const getYear = computed(() => {
    const year = new Date(date).getFullYear()
    return year
})

const twoNumbers = computed(() => {
    const num = parseFloat(movieStore.movie?.vote_average)
    return Math.round( num * 10 ) / 10

})



</script>

<template>
    <header class="w-full h-22 relative h-full md:h-[400px] lg:h-[600px]" v-if="movieStore.movies">
        <img class="w-full opacity-40 h-auto lg:h-full absolute -z-50" :src="`https://image.tmdb.org/t/p/original${movieStore.movie.backdrop_path}`" alt="">
        <div class="z-20 px-10 lg:px-32 py-10 flex flex-col lg:flex-row gap-5 lg:gap-20">
            <div class="flex items-center mx-h-[570px]">
                <img class="w-auto max-h-[570px] mx-auto lg:mx-0 rounded-xl" :src="`https://image.tmdb.org/t/p/original${movieStore.movie.poster_path}`" alt="">
            </div>
            <div class="mt-10">
                <h1 class="text-white text-3xl font-bold">{{ movieStore.movie.original_title }} <span class="font-normal">({{getYear}})</span></h1>
                <p class="text-white font-light">{{ movieStore.movie.release_date }} <span>({{movieStore.movie.original_language}})</span></p>
                <h3 class="text-gray-300 mt-5 uppercase">Géneros</h3>
                <ul class="flex gap-3">
                    <li class="text-white" v-for="genre in movieStore.movie.genres" :key="genre.id">
                        {{genre.name}}
                    </li>
                </ul>
                <div class="flex items-center mt-3 gap-2">
                    <div class="bg-gray-900 w-10 h-10 rounded-full">
                        <div class="flex justify-center items-center h-full text-xs text-white  border-2 rounded-full w-10 border-green-500"
                            >
                            {{ twoNumbers }}
                        </div>
                    </div>
                    <p class="text-white">Puntuación de usuarios</p>
                </div>
                <p class="mt-2 text-gray-300">{{ movieStore.movie.tagline }}</p>
                <h3 class="mt-3 text-xl text-white font-semibold">Vista General</h3>
                <p class="text-gray-300 text-md">{{ movieStore.movie.overview }}</p>
            </div>
        </div>
    </header>
    <section class="max-w-7xl mx-auto lg:p-0 mt-10 p-5">
        <h2 class="text-white text-2xl font-semibold">Reparto principal</h2>
        <div class="carousel carousel-center w-4/5 lg:w-full p-4 space-x-4 bg-neutral rounded-box px-5">
            <div class="carousel-item flex flex-col" v-for="item in movieStore.sliceCast" :key="item.id">
                <img :src="`https://image.tmdb.org/t/p/original${item.profile_path}`" class="rounded-box w-20 h-auto" />
                <p class="text-center mt-1 text-white text-sm">hola</p>
            </div> 
            <div class="flex items-center w-full mx-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </section>
</template>


<style scoped>
 
</style>
