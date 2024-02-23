import { v2 as cloudinary } from 'cloudinary'
import { GraphQLError } from 'graphql'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const singleimageupload = async (createReadStream) => {
  return await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'upload' },
      (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject('')
        }
      },
    )
    createReadStream().pipe(uploadStream)
  })
}
