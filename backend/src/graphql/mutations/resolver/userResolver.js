import crypto from 'crypto'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { JwtTokenDecode, JwtTokenGenerator } from '../../../lib/jwt.js'
import userModel from '../../../model/userModel.js'
import sendNodemailerMail from '../../../services/mail.js'
import VerifedEmailMail from '../../../templates/mail/VerifedEmailMail.js'
import ResetPasswordMail from '../../../templates/mail/ResetPasswordMail.js'
import bcrypt from 'bcryptjs'
const SignupUser = async (_, userInfo) => {
  const { firstName, lastName, email, password, tac } =
    userInfo.registerationForm
  const isAlreadyUserRegister = await userModel.findOne({ email })
  if (isAlreadyUserRegister) {
    if (isAlreadyUserRegister) {
      throw new GraphQLError('user Already exist', {
        extensions: {
          code: 'FORBIDDEN',
          http: {
            status: 400,
          },
        },
      })
    }
  } else {
    const this_user = new userModel({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 6),
      optExpiryToken: Date.now() + 10 * 60 * 1000,
      tac,
    })

    await this_user.save()
    const expiresIn = 10 * 60 * 1000
    const token = await JwtTokenGenerator(this_user._id, expiresIn)
    const link = `${process.env.BASE_URL}/auth/verify-email?token=${token}`
    const html = VerifedEmailMail(firstName + ' ' + lastName || '', link)
    console.log(link)

    // await sendNodemailerMail({ to: email, subject: 'Email Verified', html })

    return {
      ...this_user.toObject(),
      message: 'User successfully registered!',
      extenstions: {
        status: 201,
      },
    }
  }
}

export default SignupUser
// email verification

export const EmailVerification = async (_, params) => {
  if (!Boolean(params?.token.length > 10) || params.token == undefined) {
    throw new GraphQLError('Token is invalid.', {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 400,
        },
      },
    })
  } else {
    const { userInfo, error, success } = JwtTokenDecode(params.token)
    if (userInfo && success) {
      const id = userInfo?.id
      const date = Date.now()
      const this_user = await userModel
        .findById(id)
        .where('optExpiryToken')
        .gt(date)
        .select('emailVerified optExpiryToken')
      if (this_user?.verified && this_user) {
        throw new GraphQLError('User is already verified', {
          extensions: {
            code: 'FORBIDDEN',
            http: {
              status: 400,
            },
          },
        })
      } else if (!this_user?.verified && this_user) {
        this_user.emailVerified = true
        this_user.optExpiryToken = undefined
        await this_user.save()
        return {
          message: 'Email verification completed successfully.',
          extenstions: {
            status: 200,
          },
        }
      } else {
        throw new GraphQLError('Token has expired or is invalid.', {
          extensions: {
            code: 'FORBIDDEN',
            http: {
              status: 400,
            },
          },
        })
      }
    } else {
      throw new GraphQLError('Token  is invalid.', {
        extensions: {
          code: 'FORBIDDEN',
          http: {
            status: 400,
          },
        },
      })
    }
  }
}

export const loginUser = async (_, { signInForm }) => {
  const { email, password } = signInForm
  const this_user = await userModel
    .findOne({ email: email })
    .select('_id email firstName lastName password emailVerified')
  if (this_user && !this_user?.emailVerified) {
    const hashPassword = await this_user.correctPassword(
      password,
      this_user.password,
    )
    if (hashPassword) {
      const token = await JwtTokenGenerator(this_user._id)
      return {
        message: 'Login successfully',
        token,
        extenstions: {
          status: 200,
        },
      }
    } else {
      throw new GraphQLError('Email or password is incorrect', {
        extensions: {
          code: 'FORBIDDEN',
          http: {
            status: 400,
          },
        },
      })
    }
  } else if (this_user && !this_user?.emailVerified) {
    throw new GraphQLError('Plase verfied your email', {
      extensions: {
        code: 'FORBIDDEN',
        http: {
          status: 400,
        },
      },
    })
  } else {
    throw new GraphQLError('Account not exist ', {
      extensions: {
        code: 'NOT_FOUND',
        http: {
          status: 400,
        },
      },
    })
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
