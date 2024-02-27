import { ProfileImageResolver } from './resolver/ProfileResolver.js'
import {
  createPostResolver,
  CommentResolver,
  likeResolver,
} from './resolver/postResolver.js'
import userResolver, {
  EmailVerification,
  loginUser,
  forgetPassword,
  newPassword,
} from './resolver/userResolver.js'

const mutationsResolver = {
  // !auth resolver
  signupUser: userResolver,
  emailVerification: EmailVerification,
  loginUser: loginUser,
  forgetPassword: forgetPassword,
  newPassword: newPassword,
  //! post resolver
  createPost: createPostResolver,
  createComment: CommentResolver,
  like: likeResolver,
  profileChange: ProfileImageResolver,
}
export default mutationsResolver
