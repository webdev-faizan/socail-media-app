import { PostModel, commentModel } from '../../../model/postModel.js'
import { GraphQLError } from 'graphql'
import { singleimageupload } from '../../../services/singleimageupload.js'
import ProtectRoutes from '../../../middleware/ProtectRoutes.js'
import { connect } from 'mongoose'

export const createPostResolver = async (_, { postInfo }, context) => {
  const { id, error } = await ProtectRoutes(context)
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
  const { title, description, atttachment } = postInfo
  const { createReadStream } = await atttachment.file
  const result = await singleimageupload(createReadStream)
  if (!result) {
    throw new GraphQLError('Interal server error plase try again', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        },
      },
    })
  } else {
    const { url } = result
    const this_post = await new PostModel({
      userId: id,
      title,
      description,
      attachment: url,
    }).save()
    return {
      atttachment: url,
      message: 'Post Successfully Created',
    }
  }
}
export const CommentResolver = async (_, { createComment }, context) => {
  const { id, error } = await ProtectRoutes(context)
  console.log(createComment)
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
  const { comment, postId } = createComment
  console.log(createComment)
  await new commentModel({
    user: id,
    postId,
    comment,
  }).save()
  await PostModel.findByIdAndUpdate(postId, {
    $inc: { commentCount: 1 },
  })
  return {
    message: 'Comment added successfully',
  }
}
export const likeResolver = async (_, likeInfo) => {
  try {
    const { userId, postId } = likeInfo
    const post = await PostModel.findById(postId)
    if (!post.likes.includes(userId)) {
      post.likes.push(userId)
      post.likeCount += 1
    } else {
      post.likes.push(userId)
      post.likeCount -= 1
    }
    await post.save()
    return {
      success: true,
      message: 'Like toggled successfully',
    }
  } catch (error) {
    return {
      message: 'Internal server error',
    }
  }
}
