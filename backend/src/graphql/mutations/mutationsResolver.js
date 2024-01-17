import userResolver, {
  signupEmailVerification,
  loginUser,
  forgetPassword,
} from './resolver/userResolver.js'

const mutationsResolver = {
  signupUser: userResolver,
  emailVerification: signupEmailVerification,
  loginUser: loginUser,
  forgetPassword: forgetPassword,
}
export default mutationsResolver
