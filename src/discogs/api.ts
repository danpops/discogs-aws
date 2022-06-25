import axios from 'axios'
import { formatAlbumCollection } from '../utils/formatter'
import {
  DiscogsReleaseResponse,
  DiscogsCollectionFilter,
  ResponseBody
} from '../types'
import { componseLambdaError, composeLambdaSuccess } from '../utils/responses'
import { asyncPipe } from '../utils/pipe'
import { discogsUrl, discogsUsername, headers } from './headers'

const composeCollectionResponse: (
  data: DiscogsReleaseResponse
) => Promise<ResponseBody> = asyncPipe(
  formatAlbumCollection,
  composeLambdaSuccess
)

async function fetchDiscogsUserCollection ({
  limit = 50,
  sort = 'artist'
}: DiscogsCollectionFilter): Promise<ResponseBody> {
  const releasesUrl: string = `${discogsUrl}/users/${discogsUsername}/collection/folders/0/releases`
  const releasesFilter: string = `?per_page=${limit}&page=1&sort=${sort}`

  const results: ResponseBody = await axios
    .get(`${releasesUrl}${releasesFilter}`, headers)
    .then(composeCollectionResponse)
    .catch(componseLambdaError)

  return results
}

export { fetchDiscogsUserCollection }
