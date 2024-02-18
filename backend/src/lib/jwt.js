import jwt from 'jsonwebtoken'

export const JwtTokenGenerator = async (payload, expiresIn) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}
export const JwtTokenDecode = (token) => {
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET)
    return {
      userInfo,
      error: false,
      success: true,
    }
  } catch {
    return {
      error: true,
      success: false,
    }
  }
}
