import mutationsResolver from "./mutations/mutationsResolver.js";
const resolvers = {
  Mutation: {
    ...mutationsResolver,
  },

  // register: UserRegistration,
  Query: {
    greet: () => "hello world",
  },
};
export default resolvers;
