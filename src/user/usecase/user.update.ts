import DomainError from "../../application/error/DomainError";
import UserRepository from "./../user.repository";
import User from "../../user/entity/User";
import PasswordService from "../../application/services/password.service";

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

    //Para mudar senha, usuario deve fornecer a senha atual
    if(updateFields.password) {      
      if(!updateFields.currentPassword) throw new DomainError('Current password is required to update password.');
      
      //Verificar se nova senha e diferente da antiga senha
      if(updateFields.password === updateFields.currentPassword) throw new DomainError('This password has already been registred, enter a new one.'); 

      //Verificar senha atual antes de atualizar senha
      const verifyPassword = await PasswordService.passwordCompare(updateFields.currentPassword, user.getPassword()); 
      if(!verifyPassword) throw new DomainError('Current password is incorret.');
      
      
      //Validando nova senha
      const passwordValidError = PasswordService.validateStrongPassword(updateFields.password);
      if(passwordValidError.length > 0){
        throw new DomainError(passwordValidError);
      }
      

      //Hash nova senha
      password = await PasswordService.hashPassword(updateFields.password);
    }

    const newUser = new User(user.id, username, user.email, password, user.getActive());
    return this.userRepository.update(newUser);
  }
}



type Input = {
  username?: string;
  currentPassword?: string;
  password?: string;
}