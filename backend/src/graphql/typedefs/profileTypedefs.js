export const ProfileTypeDefs = `
scalar Upload
  type ProfileChangeResponse {
    message: String
    profile:String
  }
  type Mutation {
    profileChange(profile: Upload): ProfileChangeResponse
  }
  `
