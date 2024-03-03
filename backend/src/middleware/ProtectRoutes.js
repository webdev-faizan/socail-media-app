import { JwtTokenDecode } from '../lib/jwt.js'
import userModel from '../model/userModel.js'
const ProtectRoutes = async (req) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const { error, success, tokenInfo } = JwtTokenDecode(token)
    if (success && tokenInfo) {
      const { id, iat } = tokenInfo
      const existing_user = await userModel
        .findById(id)
        .select('_id lastPasswordChangeAt')
      if (existing_user && existing_user.lastPasswordChangeAt > iat) {
        return { id: existing_user.id, error: false, success: true }
      } else {
        return { error: true, success: false }
      }
    } else {
      return { error: true, success: false }
    }
  } else {
    return { error: true, success: false }
  }
}
export default ProtectRoutes
