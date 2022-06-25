import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type Album {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albumCover: String
    collection: [Collection!]! @relationship(type: "IN_COLLECTION", direction: OUT, properties: "RecordAdded")
    artists: [Artist!]! @relationship(type: "BY_ARTIST", direction: OUT)
    genres: [Genre!]! @relationship(type: "HAS_GENRE", direction: OUT)
    descriptions: [Description!]! @relationship(type: "HAS_DESCRIPTION", direction: OUT)
    label: Label @relationship(type: "ON_LABEL", direction: OUT)
    format: Format @relationship(type: "HAS_FORMAT", direction: OUT)
    pressed: Year @relationship(type: "PRESSED_IN", direction: OUT)
  }
  type Collection {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "IN_COLLECTION", direction: IN, properties: "RecordAdded")
  }
  type Label {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "ON_LABEL", direction: IN)
  }

  type Year {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "PRESSED_IN", direction: IN)
  }
  type Format {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "HAS_FORMAT", direction: IN)
  }
  type Artist {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "BY_ARTIST", direction: IN)
  }
  type Genre {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "HAS_GENRE", direction: IN)
  }
  type Description {
    _id: Int @cypher(statement: "WITH $this AS this RETURN ID(this)")
    name: String
    albums: [Album!]! @relationship(type: "HAS_DESCRIPTION", direction: IN)
  }
  interface RecordAdded @relationshipProperties {
    dateAdded: Date
  }
`
