import User from "../entity/User";
import UserRepository from "../user.repository";
import JWTService from "../../application/services/jwt.service";
import SendEmail from '../usecase/email.send';

export default class CreateUser {

  constructor(readonly userRepository: UserRepository, private sendEmail: SendEmail){    
  }

  async run(input: Input): Promise<Output> {
    const user = await User.create(
      input.username,
      input.email,
      input.passwordPlainText
    );

    const newUser = await this.userRepository.create(user);

    //JWT envio de email para ativar usuario 
    const jwtService = new JWTService();
    const token = jwtService.token({id: newUser.id, username: newUser.username});
    //Enviar email
    await this.sendEmail.run(newUser.email, token);

    return { id: newUser.id }
  }  
}


type Input = {
  username: string,
  email: string,
  passwordPlainText: string,
}

type Output = {
  id: number
}