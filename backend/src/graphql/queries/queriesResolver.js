import { getUserPersonalInfoResolver } from '../mutations/resolver/ProfileResolver.js'
import { getAllPostsResolver, getCommentsResolver ,getUserPostsResolver,getSharePostResolver} from './resolvers/getPost.js'

const queriesResolver = {
  getAllPost: getAllPostsResolver,
  getUserPost: getUserPostsResolver,
  getComments: getCommentsResolver,
  getUserPersonalInfo:getUserPersonalInfoResolver,
  getSharePost:getSharePostResolver

}
export default queriesResolver
