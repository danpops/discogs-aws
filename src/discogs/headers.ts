import { AxiosRequestConfig } from 'axios'

const { discogsApiKey = '', discogsUrl = '', discogsUsername = '' } = process.env

const headers: AxiosRequestConfig = {
  headers: {
    Authorization: `Discogs token=${discogsApiKey}`
  }
}

export { headers, discogsUrl, discogsUsername }
