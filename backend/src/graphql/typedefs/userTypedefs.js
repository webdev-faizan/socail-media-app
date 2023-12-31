const userTypedefs = `
  type User {
    id: ID!
    firstName: String
    lastName: String
    verified: Boolean
    message: String
  }

  input formInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  type Mutation {
    signupUser(registerationForm: formInput!): User
  }
`;

export default userTypedefs;
