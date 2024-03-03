import ProtectRoutes from '../../../middleware/ProtectRoutes.js'
import userModel from '../../../model/userModel.js'

const userStatusResolver = async (_, $, context) => {
  const { error, id } = await ProtectRoutes(context)
  if (error) {
    return {
      isAuthenticated: false,
      message: 'Session has expired',
    }
  }

  const user = await userModel.findById(id)
  if (user) {
    return {
      isAuthenticated: true,
      message: 'User session is active',
    }
  } else {
    return {
      isAuthenticated: false,
      message: 'User session is inactive',
    }
  }
}

export default userStatusResolver
