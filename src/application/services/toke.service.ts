import TokenError from "../../application/error/TokenError";
import JWTService from "./jwt.service";

export default class TokenService {

  async validate(authHeader: string | undefined, queryToken: string | undefined) {
    const token = queryToken || (authHeader?.replace('Bearer ', ''));
    
    
    if(!token) throw new TokenError("Token not found.");
    
    const jwtService = new JWTService();

    try {
      const decodedToken = await jwtService.verifyToken(token);
      return decodedToken;
    } catch(error: any) {
      throw new TokenError('Invalid Token.');
    }
  }

}