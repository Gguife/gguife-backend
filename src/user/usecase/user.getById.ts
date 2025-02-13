import User from "../../user/entity/User";
import UserRepository from "../../user/user.repository";


export default class GetUser {

  constructor(readonly userRepository: UserRepository){
  }

  async run(id: number): Promise<User | undefined> {
    const user = await this.userRepository.getById(id);
    return user;
  }
} 