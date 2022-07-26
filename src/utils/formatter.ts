import {
  AlbumCollection,
  DiscogsFormats,
  DiscogsLabels,
  DiscogsReleaseItem,
  DiscogsReleaseResponse,
  FormatInfo,
  FormattedCollection,
  LabelInfo
} from '../types'

function formatDateAdded (date: string): string {
  const fullDate = new Date(date)
  const dateAdded = fullDate.toISOString().slice(0, 10)
  return dateAdded
}

function formatAlbumCollection (res: DiscogsReleaseResponse): AlbumCollection {
  const { releases } = res.data
  const albums = releases.map(mapAlbumCollection)
  return { albums }
}

function handleError (error: any): any {
  console.log(error)
  return error
}

function mapPressingInfo (format: DiscogsFormats): FormatInfo {
  const { name, descriptions } = format
  const description = descriptions !== undefined ? descriptions : []
  return {
    name,
    description
  }
}
function mapLabels (label: DiscogsLabels): LabelInfo {
  const { name, catno } = label
  return {
    name,
    catno
  }
}

function mapAlbumCollection (item: DiscogsReleaseItem): FormattedCollection {
  const dateAdded = formatDateAdded(item.date_added)
  const format = item.basic_information.formats.map(mapPressingInfo) ?? []
  const variant = item.basic_information.formats.map(f => f.text ?? '') ?? []
  const response = {
    title: item.basic_information.title,
    artists: item.basic_information.artists.map(artist => artist.name),
    genres: item.basic_information.genres,
    styles: item.basic_information.styles,
    format,
    variant,
    releaseYear: item.basic_information.year,
    dateAdded,
    label: item.basic_information.labels.map(mapLabels) ?? [],
    image: item.basic_information.cover_image ?? ''
  }
  return response
}

export { formatAlbumCollection, handleError, mapAlbumCollection }
