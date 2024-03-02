import jwt from 'jsonwebtoken'

export const JwtTokenGenerator = async (payload, expiresIn) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + 10 + 24 * 60 * 60 * 100,
  })
}
export const JwtTokenDecode = (token) => {
  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET)
    return {
      tokenInfo,
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
