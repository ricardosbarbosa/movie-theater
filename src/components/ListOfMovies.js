import React from 'react'
import { Card, Image, Rate, Typography, Tag, Space } from 'antd'
import { UserSwitchOutlined } from '@ant-design/icons'

export const ListOfMovies = ({ movies, onMovieClick }) => {
  return movies
    .map(movie => (
      <Card
        key={movie.id}
        onClick={() => onMovieClick?.(movie.id)}
        hoverable
        style={{ width: 220 }}
        cover={
          <Image
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            width={220}
            onClick={e => e.stopPropagation()}
          />
        }
      >
        <Card.Meta
          title={movie.title}
          description={(
            <Space direction='horizontal'>
              <Typography>{movie.vote_average}</Typography>
              <Rate defaultValue={movie.vote_average / 2} disabled  allowHalf/>
            </Space>
          )}
        />
        <Tag
          icon={<UserSwitchOutlined />}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            margin: '10px',
          }}
        >
          {movie.popularity}
        </Tag>
      </Card>
    )
  )
}
