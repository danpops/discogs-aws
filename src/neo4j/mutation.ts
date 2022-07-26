import { Session, Transaction } from 'neo4j-driver'
import { fetchDiscogsApi } from '../discogs/api'
import {
  ComposeNeo4jDiscogsTranscation,
  DumpCollectionToNeo4j,
  TransactionWork
} from '../types'
import { formatAlbumCollection, handleError } from '../utils/formatter'
import { asyncPipe } from '../utils/pipe'

function dumpDiscogsReleasesToNeo4j (session: Session): DumpCollectionToNeo4j {
  return asyncPipe(
    fetchDiscogsApi,
    formatAlbumCollection,
    composeImportDiscogsCypher,
    mutateNeo4j(session)
  )
}

const composeSuccessTransaction = (): string =>
  'Successfully imported data to Neo4j!'

const composeImportDiscogsCypher: ComposeNeo4jDiscogsTranscation = records => {
  return (tx: Transaction) =>
    tx.run(
      `
        UNWIND $records as recordItem
        MERGE (a:Album {
          name: coalesce(recordItem.title, "N/A"), 
          albumCover: coalesce(recordItem.image, "N/A")
        })
      
        MERGE (c:Collection {name: "NowSpinningLPs"})
        MERGE (y:Year {name: recordItem.releaseYear})
      
        MERGE (a)-[:IN_COLLECTION {dateAdded: date(recordItem.dateAdded)}]->(c)
      
        FOREACH (i IN range(0, size(recordItem.artists) - 1) |
          MERGE (r:Artist {name: recordItem.artists[i]})
          MERGE (a)-[:BY_ARTIST]->(r)
        )
      
        FOREACH (i IN range(0, size(recordItem.genres) - 1) |
          MERGE (g:Genre {name: recordItem.genres[i]})
          MERGE (a)-[:HAS_GENRE]->(g)
        )

        FOREACH (i IN range(0, size(recordItem.styles) - 1) |
          MERGE (s:Style {name: recordItem.styles[i]})
          MERGE (a)-[:HAS_STYLE]->(s)
        )

        FOREACH (i IN range(0, size(recordItem.format) - 1) |
          MERGE (f:Format {name: recordItem.format[i].name})
          MERGE (a)-[:HAS_FORMAT]->(f)
        
          FOREACH (j IN range(0, size(recordItem.format[i].description) - 1) |
            MERGE (d:Description {name: recordItem.format[i].description[j]})
            MERGE (a)-[:HAS_DESCRIPTION]->(d)
          )
        )
      
        FOREACH (i IN range(0, size(recordItem.variant) - 1) |
          MERGE (v:Variant {name: recordItem.variant[i]})
          MERGE (a)-[:PRESSED_ON]->(v)
        )

        FOREACH (i IN range(0, size(recordItem.label) - 1) |
          MERGE (l:Label {name: recordItem.label[i].name})
          MERGE (a)-[:ON_LABEL { catno: recordItem.label[i].catno }]->(l)
        )

        MERGE (a)-[:HAS_FORMAT {pressedIn: recordItem.releaseYear}]->(f)
      
        RETURN COLLECT(a) as album`,
      {
        records: records.albums
      }
    )
}

function mutateNeo4j (session: Session) {
  return async (cypherTransaction: TransactionWork<Transaction>) => {
    const results = await session
      .writeTransaction(cypherTransaction)
      .then(composeSuccessTransaction)
      .catch(handleError)

    await session.close()

    return results
  }
}

export { dumpDiscogsReleasesToNeo4j }
