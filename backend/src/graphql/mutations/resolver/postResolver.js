import {PostModel,commentModel} from '../../../model/postModel.js'

export const createPostResolver = async (_, postInfo) => {
  try {
    const { userId, title, description, atttachment } = postInfo
    const this_post = await new PostModel({
      userId,
      title,
      description,
      atttachment,
    }).save()
    return {
      message: 'Post created successfully',
      postId: this_post.__id,
      extenstions: {
        status: 201,
      },
    }
  } catch (error) {
    return {
      message: 'internal server error',
      extenstions: {
        status: 500,
      },
    }
  }
}
export const CommentResolver = async (_, commentInfo) => {
  try {
    const { userId, text, postId } = commentInfo

    const newComment = await new CommentModel({
      text,
      user: userId,
    }).save()
    const post = await PostModel.findById(postId)
    post.comments.push(newComment._id)
    await post.save()
    return {
      message: 'Comment added successfully',
      extensions: {
        status: 201,
        commentId: newComment._id,
      },
    }
  } catch (error) {
    console.error('Error adding comment:', error)
    return {
      message: 'Internal server error',
      extensions: {
        status: 500,
      },
    }
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
