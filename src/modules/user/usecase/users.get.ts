import UserRepository from "../user.repository";




export default class GetUsers {

  constructor(readonly userRepository: UserRepository) {
  }

  async run(): Promise<{username: string; email: string; active: boolean}[]>{
    const users = await this.userRepository.getAll();
    return users;
  }

} 