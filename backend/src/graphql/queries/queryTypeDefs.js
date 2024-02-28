import {
  getAllPostTypeDefs,
  getComments,
  getUserPostTypeDefs,
  getSharePostTypeDefs,
} from '../typedefs/postTypeDefs.js'
import { getProfileInformationTypeDefs } from '../typedefs/profileTypedefs.js'

const queryTypeDefs = `
${getAllPostTypeDefs}
${getUserPostTypeDefs}
${getComments}
${getProfileInformationTypeDefs}
${getSharePostTypeDefs}

`

export default queryTypeDefs
