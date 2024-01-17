import {
  signUpUserTypeDefs,
  emailVerificationTypedefs,
  loginTypedefs,
  forgetPasswordTypedefs,
} from '../typedefs/userTypedefs.js'

const mutationTypeDefs = `
${signUpUserTypeDefs}
${emailVerificationTypedefs}
${loginTypedefs}
${forgetPasswordTypedefs}

`

export default mutationTypeDefs
