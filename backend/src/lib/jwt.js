import jwt from "jsonwebtoken";

export const JwtTokenGenerator = async (payload, expiresIn) => {
  return jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn,
  });
};
export const JwtTokenDecode = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
