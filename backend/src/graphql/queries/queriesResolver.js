import { getAllPostsResolver, getComments } from './resolvers/getPost.js'

const queriesResolver = {
  getAllPost: getAllPostsResolver,
  getComments: getComments,
}
export default queriesResolver
