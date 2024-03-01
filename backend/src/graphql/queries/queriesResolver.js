import {
  getUserPersonalInfoResolver,
  getViewUserInfoResolver,
} from '../mutations/resolver/ProfileResolver.js'
import {
  getAllPostsResolver,
  getCommentsResolver,
  getUserPostsResolver,
  getSharePostResolver,
  getViewUserPostsResolver,
} from './resolvers/getPost.js'

const queriesResolver = {
  getAllPost: getAllPostsResolver,
  getUserPost: getUserPostsResolver,
  getComments: getCommentsResolver,
  getUserPersonalInfo: getUserPersonalInfoResolver,
  getSharePost: getSharePostResolver,
  getViewUserInfo: getViewUserInfoResolver,
  getViewUserPost: getViewUserPostsResolver,
}
export default queriesResolver
