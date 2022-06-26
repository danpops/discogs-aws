import {
  mockDiscogsRelaseNoCoverImage,
  mockDiscogsRelaseNoFormatDescriptions,
  mockDiscogsReleases,
  mockFormattedDiscogsRelease,
  mockFormattedReleaseEmptyFormatType,
  mockFormattedReleaseNoImage
} from './__mocks__/data'
import {
  formatAlbumCollection,
  mapAlbumCollection
} from '../src/utils/formatter'

describe('formatter unit test', () => {
  describe('formatAlbumCollection', () => {
    it('should return correctly formatted colelction', () => {
      const actual = formatAlbumCollection(mockDiscogsReleases)
      const expected = mockFormattedDiscogsRelease
      expect(actual).toEqual(expected)
    })
  })
  describe('mapAlbumCollection', () => {
    it('should return correctly formatted colelction', () => {
      const actual = mapAlbumCollection(mockDiscogsReleases.data.releases[0])
      const expected = mockFormattedDiscogsRelease.albums[0]
      expect(actual).toEqual(expected)
    })
    it('should return empty array for format.type if no format descriptions', () => {
      const actual = mapAlbumCollection(mockDiscogsRelaseNoFormatDescriptions)
      const expected = mockFormattedReleaseEmptyFormatType
      expect(actual).toEqual(expected)
    })
    it('should return empty string for image if no cover_image', () => {
      const actual = mapAlbumCollection(mockDiscogsRelaseNoCoverImage)
      const expected = mockFormattedReleaseNoImage
      expect(actual).toEqual(expected)
    })
  })
})
