import {
  mockDiscogsReleases,
  successfulReleasesResponse
} from './__mocks__/data'
import { formatAlbumCollection } from '../src/utils/formatter'
import { asyncPipe } from '../src/utils/pipe'
import { composeSuccessResponse } from '../src/utils/responses'

describe('asyncPipe unit test', () => {
  it('should invoke fn 3 times to add 5 to initial value', async () => {
    const fn = (a: number): number => a + 5
    const initalValue = 0
    const actual = await asyncPipe(fn, fn, fn)(initalValue)
    const expected = 15
    expect(actual).toEqual(expected)
  })
  it('should format album collection and return in lambda response', async () => {
    const actual = await asyncPipe(
      formatAlbumCollection,
      composeSuccessResponse
    )(mockDiscogsReleases)
    const expected = successfulReleasesResponse
    expect(actual).toEqual(expected)
  })
})
