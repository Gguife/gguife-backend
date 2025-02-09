import TokenError from "../../application/error/TokenError";
import JWTService from "./jwt.service";

export default class TokenService {

  validate(authHeader: string | undefined) {
    if(!authHeader) throw new TokenError("Token not found.");
    const token = authHeader.replace('Bearer ', '');
    const jwtService = new JWTService();

    try {
      const decodedToken = jwtService.verifyToken(token);
      return decodedToken;
    } catch(error: any) {
      throw new TokenError('Invalid Token.');
    }
  }

}