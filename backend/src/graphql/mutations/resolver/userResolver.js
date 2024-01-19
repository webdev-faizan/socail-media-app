import crypto from 'crypto'
import { JwtTokenDecode, JwtTokenGenerator } from '../../../lib/jwt.js'
import userModel from '../../../model/userModel.js'
import sendNodemailerMail from '../../../services/mail.js'
import VerifedEmailMail from '../../../templates/mail/VerifedEmailMail.js'
import ResetPasswordMail from '../../../templates/mail/ResetPasswordMail.js'

const SignupUser = async (_, userInfo) => {
  try {
    const { firstName, lastName, email, password } = userInfo.registerationForm
    const isAlreadyUserRegister = await userModel.findOne({ email })
    if (isAlreadyUserRegister) {
      return {
        message: 'Already user register',
        extenstions: {
          status: 400,
        },
      }
    } else {
      const this_user = new userModel({
        firstName,
        lastName,
        email,
        password,
        optExpiryToken: Date.now() + 10 * 60 * 1000,
      })

      await this_user.save()
      const expiresIn = 10 * 60 * 1000
      const token = await JwtTokenGenerator(this_user._id, expiresIn)
      const link = `${process.env.BASE_URL}/verify-email/${token}`
      const html = await VerifedEmailMail(
        firstName + ' ' + lastName || '',
        link,
      )
      await sendNodemailerMail({ to: email, subject: 'Email Verified', html })

      return {
        ...this_user.toObject(),
        message: 'User successfully registered!',
        extenstions: {
          status: 201,
        },
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default SignupUser
// email verification

export const signupEmailVerification = async (_, params) => {
  try {
    if (Boolean(params?.token > 10) || params.token == undefined) {
      return {
        message: 'Token has expired or is invalid.',
        extenstions: {
          status: 400,
        },
      }
    } else {
      const userInfo = await JwtTokenDecode(params.token)

      if (userInfo) {
        const id = userInfo?.id
        const date = Date.now()
        const this_user = await userModel
          .findById(id)
          .where('optExpiryToken')
          .gt(date)
          .select('verified optExpiryToken')
        if (this_user?.verified && this_user) {
          return {
            message: 'User is already verified',
            extenstions: {
              status: 400,
            },
          }
        } else if (!this_user?.verified && this_user) {
          this_user.verified = true
          this_user.optExpiryToken = undefined

          await this_user.save()

          return {
            message: 'Email verification completed successfully.',
            extenstions: {
              status: 200,
            },
          }
        } else {
          return {
            message: 'Token has expired or is invalid.',
            extenstions: {
              status: 400,
            },
          }
        }
      } else {
        return {
          message: 'Token has expired or is invalid.',
          extenstions: {
            status: 400,
          },
        }
      }
    }
  } catch (error) {
    return {
      message: 'Internal server error',
      extenstions: {
        status: 500,
      },
    }
  }
}

export const loginUser = async (_, userInfo) => {
  console.log(userInfo)
  const { email, password } = userInfo.data
  const this_user = await userModel
    .findOne({ email: email })
    .select('_id email firstName lastName password')

  if (this_user && this_user.verified) {
    const hashPassword = await this_user.correctPassword(
      password,
      this_user.password,
    )
    if (hashPassword) {
      return {
        message: 'Login successfully',
        extenstions: {
          status: 200,
        },
      }
    } else {
      return {
        message: 'Email or password is incorrect',
        extenstions: {
          status: 400,
        },
      }
    }
  } else if (!this.verified) {
    const token = await JwtTokenGenerator(this_user._id)

    return {
      message: 'Please verify your email.',
      ...this_user.toObject(),
      token,
      extenstions: {
        status: 400,
      },
    }
  } else {
    return {
      message: 'Account does not exist. Please sign up',
      extenstions: {
        status: 400,
      },
    }
  }
}

export const forgetPassword = async (_, userInfo) => {
  try {
    const { email } = userInfo
    const is_user_register = await userModel.findOne({ email })
    if (!is_user_register || !is_user_register?.verified) {
      return {
        message: 'There is no user with email address.',
        extenstions: {
          status: 400,
        },
      }
    } else {
      const token = await is_user_register.PasswordResetToken()
      await is_user_register.save()

      return {
        message: 'Token sent to email!',
        extenstions: {
          status: 200,
        },
      }
      const link = `${process.env.BASE_URL}/auth/new-password?token=${token}`
      const html = ResetPasswordMail(link, is_user_register.firstName)
      await sendNodemailerMail({ to: email, subject: 'Forget Password', html })
    }
  } catch (error) {
    return {
      message: 'Internal Server Error!',
      extenstions: {
        status: 500,
      },
    }
  }
}

export const newPassword = async (_, userInfo) => {
  try {
    const { password, token } = await userInfo
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')
    const this_user = await userModel.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    if (this_user) {
      this_user.password = password
      this_user.passwordResetExpires = undefined
      this_user.passwordResetToken = undefined
      this_user.save()
      return {
        message: 'password successfull change',
        extenstions: {
          status: 200,
        },
      }
    } else {
      return {
        message: 'invalid token or expiry',
        extenstions: {
          status: 200,
        },
      }
    }
  } catch (error) {
    return {
      message: 'internal server error',
      extenstions: {
        status: 500,
      },
    }
  }
}
