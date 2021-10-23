import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000,
  params: {
    api_key: '3d3f2d237bb9c66e326266a4ac1be555'
  }
});

export const discover = () => axios.get('/discover/movie')
export const search = (params) => axios.get('/search/movie', { params })
export const getMovieById = (id) => axios.get(`/movie/${id}`)
