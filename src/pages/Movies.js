import { Empty, Input, Layout, Rate } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { ListOfMovies } from '../components/ListOfMovies';
import useMovies from '../hooks/useMovies';
import useQuery from '../hooks/useQuery';
import useSearchMovies from '../hooks/useSearchMovies';

const { Content } = Layout;

function Movies() {
  const urlQueryParams = useQuery()
  
  const query = urlQueryParams.get('query') || ''
  
  const [voteAverage, setVoteAverage] = useState(0)
  const history = useHistory()

  const discoveredMovies = useMovies()
  const searchedMovies = useSearchMovies(urlQueryParams.get('query'))

  const handleRateChange = value => {
    if (value === voteAverage) setVoteAverage(0)
    else if (value !== voteAverage ) setVoteAverage(value)
  }
  
  const onSearchChange = (e) => {
    if (e.target.value === '') {
      history.push()
    }
  }
  const onSearch = (value) => {
    console.log({value})
    history.push({
      search: `?query=${value}`
    })
  }

  const handleMovieClick = (movieId) => history.push({
    pathname: `/movies/${movieId}`,
    search: `?query=${query}`
  })

  const filterMovieByRate = movie => {
    if (voteAverage === 0) {
      return true
    }
      
    const max = voteAverage * 2
    const min = voteAverage * 2 - 2

    return (movie.vote_average) > min && (movie.vote_average) <= max
  }

  const sortMoviesByPopularity = (firstMovie, secondMovie) => {
    return secondMovie.popularity - firstMovie.popularity
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
          <Input.Search
            defaultValue={query}
            onChange={onSearchChange}
            onSearch={onSearch}
            allowClear
          />
          <Rate
            value={voteAverage}
            onChange={handleRateChange}
            disabled={!query}
          />
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
