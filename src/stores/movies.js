import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useMoviesStore = defineStore('movies', () => {

    const movies = ref([])
    const movie = ref({})
    const cast = ref([])
    
    const laoding = ref(false)
    let page = 1

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWY2N2FmNzI4YzhjNTcwMzQ2NzdiYjUxYjY5NzFlYyIsInN1YiI6IjY0YWQxYmVlM2UyZWM4MDEyZWU1MWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sm3I0UCPBWBI4l0zasmEXSuwZ6UcHai8UGNp5PdWVII'
        }
    }

    const sliceCast = computed(() => {
        return cast.value.slice(0, 10)
    })

    async function getMovies() {
        laoding.value = true
        movies.value = []
        page = 1
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`, options)
            const data = await res.json()
            movies.value.length === 0 ? movies.value = data.results : movies.value = movies.value.concat(data.results)
           
        } catch (error) {
            console.log(error);
        }finally {
            laoding.value = false
        }
    }

    async function getMovie(id) {
        movie.value = {}
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
            const data = await res.json()
            movie.value = data
        } catch (error) {
            console.log(error);
        }
    }

    async function seeMoreFilms() {
        page += 1
        laoding.value = true
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`, options)
            const data = await res.json()
            movies.value.length === 0 ? movies.value = data.results : movies.value = movies.value.concat(data.results)
        } catch (error) {
            console.log(error);
        }finally {
            laoding.value = false
        }
    }
    async function getCast(id) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`, options)
            const data = await res.json()
            cast.value = data.cast
            console.log(cast.value.name);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        movies,
        laoding,
        movie,
        cast,
        sliceCast,
        getMovies,
        seeMoreFilms,
        getMovie,
        getCast
    }
})