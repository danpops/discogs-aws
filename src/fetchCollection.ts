import { fetchAlbumCollection } from './discogs/api'
import { ResponseBody } from './types'
import {
  composeErrorResponse,
  composeSuccessResponse
} from './utils/responses'

export { handler }

async function handler (): Promise<ResponseBody> {
  const output: ResponseBody = await fetchAlbumCollection({ limit: 100, sort: 'artist' })
    .then(composeSuccessResponse)
    .catch(composeErrorResponse)
  return output
}
