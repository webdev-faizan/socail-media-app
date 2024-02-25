import mutationsResolver from './mutations/mutationsResolver.js'
import queriesResolver from './queries/queriesResolver.js'
const resolvers = {
  Mutation: {
    ...mutationsResolver,
  },
  Query: {
    ...queriesResolver,
    greet: () => 'hello world',
  },
}
export default resolvers
