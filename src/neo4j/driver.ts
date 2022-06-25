import neo4j, { Driver, Session } from 'neo4j-driver'
import retry from 'async-retry'
import { DriverInitResponse } from '../types'

let driver: Driver

const initDriver: DriverInitResponse = async (uri, username, password) => {
  // if connection fails, retry 3 times with 5sec timeout.
  const driverConnection = await retry(
    async () => {
      driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
      const session: Session = await driver
        .verifyConnectivity()
        .then(getSession)
        .catch((e) => e)
      return session
    },
    {
      retries: 3,
      minTimeout: 10,
      maxTimeout: 10
    }
  )

  return driverConnection
}

const getSession: () => Session = () => driver.session()

export { initDriver, getSession }
