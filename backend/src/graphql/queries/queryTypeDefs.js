import { getAllPostTypeDefs ,getComments,getUserPostTypeDefs} from '../typedefs/postTypeDefs.js'

const queryTypeDefs = `
${getAllPostTypeDefs}
${getUserPostTypeDefs}
${getComments}
`

export default queryTypeDefs
