import { PostModel } from '../../../model/postModel.js'

export const getAllPostsResolver = async (_, { page = 1, limit = 10 }) => {
  const pageNo = parseInt(page)
  const pageSize = parseInt(limit)
  const validPage = isNaN(pageNo) || pageNo < 1 ? 1 : pageNo
  const skip = (validPage - 1) * pageSize

  const allPosts = await PostModel.find({})
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  return {
    message: 'nice',
    data: allPosts,
  }
}

export default getAllPostsResolver
