import {
  mockDiscogsReleases,
  mockFormattedDiscogsRelease
} from '../../../__mocks__/data'
import { formatAlbumCollection } from '../formatter'

describe('formatter unit test', () => {
  describe('formatAlbumCollection', () => {
    it('should return correctly formatted colelction', () => {
      const actual = formatAlbumCollection(mockDiscogsReleases)
      const expected = mockFormattedDiscogsRelease
      expect(actual).toEqual(expected)
    })
  })
})
