import { getAllPostTypeDefs ,getComments} from '../typedefs/postTypeDefs.js'

const queryTypeDefs = `
${getAllPostTypeDefs}
${getComments}
`

export default queryTypeDefs
