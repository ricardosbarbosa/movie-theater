import { useQuery } from "react-query"
import { search } from "../services/themoviedb"

export default function useSearchMovies(query) {
  const { data } = useQuery(
    ['search-movies', query],
    () => search({ query }),
    { enabled: !!query }
  )
  return data?.data.results || []
}

