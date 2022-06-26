import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer'
import { ApolloServer } from 'apollo-server-lambda'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { typeDefs } from './gql/typeDefs'
import { getDriver } from './neo4j/driver'
import { GraphQLLambdaHandler, InitGraphQLServer } from './types'

const { neo4jUri = '', neo4jUser = '', neo4jPassword = '' } = process.env

const neoDriver = getDriver(neo4jUri, neo4jUser, neo4jPassword)
const neoSchema = new Neo4jGraphQL({ typeDefs, driver: neoDriver })

async function initServer (): InitGraphQLServer {
  const schema = await neoSchema.getSchema()
  const server = new ApolloServer({
    schema,
    context: (ctx: LambdaContextFunctionParams) => ({ req: ctx.event }),
    introspection: true
  })
  return server.createHandler()
}

const graphqlHandler: GraphQLLambdaHandler = async (
  event,
  context,
  callback
) => {
  const serverHandler = await initServer()
  return await serverHandler(
    {
      ...event,
      requestContext: event.requestContext
    },
    context,
    callback
  )
}

export { graphqlHandler }
