import {
  mockDiscogsReleases,
  successfulReleasesResponse
} from './__mocks__/data'
import { formatAlbumCollection } from '../src/utils/formatter'
import { asyncPipe } from '../src/utils/pipe'
import { composeSuccessResponse } from '../src/utils/responses'

describe('asyncPipe unit test', () => {
  it('should format album collection and return in lambda response', async () => {
    const actual = await asyncPipe(
      formatAlbumCollection,
      composeSuccessResponse
    )(mockDiscogsReleases)
    const expected = successfulReleasesResponse
    expect(actual).toEqual(expected)
  })
})
