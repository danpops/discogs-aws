import { Neo4jError } from 'neo4j-driver'
import { initDriver } from './neo4j/driver'
import { dumpDiscogsReleasesToNeo4j } from './neo4j/mutation'
import { ResponseBody } from './types'
import {
  composeErrorResponse,
  composeSuccessResponse
} from './utils/responses'

export { handler }

const { neo4jUri = '', neo4jUser = '', neo4jPassword = '' } = process.env

async function handler (): Promise<ResponseBody> {
  const neo4j = await initDriver(neo4jUri, neo4jUser, neo4jPassword)

  if (neo4j instanceof Neo4jError) {
    return composeErrorResponse(neo4j)
  }

  const options = { limit: 500, sort: 'artist' }
  const output = await dumpDiscogsReleasesToNeo4j(neo4j)(options)
    .then(composeSuccessResponse)
    .catch(composeErrorResponse)

  return output
}
