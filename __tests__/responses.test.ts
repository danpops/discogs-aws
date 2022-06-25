import { composeErrorResponse, composeSuccessResponse } from '../src/utils/responses'

describe('responses unit test', () => {
  describe('composeLambdaError', () => {
    it('should return error response with status 400 without headers', () => {
      const actual = composeErrorResponse({ message: 'Error!' })
      const expected = {
        statusCode: 400,
        body: JSON.stringify({ message: 'Error!' })
      }
      expect(actual).toEqual(expected)
    })
    it('should return success response with status 200 with headers', () => {
      const actual = composeSuccessResponse({ message: 'Success!' })
      const expected = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
        }
      }
      expect(actual).toEqual(expected)
    })
  })
})
