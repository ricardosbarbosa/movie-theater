import { useQuery } from "react-query"
import { discover } from "../services/themoviedb"

export default function useMovies() {
  const { data } = useQuery('movies', discover)
  return data?.data.results || []
}

