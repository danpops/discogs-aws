import {
  AlbumCollection,
  DiscogsReleaseItem,
  DiscogsReleaseResponse,
  FormattedCollection
} from '../types'

function formatDateAdded (date: string): string {
  const fullDate = new Date(date)
  const dateAdded = fullDate.toISOString().slice(0, 10)
  return dateAdded
}

function formatAlbumCollection (res: DiscogsReleaseResponse): AlbumCollection {
  const releases = res.data.releases
  const albums = releases.map(mapAlbumCollection)
  return { albums }
}

function mapAlbumCollection (item: DiscogsReleaseItem): FormattedCollection {
  const dateAdded = formatDateAdded(item.date_added)
  return {
    title: item.basic_information.title,
    artists: item.basic_information.artists.map(artist => artist.name),
    genres: item.basic_information.genres.concat(item.basic_information.styles),
    releaseYear: item.basic_information.year,
    dateAdded,
    label: item.basic_information.labels[0].name,
    image: item.basic_information.cover_image ?? ''
  }
}

export { formatAlbumCollection }
