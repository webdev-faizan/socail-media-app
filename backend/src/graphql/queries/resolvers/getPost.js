import { GraphQLError } from 'graphql'
import ProtectRoutes from '../../../middleware/ProtectRoutes.js'
import { PostModel, commentModel } from '../../../model/postModel.js'

export const getAllPostsResolver = async (
  _,
  { page = 1, limit = 10, query = '' },
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
  console.log('query', query)

  const pageSize = parseInt(limit)
  const pageNo = parseInt(page) || 1
  const validPage = pageNo > 1 ? pageNo : 1
  const skip = (validPage - 1) * pageSize
  if (query) {
    const allPosts = await PostModel.find({
      $text: { $search: query },
    })
      .select('-comments')
      .populate('postOwner', 'firstName lastName email _id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    if (allPosts.length == 0) {
      throw new GraphQLError('Not found any post', {
        extensions: {
          code: 'NOT_FOUND',
          http: {
            status: 404,
          },
        },
      })
    }
    return {
      message: 'Posts fetched successfully',
      data: allPosts,
    }
  }

  const allPosts = await PostModel.find({})
    .select('-comments')
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  return {
    message: 'Posts fetched successfully',
    data: allPosts,
  }
}
export const getUserPostsResolver = async (
  _,
  { page = 1, limit = 10 },
  context,
) => {
  const { error, id } = await ProtectRoutes(context)
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
  const allPosts = await PostModel.find({
    postOwner: id,
  })
    .select('-comments')
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  return {
    message: 'Posts fetched successfully',
    data: allPosts,
  }
}

export const getCommentsResolver = async (_, { postId }, context) => {
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

export const getSharePostResolver = async (_, { id }, context) => {
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
  const userinfo = await PostModel.findById(id).populate(
    'postOwner',
    'firstName lastName email _id',
  )
  if (userinfo.length == 0) {
    throw new GraphQLError('Not found any post', {
      extensions: {
        code: 'NOT_FOUND',
        http: {
          status: 404,
        },
      },
    })
  } else {
    return {
      message: 'Successfully get post ',
      data: [userinfo],
    }
  }
}
// ! get view user post
export const getViewUserPostsResolver = async (
  _,
  { page = 1, limit = 10, id },
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
  const allPosts = await PostModel.find({
    postOwner: id,
  })
    .select('-comments')
    .populate('postOwner', 'firstName lastName email _id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  if (allPosts.length == 0) {
    throw new GraphQLError('Not-found any post', {
      extensions: {
        code: 'NOT_FOUND',
        http: {
          status: 404,
        },
      },
    })
  } else {
    return {
      message: 'Posts fetched successfully',
      data: allPosts,
    }
  }
}
