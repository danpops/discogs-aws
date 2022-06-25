import type { Config } from '@jest/types'
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/tests/**/?(*.)+(spec|test).[tj]s?(x)']
}
export default config
