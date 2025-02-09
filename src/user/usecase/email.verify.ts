import UserRepository from "../user.repository";
import SMTPError from "application/error/SmtpError";
import JWTService from "../../application/services/jwt.service";
import { Payload } from "../../application/services/jwt.service"; 

export default class VerifyEmail {

  constructor(readonly userRepository: UserRepository){ 
  }


  async run(token: string): Promise<void> {
    
    if(!token) throw new SMTPError('Token not provided.');
    
    const jwtService = new JWTService();
    try {
      const decoded = await jwtService.verifyToken(token) as Payload;
      const userId = decoded.id; 
    
      //verificar usuario
      const user = await this.userRepository.getById(userId);
      if(!user) throw new SMTPError('User not found.');

      //Ativar usuario
      user.verifyEmail();

      //Atualizar usuario
      //await this.userRepository.update(user);
    }catch(err: any) {
      if(err instanceof SMTPError) throw err;
      console.error('Error when checking email: ', err);
      throw new Error('Error when checking email');
    }
  
  }
}