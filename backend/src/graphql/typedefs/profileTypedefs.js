export const ProfileUploadTypeDefs = `
scalar Upload
  type ProfileChangeResponse {
    message: String
    profile:String
  }
  type Mutation {
    profileChange(profileImg: Upload): ProfileChangeResponse
  }
  `
export const getProfileInformationTypeDefs = `
  scalar Date

  type Query {
    getUserPersonalInfo: GetUserPersonalInfoResponse
  }

  type GetUserPersonalInfoResponse {
    message: String
      _id:ID
      firstName: String
      lastName: String
      createdAt: Date
      email: String
      profile: String
      emailVerified: Boolean
  }
`
