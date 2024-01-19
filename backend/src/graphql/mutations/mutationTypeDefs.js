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

`

export default mutationTypeDefs
