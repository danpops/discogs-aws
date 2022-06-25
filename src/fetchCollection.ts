import { fetchDiscogsUserCollection } from './discogs/api'
import { DiscogsCollectionFilter, ResponseBody } from './types'

export { handler }

async function handler (): Promise<ResponseBody> {
  const filters: DiscogsCollectionFilter = { limit: 100, sort: 'artist' }
  const output: ResponseBody = await fetchDiscogsUserCollection(filters)
  return output
}
