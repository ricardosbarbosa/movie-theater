import { Descriptions, Image, Layout, PageHeader, Rate } from 'antd';
import useMovie from '../hooks/useMovie';
import { useHistory, useParams } from 'react-router';

const { Content } = Layout;

function Movie() {
  const { id } = useParams()
  const history = useHistory()
  const movie = useMovie(id)

  if (!movie) return null 
  return (
    <Layout>
      <PageHeader
        onBack={() => history.goBack()}
        title={movie.title}
        subTitle={<Rate defaultValue={movie.vote_average} disabled/>}
      >
        <Descriptions column={4}>
          <Descriptions.Item label="Adulte">{movie.adult ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Genres">{movie.genres.map(genre => genre.name)}</Descriptions.Item>
          <Descriptions.Item label="Homepage"><a href={movie.homepage} >{movie.homepage}</a></Descriptions.Item>
          <Descriptions.Item label="Original Title">{movie.original_title}</Descriptions.Item>
          <Descriptions.Item label="Production Companies">{movie.production_companies.map(production_companie => production_companie.name)}</Descriptions.Item>
          <Descriptions.Item label="Production Countries">{movie.production_countries.map(production_country => production_country.name)}</Descriptions.Item>
          <Descriptions.Item label="Spoken Languages">{movie.spoken_languages.map(spoken_language => spoken_language.english_name)}</Descriptions.Item>
          <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
          <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
          <Descriptions.Item label="Vote Count">{movie.vote_count}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Content className={"movie"}>
        <Image
          key={movie.id}
          style={{ borderRadius: 10 }}
          alt={movie.title}
          width={300}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
        <Descriptions.Item label="Overview">{movie.overview}</Descriptions.Item>
      </Content>
    </Layout>
  );
}

export default Movie;
