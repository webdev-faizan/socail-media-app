export const signUpUserTypeDefs = `
  type User {
    id: ID!
    firstName: String
    verified: Boolean
    message: String
  }

  input formInput {
    firstName: String!
    email: String!
    password: String!
  }

  type Mutation {
    signupUser(registerationForm: formInput!): User
  }

`

export const emailVerificationTypedefs = `
type user{
message:String!
verified:Boolean
}
type Mutation{
  emailVerification(token:String!):user
}`

export const loginTypedefs = `
type User{
message:String
firstName:String
lastName:String
_id:ID
toke:String,
verififed:Boolean
}
input formInput{
email:String
password:String
}

type Mutation{
  loginUser(signInForm:formInput):User
  }
`

export const forgetPasswordTypedefs = `
type ForgetPasswordResponse{

  message:String
}
type Mutation{
  forgetPassword(email:String!):ForgetPasswordResponse
}
`
// export const newPasswordTypeDefs = `
// input formInput{
// token:String
// password:String

// }
// type NewPasswordResponse{
//   message:String
// }
// type Mutation{
//   newPassword(form:formInput!):NewPasswordResponse
// }

// `

export const newPasswordTypeDefs = `
  input NewPasswordInput {
    token: String
    password: String
  }

  type NewPasswordResponse {
    message: String
  }

  type Mutation {
    newPassword(token: String, password: String): NewPasswordResponse
  }
`;

