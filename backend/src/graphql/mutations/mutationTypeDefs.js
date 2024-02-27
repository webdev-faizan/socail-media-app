import {
  postTypeDefs,
  commentTypeDef,
  likeTypeDefs,
} from '../typedefs/postTypeDefs.js'
import { ProfileTypeDefs } from '../typedefs/profileTypedefs.js'
import {
  signUpUserTypeDefs,
  emailVerificationTypedefs,
  loginTypedefs,
  forgetPasswordTypedefs,
  newPasswordTypeDefs,
} from '../typedefs/userTypedefs.js'

const mutationTypeDefs = `
${signUpUserTypeDefs}
${emailVerificationTypedefs}
${loginTypedefs}
${forgetPasswordTypedefs}
${newPasswordTypeDefs}
${postTypeDefs}
${commentTypeDef}
${likeTypeDefs}
${ProfileTypeDefs}

`

export default mutationTypeDefs
