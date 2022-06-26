import { Result, Session, Transaction } from 'neo4j-driver'
import { APIGatewayEvent, APIGatewayProxyCallback, Callback, Context, Handler } from 'aws-lambda'

export interface DiscogsApiProps {
  limit?: number
  sort?: string
  discogsUrl?: string
}
interface DiscogsFormats {
  name: string
  qty: string
  text?: string
  descriptions?: string[]
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
  cover_image?: string
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
  format: {
    name: string
    type: string[]
  }
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
  data?: object
}
export type DriverInitResponse = (
  uri: string,
  username: string,
  password: string
) => Promise<Session>
export type ComposeNeo4jDiscogsTranscation = (records: AlbumCollection) => (tx: Transaction) => Result
export type TransactionWork<T> = (tx: Transaction) => Promise<T> | T
export type DumpCollectionToNeo4j = (init: any) => Promise<any>
export type GraphQLLambdaHandler = (event: APIGatewayEvent,
  context: Context,
  callback: APIGatewayProxyCallback) => Promise<(event: any, context: Context, callback: Callback<any>) => Promise<any>>
export type InitGraphQLServer = Promise<Handler<any, any>>
