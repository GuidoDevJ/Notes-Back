import * as dotenv from "dotenv";
dotenv.config();
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}
const SECRET_KEY = process.env.SECRET_KEY || "";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const saltRounds = 10;
const criptPass = async (pass: string) => {
  const res = await bcrypt.hash(pass, saltRounds);
  return res;
};

const generateJsonToken = (id: string) => {
  const token = jwt.sign({ id }, SECRET_KEY, {
    expiresIn: "2 days",
  });
  return token;
};

const decoedToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    return decoded;
  } catch (err) {
    return false;
  }
};
const getBearerTokenFromHeader = (authToken: string) => {
  return authToken.split(" ")[1];
};
const getToken = (authorization: string) => {
  const token = getBearerTokenFromHeader(authorization as string);
  const result = decoedToken(token);
  return result;
};

export {
  criptPass,
  generateJsonToken,
  decoedToken,
  getBearerTokenFromHeader,
  getToken,
};
