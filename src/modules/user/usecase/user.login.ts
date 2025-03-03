import JWTService from "../../application/services/jwt.service";
import DomainError from "../../application/error/DomainError";
import PasswordService from "../../application/services/password.service";
import UserRepository from "../user.repository";


export default class Login {
 
  constructor(readonly userRepository: UserRepository) {
  }

  
  async run(input: Input): Promise<OutputToken> {    
    //Verify username
    const user = await this.userRepository.login(input.username);
    
    //Verify user password
    const userPassword = user.getPassword();
    const verifyPassword = await PasswordService.passwordCompare(input.password, userPassword);    
    if(!verifyPassword) throw new DomainError('Credentials Invalid.');
    
    //Verify if user is active
    const isActive = user.getActive();
    if(!isActive) throw new DomainError('Verify your email.'); 
    
    //Generate token
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