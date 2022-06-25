import { LambdaContextFunctionParams } from 'apollo-server-lambda/dist/ApolloServer'
import { APIGatewayEvent, APIGatewayProxyCallback, Callback, Context, Handler } from 'aws-lambda'
import { ApolloServer } from 'apollo-server-lambda'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { typeDefs } from './gql/typeDefs'
import { neo4jDriver } from './neo4j/driver'

const { neo4jUri = '', neo4jUser = '', neo4jPassword = '' } = process.env

const driver = neo4jDriver(neo4jUri, neo4jUser, neo4jPassword)
const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

const initServer = async (): Promise<Handler<any, any>> => {
  const schema = await neoSchema.getSchema()
  const server = new ApolloServer({
    schema,
    context: (ctx: LambdaContextFunctionParams) => ({ req: ctx.event }),
    introspection: true
  })
  return server.createHandler()
}

export const graphqlHandler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: APIGatewayProxyCallback
): Promise<(event: any, context: Context, callback: Callback<any>) => Promise<any>> => {
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
