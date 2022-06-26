import { Config } from '@jest/types'
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)'],
  reporters: [
    'jest-tap-reporter',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Discogs-Neo4j Reporter'
      }
    ]
  ]
}
export default config
