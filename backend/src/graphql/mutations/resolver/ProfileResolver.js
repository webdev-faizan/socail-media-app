import userModel from '../../../model/userModel'

export const ProfileImageResolver = async (_, { profile }, context) => {
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
  const { createReadStream } = await profile.file
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
      message: 'profile upload successfully',
    }
  }
}
