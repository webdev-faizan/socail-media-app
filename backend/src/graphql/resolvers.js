import mutationsResolver from './mutations/mutationsResolver.js'
const resolvers = {
  Mutation: {
    ...mutationsResolver,
  },
  Query: {
    greet: () => 'hello world',
  },
}
export default resolvers
