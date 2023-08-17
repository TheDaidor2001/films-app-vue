import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useSeriesStore = defineStore('series', () => {

    const ratedSeries = ref([])

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWY2N2FmNzI4YzhjNTcwMzQ2NzdiYjUxYjY5NzFlYyIsInN1YiI6IjY0YWQxYmVlM2UyZWM4MDEyZWU1MWU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sm3I0UCPBWBI4l0zasmEXSuwZ6UcHai8UGNp5PdWVII'
        }
    };
    async function getRatedSeries() {


        try {
            const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=es-ES', options)
            const data = await res.json()
            ratedSeries.value = data.results
        } catch (error) {
            console.log(error);
        }
    }

    return {
        ratedSeries,
        getRatedSeries,
    }
})