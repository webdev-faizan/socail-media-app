import { PostModel } from '../../../model/postModel.js'

export const getAllPostsResolver = async (
  _,
  { page = 1, limit = 10 },
  context,
) => {
  const { error } = await ProtectRoutes(context)
  if (error) {
    throw new GraphQLError('Session has expired', {
      extensions: {
        code: 'BAD_REQUEST',
        http: {
          status: 400,
        },
      },
    })
  }
  const pageSize = parseInt(limit)
  const pageNo = parseInt(page) || 1
  const validPage = pageNo > 1 ? pageNo : 1
  // const validPage = isNaN(pageNo) || pageNo < 1 ? 1 : pageNo
  const skip = (validPage - 1) * pageSize
  const allPosts = await PostModel.find({})
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  return {
    message: 'Posts fetched successfully',
    data: allPosts,
  }
}

export default getAllPostsResolver
