import mutationsResolver from './mutations/mutationsResolver.js'
// import GraphQLUpload from 'graphql-upload/'

const resolvers = {
  // Upload: GraphQLUpload,
  Mutation: {
    ...mutationsResolver,
  },

  // register: UserRegistration,
  Query: {
    greet: () => 'hello world',
  },
}
export default resolvers
