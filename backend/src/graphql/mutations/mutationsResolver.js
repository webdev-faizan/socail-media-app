import userResolver, {
  signupEmailVerification,
  loginUser,
  forgetPassword,
  newPassword,
} from './resolver/userResolver.js'

const mutationsResolver = {
  signupUser: userResolver,
  emailVerification: signupEmailVerification,
  loginUser: loginUser,
  forgetPassword: forgetPassword,
  newPassword: newPassword,
}
export default mutationsResolver
