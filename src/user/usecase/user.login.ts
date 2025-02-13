import JWTService from "application/services/jwt.service";
import DomainError from "../../application/error/DomainError";
import PasswordService from "../../application/services/password.service";
import UserRepository from "../../user/user.repository";


export default class Login {
 
  constructor(readonly userRepository: UserRepository) {
  }

  
  async run(input: Input): Promise<OutputToken> {    
    //Verificar e indentificar username passado
    const user = await this.userRepository.login(input.username);
    
    //Verificar senha usuario
    const userPassword = user.password;
    const verifyPassword = await PasswordService.passwordCompare(input.password, userPassword);    
    if(!verifyPassword) throw new DomainError('Credentials Invalid.'); 
    
    // Gerar token
    const jwtService = new JWTService();    
    const token = jwtService.token({id: user.id, username: user.username});

    return { token };
  }
}

type Input = {
  username: string,
  password: string
};

type OutputToken = {
  token: string
}