import DomainError from "application/error/DomainError";
import UserRepository from "./../user.repository";
import User from "../../user/entity/User";
import PasswordService from "application/services/password.service";

export default class UpdateUser {

  constructor(readonly userRepository: UserRepository){ 
  }

  async run(id: number, updateFields: Input): Promise<User> {
    const user = await this.userRepository.getById(id);
    if(!user) throw new Error('User not found.');
    
    const username = updateFields.username ?? user.username;
    let password = updateFields.password ?? user.getPassword();
    
    //Verificando se username ja existe
    if(updateFields.username) {
      await this.userRepository.validateUsername(updateFields.username);
    }     

    //Validando senha e retornando senha criptografada na att do usuario
    if(updateFields.password) {
      const passwordValidError = PasswordService.validateStrongPassword(updateFields.password);
      if(passwordValidError.length > 0){
        throw new DomainError(passwordValidError);
      }

      password = await PasswordService.hashPassword(updateFields.password);
    }

    const newUser = new User(user.id, username, user.email, password, user.getActive());
    return this.userRepository.update(newUser);
  }
}



type Input = {
  username?: string,
  password?: string,
}