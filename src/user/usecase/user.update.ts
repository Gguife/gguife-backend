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
    let password = updateFields.newPassword ?? user.getPassword();
    
    //Verify if username exist
    if(updateFields.username) {
      await this.userRepository.validateUsername(updateFields.username);
    }     

    //To change user must provide current password
    if(updateFields.newPassword) {      
      if(!updateFields.currentPassword) throw new DomainError('Current password is required to update password.');
      
      //Check if the new password is different from the old password
      if(updateFields.newPassword === updateFields.currentPassword) throw new DomainError('This password has already been registred, enter a new one.'); 

      //Verify the old password is correct
      const verifyCurrentPassword = await PasswordService.passwordCompare(updateFields.currentPassword, user.getPassword()); 
      if(!verifyCurrentPassword) throw new DomainError('Current password is incorret.');
            
      //Validate new password
      const passwordValidError = PasswordService.validateStrongPassword(updateFields.newPassword);
      if(passwordValidError.length > 0){
        throw new DomainError(passwordValidError);
      }
      

      //Hash new password
      password = await PasswordService.hashPassword(updateFields.newPassword);
    }

    const newUser = new User(user.id, username, user.email, password, user.getActive());
    return this.userRepository.update(newUser);
  }
}



type Input = {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
}