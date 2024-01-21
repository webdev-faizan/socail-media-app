// !create post
export const postTypeDefs = `
input PostInput {
    userId: ID!
    title: String!
    description: String!
    attachment: String
  }
  
  type Mutation {
    createPost(postInfo: PostInput): PostResponse
  }
  type PostResponse {
    message: String
  }
`
//! create comments
export const commentTypeDef = `
input CommentInput {
    userId: ID!
    text: String!
    postId: ID!
  }
  
  type Mutation {
    createComment(commentInfo: CommentInput): CommentResponse
  }
   type CommentResponse {
    message: String
  }
`
//! add like
export const likeTypeDefs = `
input LikeInput {
    userId: ID!
    postId: ID!
  }
  
  type Mutation {
    like(likeInfo: LikeInput): LikeResponse
  }
  
  type LikeResponse {
    message: String!
  }
  
`
// ! get  user post
export const getUserPostTypeDefs = `
type Query {
    getUserPost(token: String): GetUserPostResponse
  }
  
  type PostInfo {
    title: String
    description: String
    attachment: String
    createdAt: String
    likeCount: Int
  }
  
  type GetUserPostResponse {
    message: String
    data: [PostInfo]
  }
`
//! get alluser
export const getAllPostTypeDefs = `
type Query {
    getUserPost(): GetUserPostResponse
  }
  
  type PostInfo {
    title: String
    description: String
    attachment: String
    createdAt: String
    likeCount: Int
  }
  
  type GetUserPostResponse {
    message: String
    data: [PostInfo]
  }
`
//! get comments

export const getComments = `
type Query {
    getComments: GetCommentResponse
  }
  
  type UserInfo {
    firstName: String
    lastName: String
    profile: String
  }
  
  type CommentInfo {
    title: String
    users: [UserInfo]
    text: String
    createdAt: String
  }
  
  type GetCommentResponse {
    message: String
    data: [CommentInfo]
  }
`
