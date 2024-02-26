import { GraphQLError } from 'graphql'
import ProtectRoutes from '../../../middleware/ProtectRoutes.js'
import { PostModel, commentModel } from '../../../model/postModel.js'

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
  const skip = (validPage - 1) * pageSize
  const allPosts = await PostModel.find({})
    .select('-comments')
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    console.log(allPosts)
  return {
    message: 'Posts fetched successfully',
    data: allPosts,
  }
}

export const getComments = async (_, { postId }, context) => {
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
  const getComments = await commentModel
    .find({ postId })
    .sort({ createdAt: -1 })
    .select('comment createdAt')
    .populate('user', 'firstName lastName')
  return {
    message: 'successfully get comments',
    data: getComments,
  }
}
