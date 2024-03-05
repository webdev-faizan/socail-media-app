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
type Mutation {
    like(postId: ID!): LikeResponse
  }
  
  type LikeResponse {
    message: String!
  }
  
`
//!get All post
export const getAllPostTypeDefs = `
scalar Date

type Query {
  getAllPost(page: Int!, limit: Int,query:String): GetUserPostResponse
  }
  
  type PostInfo {
    id:ID
    title: String
    description: String
    attachment: String
    createdAt: Date
    likeCount: Int
    commentCount: Int
    postOwner:OwnerInfo
    likes: [ID] 
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

//!get User post
export const getUserPostTypeDefs = `
scalar Date

type Query {
  getUserPost(page: Int, limit: Int,query:String): GetUserPostResponse
  }
  
  type PostInfo {
    id:ID
    title: String
    description: String
    attachment: String
    createdAt: Date
    likeCount: Int
    commentCount: Int
    postOwner:OwnerInfo
    likes: [ID] 
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

export const getSharePostTypeDefs = `
scalar Date

type Query {
  getSharePost(id:String): GetSharePostResponse
  }
  type OwnerInfos{
    firstName:String
    lastName:String
    id:ID
    email:String
}
  type getSharePostInfo {
    id:String
    title: String
    description: String
    attachment: String
    createdAt: Date
    likeCount: Int
    commentCount: Int
    postOwner:OwnerInfos
    likes: [ID] 
  }
 

  type GetSharePostResponse {
    message: String
    data: [getSharePostInfo]
  }
`
// ! get veiw user post
export const getViewUserTypeDefs = `
scalar Date

type Query {
  getViewUserPost(page: Int, limit: Int,id:ID): GetUserPostResponse
  }
  
  type PostInfo {
    _id:ID
    title: String
    description: String
    attachment: String
    createdAt: Date
    likeCount: Int
    commentCount: Int
    postOwner:OwnerInfo
    likes: [ID] 
  }
 
  type OwnerInfo{
    firstName:String
    lastName:String
    _id:ID
    email:String
    profile:String
}
  type GetUserPostResponse {
    message: String
    data: [PostInfo]
  }
`
