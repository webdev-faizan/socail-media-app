import mongoose from 'mongoose'
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Like',
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
)

export const PostModel = mongoose.model('Post', postSchema)
const commentsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const commentModel = mongoose.model('Comment', commentsSchema)
