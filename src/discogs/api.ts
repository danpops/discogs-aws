import axios from 'axios'
import { formatAlbumCollection } from '../utils/formatter'
import { DiscogsApiProps, ResponseBody } from '../types'
import { asyncPipe } from '../utils/pipe'
import { discogsUrl, discogsUsername, headers } from './headers'

const DISCOGS_URL: string = `${discogsUrl}/users/${discogsUsername}/collection/folders/0/releases`

async function fetchDiscogsApi ({
  limit = 50,
  sort = 'artist'
}: DiscogsApiProps): Promise<ResponseBody> {
  const filter: string = `?per_page=${limit}&page=1&sort=${sort}`

  const results: ResponseBody = await axios.get(
    `${DISCOGS_URL}${filter}`,
    headers
  )

  return results
}

const fetchAlbumCollection = asyncPipe(fetchDiscogsApi, formatAlbumCollection)

export { fetchAlbumCollection, fetchDiscogsApi }
