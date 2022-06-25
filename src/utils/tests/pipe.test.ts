import {
  mockDiscogsReleases,
  successfulReleasesResponse
} from '../../../__mocks__/data'
import { formatAlbumCollection } from '../formatter'
import { asyncPipe } from '../pipe'
import { composeLambdaSuccess } from '../responses'

describe('asyncPipe unit test', () => {
  it('should format album collection and return in lambda response', async () => {
    const actual = await asyncPipe(
      formatAlbumCollection,
      composeLambdaSuccess
    )(mockDiscogsReleases)

    const expected = successfulReleasesResponse
    expect(actual).toEqual(expected)
  })
})
