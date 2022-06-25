import { Session, Transaction } from 'neo4j-driver'
import { fetchDiscogsApi } from '../discogs/api'
import { ComposeNeo4jDiscogsTranscation, DumpCollectionToNeo4j, TransactionWork } from '../types'
import { formatAlbumCollection } from '../utils/formatter'
import { asyncPipe } from '../utils/pipe'

function dumpDiscogsReleasesToNeo4j (session: Session): DumpCollectionToNeo4j {
  return asyncPipe(
    fetchDiscogsApi,
    formatAlbumCollection,
    composeImportDiscogsCypher,
    mutateNeo4j(session)
  )
}

const composeSuccessTransaction = (): string => 'Successfully imported data to Neo4j!'

const composeImportDiscogsCypher: ComposeNeo4jDiscogsTranscation = (records) => {
  return (tx: Transaction) =>
    tx.run(
      `
        UNWIND $records as recordItem
        MERGE (a:Album {
          name: coalesce(recordItem.title, "N/A"), 
          albumCover: coalesce(recordItem.image, "N/A")
        })
      
        MERGE (c:Collection {name: "NowSpinningLPs"})
        MERGE (l:Label {name: recordItem.label})
        MERGE (y:Year {name: recordItem.releaseYear})
        MERGE (f:Format {name: recordItem.format.name})
      
        MERGE (a)-[:IN_COLLECTION {dateAdded: date(recordItem.dateAdded)}]->(c)
      
        FOREACH (i IN range(0, size(recordItem.artists) - 1) |
          MERGE (r:Artist {name: recordItem.artists[i]})
          MERGE (a)-[:BY_ARTIST]->(r)
        )
      
        FOREACH (i IN range(0, size(recordItem.genres) - 1) |
          MERGE (g:Genre {name: recordItem.genres[i]})
          MERGE (a)-[:HAS_GENRE]->(g)
        )

        FOREACH (i IN range(0, size(recordItem.format.type) - 1) |
          MERGE (d:Description {name: recordItem.format.type[i]})
          MERGE (a)-[:HAS_DESCRIPTION]->(d)
        )
      
        MERGE (a)-[:ON_LABEL]->(l)
        MERGE (a)-[:HAS_FORMAT]->(f)
      
        MERGE (a)-[:PRESSED_IN]->(y)
      
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
      .catch((error) => {
        console.log(error)
        return error
      })

    await session.close()

    return results
  }
}

export { dumpDiscogsReleasesToNeo4j }
