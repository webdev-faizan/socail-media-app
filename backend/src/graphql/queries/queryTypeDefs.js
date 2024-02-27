import { getAllPostTypeDefs ,getComments,getUserPostTypeDefs} from '../typedefs/postTypeDefs.js'
import { getProfileInformationTypeDefs } from '../typedefs/profileTypedefs.js'

const queryTypeDefs = `
${getAllPostTypeDefs}
${getUserPostTypeDefs}
${getComments}
${getProfileInformationTypeDefs}
`

export default queryTypeDefs
