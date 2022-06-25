import { LambdaResponse, LambdaResponseProps } from '../types'

const composeErrorResponse = composeLambaResponse({
  statusCode: 400,
  error: true
})
const composeSuccessResponse = composeLambaResponse({ statusCode: 200 })

function composeLambaResponse ({
  statusCode,
  error = false
}: LambdaResponseProps): LambdaResponse {
  return response => {
    return {
      statusCode,
      body: JSON.stringify(response),
      ...(!error && {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
        }
      })
    }
  }
}

export { composeErrorResponse, composeSuccessResponse }
