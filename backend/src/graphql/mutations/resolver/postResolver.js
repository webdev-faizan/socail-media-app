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
    await new PostModel({
      postOwner: id,
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
export const likeResolver = async (_, { postId }, context) => {
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
  const post = await PostModel.findById(postId)
  if (!post.likes.includes(id)) {
    post.likes.push(id)
    post.likeCount += 1
    await post.save()
    return {
      message: 'Like add successfully',
    }
  }
  await PostModel.updateOne({ _id: postId }, { $pull: { likes: id } })
  post.likeCount -= 1
  await post.save()
  return {
    message: 'Like remove successfully',
  }
}
