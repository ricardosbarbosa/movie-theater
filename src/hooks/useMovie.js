import { useQuery } from "react-query"
import { getMovieById } from "../services/themoviedb"

export default function useMovie(id) {
  const { data } = useQuery(
    ['movie', id],
    () => getMovieById(id),
    { enabled: !!id }
  )
  return data?.data
}

