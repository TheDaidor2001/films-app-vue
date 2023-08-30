<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "../stores/movies";

const movieStore = useMoviesStore();
const route = useRoute();
const { id } = route.params;
const date = ref("");

onMounted(async () => {
  await movieStore.getMovie(id);
  await movieStore.getCast(id);
  await movieStore.getRecomendedFilms(id)
  date.value = movieStore.movie?.release_date;
});

const getYear = computed(() => {
  const year = new Date(date).getFullYear();
  return year;
});

const twoNumbers = computed(() => {
  const num = parseFloat(movieStore.movie?.vote_average);
  return Math.round(num * 10) / 10;
});
</script>

<template>
  <header class="w-full h-22 relative h-full md:h-[400px] lg:h-[600px]" v-if="movieStore.movies">
    <img class="w-full opacity-40 h-auto lg:h-full absolute -z-50"
      :src="`https://image.tmdb.org/t/p/original${movieStore.movie.backdrop_path}`" alt="" />
    <div class="z-20 px-10 lg:px-32 py-10 flex flex-col lg:flex-row gap-5 lg:gap-20">
      <div class="flex items-center mx-h-[570px]">
        <img class="w-auto max-h-[570px] mx-auto lg:mx-0 rounded-xl"
          :src="`https://image.tmdb.org/t/p/original${movieStore.movie.poster_path}`" alt="" />
      </div>
      <div class="mt-10">
        <h1 class="text-white text-3xl font-bold">
          {{ movieStore.movie.original_title }}
          <span class="font-normal">({{ getYear }})</span>
        </h1>
        <p class="text-white font-light">
          {{ movieStore.movie.release_date }}
          <span>({{ movieStore.movie.original_language }})</span>
        </p>
        <h3 class="text-gray-300 mt-5 uppercase">Géneros</h3>
        <ul class="flex gap-3">
          <li class="text-white" v-for="genre in movieStore.movie.genres" :key="genre.id">
            {{ genre.name }}
          </li>
        </ul>
        <div class="flex items-center mt-3 gap-2">
          <div class="bg-gray-900 w-10 h-10 rounded-full">
            <div
              class="flex justify-center items-center h-full text-xs text-white border-2 rounded-full w-10 border-green-500">
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
  <section class="max-w-7xl mx-auto lg:p-0 mt-10 md:mt-[600px] lg:mt-10 p-5">
    <h3 class="text-white text-2xl font-semibold text-center">Reparto principal</h3>
    <div class="overflow-x-scroll flex gap-5 mt-5">
      <div class="w-20 flex-none first:pl-6 last:pr-6" v-for="item in movieStore.sliceCast" :key="item.id">
        <div>
          <img v-if="item?.profile_path" class="rounded-lg min-h-16"
            :src="`https://image.tmdb.org/t/p/original${item.profile_path}`" alt="" />
          <img class="rounded-lg min-h-16" v-else
            src="https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg" alt="">
        </div>
        <p class="w-2/3">{{ item.name }}</p>
      </div>
    </div>
  </section>
  <section class="max-w-7xl mx-auto lg:p-0 my-10 p-5">
    <h3 class="text-2xl font-bold text-white">Recomendaciones</h3>
    <div class="overflow-x-scroll flex gap-5 mt-5">
      <div class="w-60 flex-none first:pl-6 last:pr-6 mb-5" v-for="item in movieStore.recomendedFilms" :key="item.id">
        <routerLink :to="`/movies/${item.id}`" @click="movieStore.getMovie(item.id)">
          <img class="rounded-lg h-32"
          v-if="item?.backdrop_path"
          :src="`https://image.tmdb.org/t/p/original${item?.backdrop_path}`" alt="" />
          <img class="rounded-lg h-32 w-full"
          v-else
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png" alt="" />
        </routerLink>
        <div class="flex justify-between mt-3 pr-3">
          <p class="w-2/3 truncate text-white">{{ item.title }}</p>
          <p class="text-gray-300 text-sm">{{ Number(item.vote_average.toFixed(1) *10) }}%</p>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped></style>
