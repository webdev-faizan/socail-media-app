import { getAllPostsResolver, getComments ,getUserPostsResolver} from './resolvers/getPost.js'

const queriesResolver = {
  getAllPost: getAllPostsResolver,
  getUserPost: getUserPostsResolver,
  getComments: getComments,
}
export default queriesResolver
