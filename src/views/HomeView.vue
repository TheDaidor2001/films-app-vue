<script setup>
import { computed, onMounted } from 'vue';
import {RouterLink} from 'vue-router'
import { useMoviesStore } from '../stores/movies';
import { useSeriesStore } from '../stores/series';

const moviesStore = useMoviesStore()
const seriesStore = useSeriesStore()

onMounted(() => {
    moviesStore.getMovies()
    moviesStore.getFutureFilms()
    seriesStore.getRatedSeries()
})



</script>

<template>
  <div class="max-w-7xl mx-auto p-10 lg:p-0">
    <header class="w-full h-auto py-20 relative overflow-hidden">
      <img class="absolute top-0 left-00 -z-50 opacity-40 h-full lg:h-auto" src="/mario.jpeg" alt="">
      <div class="p-10">
        <h1 class="text-white text-4xl">Bienvenidos</h1>
        <p class="text-white text-lg">Descubre una gran variedad de peliculas y series de televisión</p>
        <input type="text" placeholder="Ej: Super-man, Hunger Games" class="input input-bordered w-full mt-5"/>
      </div>
    </header>
    <section>
      <h2 class="ml-5 text-white text-xl font-semibold mt-10">Tendencias</h2>
    <div class="overflow-x-scroll flex">
      <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="movie in moviesStore.sliceMovies" :key="movie.id">
        <div class="mb-2 relative">
          <img class=" w-auto h-72" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
          <div class="absolute top-5 text-sm left-2 radial-progress bg-green-500 text-primary-content border-4 border-green-500"  :style="`--value:${movie.vote_average * 10}; --size:2rem;`">{{ movie.vote_average }}</div>
        </div>
        <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${movie.id}`">{{ movie.title }}</RouterLink>
        <p>{{ movie.release_date }}</p>
      </div>
    </div>
    </section>
    <section class="pt-5">
      <h2 class="ml-5 text-white text-xl font-semibold">Próximos Estrenos</h2>
    <div class="overflow-x-scroll flex">
      <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="movie in moviesStore.futureFilms" :key="movie.id">
        <div class="mb-2 relative">
          <img class=" w-auto h-72" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
          <div class="absolute top-5 text-sm left-2 radial-progress bg-green-500 text-primary-content border-4 border-green-500"  :style="`--value:${movie.vote_average * 10}; --size:2rem;`">{{ movie.vote_average }}</div>
        </div>
        <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${movie.id}`">{{ movie.title }}</RouterLink>
        <p>{{ movie.release_date }}</p>
      </div>
    </div>
    </section>
    <section class="pt-5">
      <h2 class="ml-5 text-white text-xl font-semibold">Series de TV</h2>
    <div class="overflow-x-scroll flex">
      <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="serie in seriesStore.ratedSeries" :key="serie.id">
        <div class="mb-2">
          <img class=" w-auto h-72" :src="`https://image.tmdb.org/t/p/original${serie.poster_path}`" alt="">
        </div>
        <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${serie.id}`">{{ serie.name }}</RouterLink>
        <p>{{ serie.first_air_date }}</p>
      </div>
    </div>
    </section>
  </div>
</template>
