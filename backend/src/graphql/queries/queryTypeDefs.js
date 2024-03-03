import {
  getAllPostTypeDefs,
  getComments,
  getUserPostTypeDefs,
  getSharePostTypeDefs,
  getViewUserTypeDefs,
} from '../typedefs/postTypeDefs.js'
import {
  getProfileInformationTypeDefs,
  getViewProfileInformationTypeDefs,
} from '../typedefs/profileTypedefs.js'
import { userStatusTypeDefs } from './userStatusTypeDefs.js'

const queryTypeDefs = `
${getAllPostTypeDefs}
${getUserPostTypeDefs}
${getComments}
${getProfileInformationTypeDefs}
${getSharePostTypeDefs}
${getViewUserTypeDefs}
${getViewProfileInformationTypeDefs}
${userStatusTypeDefs}

`

export default queryTypeDefs
