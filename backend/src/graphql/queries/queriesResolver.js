import { getUserPersonalInfoResolver } from '../mutations/resolver/ProfileResolver.js'
import { getAllPostsResolver, getCommentsResolver ,getUserPostsResolver} from './resolvers/getPost.js'

const queriesResolver = {
  getAllPost: getAllPostsResolver,
  getUserPost: getUserPostsResolver,
  getComments: getCommentsResolver,
  getUserPersonalInfo:getUserPersonalInfoResolver

}
export default queriesResolver
