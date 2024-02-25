// !create post
export const postTypeDefs = `
scalar Upload
input PostInput {
    title: String!
    description: String!
    atttachment: Upload
  }
  type PostResponse {
    message: String
  }
  type Mutation {
    createPost(postInfo: PostInput): PostResponse
  }
  `

//! create comments
export const commentTypeDef = `
input CommentInput {
  postId: ID!
  comment: String!
  }
  
  type Mutation {
    createComment(createComment: CommentInput): CommentResponse
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
//!get All post
export const getAllPostTypeDefs = `
type Query {
  getAllPost(page: Int, limit: Int): GetUserPostResponse
  }
  
  type PostInfo {
    id:ID
    title: String
    description: String
    attachment: String
    createdAt: String
    likeCount: Int
    commentCount: Int
    postOwner:OwnerInfo
  }
  type OwnerInfo{
    firstName:String
    lastName:String
    id:ID
    email:String
}
  type GetUserPostResponse {
    message: String
    data: [PostInfo]
  }
`

//! get comments

export const getComments = `
type UserInfo {
  id: ID
  firstName: String
  lastName: String
}

type CommentInfo {
  user: UserInfo
  comment: String
  createdAt: String
}

type GetCommentResponse {
  message: String
  data: [CommentInfo]
}

type Query {
  getComments(postId: ID!): GetCommentResponse
}

`
