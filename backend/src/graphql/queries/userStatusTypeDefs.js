export const userStatusTypeDefs = `
type UserStatus {
    message: String
    isAuthenticated: Boolean
  }
  
  type Query {
    userStatus: UserStatus
  }
`
