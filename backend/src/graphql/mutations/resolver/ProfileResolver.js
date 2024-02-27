import ProtectRoutes from '../../../middleware/ProtectRoutes.js'
import userModel from '../../../model/userModel.js'
import { singleimageupload } from '../../../services/singleimageupload.js'

export const ProfileImageResolver = async (_, { profileImg }, context) => {
  const { id, error } = await ProtectRoutes(context)
  if (error) {
    throw new GraphQLError('Session has expired', {
      extensions: {
        code: 'BAD_REQUEST',
        http: {
          status: 400,
        },
      },
    })
  }
  const { createReadStream } = await profileImg.file
  const result = await singleimageupload(createReadStream)
  if (!result) {
    throw new GraphQLError('Interal server error plase try again', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        http: {
          status: 500,
        },
      },
    })
  } else {
    const { url } = result
    await userModel.findByIdAndUpdate(id, {
      profile: url,
    })
    return {
      profile: url,
      message: 'Successfully updated profile',
    }
  }
}

export const getUserPersonalInfoResolver = async (_, $, context) => {
  const { id, error } = await ProtectRoutes(context)
  if (error) {
    throw new GraphQLError('Session has expired', {
      extensions: {
        code: 'BAD_REQUEST',
        http: {
          status: 400,
        },
      },
    })
  }
  const user = await userModel
    .findById(id)
    .select('firstName lastName email emailVerified profile')
    console.log(user)
  return {
    message: 'Successfully found user information',
    ...user.toObject()
  }
}
