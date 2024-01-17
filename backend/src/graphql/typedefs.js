import { gql } from 'apollo-server-express'
import mutationTypeDefs from './mutations/mutationTypeDefs.js'
import queryTypeDefs from './queries/queryTypeDefs.js'

const typeDefs = gql`
  #query
  type Query {
    greet: String
  }
  ${mutationTypeDefs}
  #mutations
  ${queryTypeDefs}
`

export default typeDefs
