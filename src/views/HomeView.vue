<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
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
  <header class="w-full lg:h-[600px] h-auto py-20 relative overflow-hidden flex flex-col place-content-center">
    <img class="-z-10 w-full h-96 sm:h-auto absolute top-0 left-0 object-center opacity-25"
      :src="`https://image.tmdb.org/t/p/original${moviesStore.movies[0]?.backdrop_path}`"
      :alt="moviesStore.movies[0]?.title">
    <div class="text-center px-5 h-full max-w-5xl m-auto">
      <h1 class="text-8xl text-white mt-">Films App</h1>
      <p class="text-2xl text-white mt-5">Busca la proxima serie o pelicula que deseas ver y evakua las reseñas y las
        opiniones de la gente sobre esa pelicula </p>
      <form class="flex items-center mt-10">
        <label for="voice-search" class="sr-only">Buscar</label>
        <div class="relative w-full">
          <input type="text" id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Ej: Avengers, Star Wars... etc" required>
        </div>
        <button type="submit"
          class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>Search
        </button>
      </form>
    </div>
  </header>
  <div class="max-w-7xl mx-auto p-10 lg:p-0">
    <section>
      <h2 class="ml-5 text-white text-xl font-semibold mt-10">Tendencias</h2>
      <div class="overflow-x-scroll flex">
        <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="movie in moviesStore.sliceMovies"
          :key="movie.id">
          <div class="mb-2 relative">
            <img class="shadow-lg w-auto h-72" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
            <div
              class="absolute top-5 text-sm left-2 radial-progress bg-green-500 text-primary-content border-4 border-green-500"
              :style="`--value:${movie.vote_average * 10}; --size:2rem;`">{{ movie.vote_average }}</div>
          </div>
          <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${movie.id}`">{{ movie.title
          }}</RouterLink>
          <p>{{ movie.release_date }}</p>
        </div>
      </div>
    </section>
    <section class="pt-5">
      <h2 class="ml-5 text-white text-xl font-semibold">Próximos Estrenos</h2>
      <div class="overflow-x-scroll flex">
        <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="movie in moviesStore.futureFilms"
          :key="movie.id">
          <div class="mb-2 relative">
            <img class=" w-auto h-72" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="">
            <div
              class="absolute top-5 text-sm left-2 radial-progress bg-green-500 text-primary-content border-4 border-green-500"
              :style="`--value:${movie.vote_average * 10}; --size:2rem;`">{{ movie.vote_average }}</div>
          </div>
          <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${movie.id}`">{{ movie.title
          }}</RouterLink>
          <p>{{ movie.release_date }}</p>
        </div>
    </div>
  </section>
  <section class="pt-5">
    <h2 class="ml-5 text-white text-xl font-semibold">Series de TV</h2>
    <div class="overflow-x-scroll flex">
      <div class=" w-48 flex-none py-6 px-3 first:pl-6 last:pr-6" v-for="serie in seriesStore.ratedSeries"
        :key="serie.id">
        <div class="mb-2">
          <img class=" w-auto h-72" :src="`https://image.tmdb.org/t/p/original${serie.poster_path}`" alt="">
        </div>
        <RouterLink class="text-md text-white font-bold hover:text-blue-500" :to="`movies/${serie.id}`">{{ serie.name }}
        </RouterLink>
        <p>{{ serie.first_air_date }}</p>
      </div>
    </div>
  </section>
</div></template>
