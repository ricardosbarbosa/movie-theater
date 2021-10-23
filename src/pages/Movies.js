import { Empty, Input, Layout, Rate } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { ListOfMovies } from '../components/ListOfMovies';
import useMovies from '../hooks/useMovies';
import useSearchMovies from '../hooks/useSearchMovies';

const { Content } = Layout;

function Movies() {
  const [query, setQuery] = useState('')
  const [voteAverage, setVoteAverage] = useState(5)
  const history = useHistory()

  const discoveredMovies = useMovies()
  const searchedMovies = useSearchMovies(query)

  const handleInputSearch = e => {
    const query = e.target.value
    setQuery(query)
    if (query.trim().length === 0) {
      setVoteAverage(5)
    }
  }

  const handleRateChange = value => {
    if (value === 0) setVoteAverage(5)
    else if (value !== voteAverage ) setVoteAverage(value)
  }
  
  const handleMovieClick = (movieId) => history.push(`/movies/${movieId}`)

  const filterMovieByRate = movie => {
    if (voteAverage === 0)
      return false
    const max = voteAverage * 2
    const min = voteAverage * 2 - 2
    return movie.vote_average > min && movie.vote_average <= max
  }

  const sortMoviesByPopularity = (firstMovie, secondMovie) => {
    return firstMovie.popularity - secondMovie.popularity
  }
  
  const ratedMovies = searchedMovies
    .filter(filterMovieByRate)
    .sort(sortMoviesByPopularity)

  const discoveredMoviesSortedByPopularity = discoveredMovies
    .sort(sortMoviesByPopularity)
  const queryIsEmpty = query.trim().length === 0
  const notFoundSearchedMovies = searchedMovies.length === 0

  return (
    <Layout>
      <Content className="site-layout" >
        
        <Content className='banner'>
          <Input.Search value={query} onChange={handleInputSearch} allowClear />
          <Rate value={voteAverage} onChange={handleRateChange} />
        </Content>

        <Content className="site-layout-background">
          <Content className="site-layout-background">
            {/* discovered movies when query is empty */}
            {queryIsEmpty && (
              <ListOfMovies
                movies={discoveredMoviesSortedByPopularity}
                onMovieClick={handleMovieClick}
              />
            )}
            
            {/* searched movies when the user is searching */}
            {!queryIsEmpty && !notFoundSearchedMovies && (
              <ListOfMovies
                movies={ratedMovies}
                onMovieClick={handleMovieClick}
              />
            )}
            
            {/* Empty when there is no movie to show */}
            {query.trim().length !== 0 && notFoundSearchedMovies && (
              <Empty description="No movie found" />
            )}
          </Content>
        </Content>
      </Content>
    </Layout>
  );
}

export default Movies;
