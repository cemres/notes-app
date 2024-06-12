import jwt from "jsonwebtoken";

function jwtTokens({ id, username, email }) {
  const user = { id, username, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
  return { accessToken, refreshToken };
}

export { jwtTokens };
