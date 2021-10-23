import { Image } from 'antd'
import React from 'react'

export const ListOfMovies = ({ movies, onMovieClick }) => {
  return movies
    .map(movie => (
      <Image
        key={movie.id}
        style={{ borderRadius: 10 }}
        width={200}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        preview={false}
        onClick={() => onMovieClick?.(movie.id)}
      />
    ))
}
