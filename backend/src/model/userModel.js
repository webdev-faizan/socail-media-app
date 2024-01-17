import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  otp: {
    type: Number,
  },
  optExpiryToken: {
    type: Date,
  },
  domain: {
    type: String,
    default: 'system',
    enum: ['system', 'google', 'facebook'],
  },
})

userSchema.pre('save', async function (next) {
  if (this?.isModified('password')) {
    bcryptjs.hashSync(this.password, 6)
  }
  next()
})
userSchema.methods.correctPassword = function (
  candidatePassword,
  hashPassword,
) {
  return bcryptjs.compareSync(candidatePassword, hashPassword)
}

userSchema.methods.PasswordResetToken = function () {
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  return resetToken
}
const userModel = mongoose.model('user', userSchema)

export default userModel
