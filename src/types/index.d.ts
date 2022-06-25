interface DiscogsCollectionFilter {
  limit?: number
  sort?: string
}

interface DiscogsFormats {
  name: string
  qty: string
  text?: string
  descriptions: string[]
}

interface DiscogsLabels {
  name: string
  catno: string
  entity_type: string
  entity_type_name: string
  id: number
  resource_url: string
}

interface DiscogsArtists {
  name: string
  anv: string
  join: string
  role: string
  tracks: string
  id: number
  resource_url: string
}

interface DiscogsReleaseBasicInformation {
  id: number
  master_id: number
  master_url: string
  resource_url: string
  thumb: string
  cover_image: string
  title: string
  year: number
  formats: DiscogsFormats[]
  labels: DiscogsLabels[]
  artists: DiscogsArtists[]
  genres: string[]
  styles: string[]
}

export interface DiscogsReleaseItem {
  id: number
  instance_id: number
  date_added: string
  rating: number
  basic_information: DiscogsReleaseBasicInformation
}

export interface DiscogsReleaseResponse {
  data: {
    releases: DiscogsReleaseItem[]
  }
}

export interface FormattedCollection {
  title: string
  artists: string[]
  genres: string[]
  releaseYear: number
  dateAdded: string
  label: string
  image: string
}

export interface AlbumCollection {
  albums: FormattedCollection[]
}

export interface LambdaResponseProps {
  statusCode: number
  error?: boolean
}

export type LambdaResponse = (response: object) => ResponseBody

export interface ResponseBody {
  body: string
  statusCode: number
  headers?: object
}
