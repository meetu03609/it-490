import axios from "axios";

export const loaderDisplay = display => {
    document.getElementById('loader_bg').style.display = display;
};

export const movieApi = (s = 'sto', page = 1) => {
    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {s, r: 'json', page},
        headers: {
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            'X-RapidAPI-Key': '5d88969883mshc45882d27df0d7dp13cd2djsn2b3a45b10543'
        }
    };

    return axios.request(options)
}

export const movieDetailApi = (i) => {
    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {i, r: 'json'},
        headers: {
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            'X-RapidAPI-Key': '5d88969883mshc45882d27df0d7dp13cd2djsn2b3a45b10543'
        }
    };

    return axios.request(options)
}