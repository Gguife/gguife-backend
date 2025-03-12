import UserRepository from "../user.repository";



export default class DeleteUser {

  constructor(readonly userRepositoy: UserRepository){
  } 

  async run(id: number): Promise<void> {
    await this.userRepositoy.getById(id);
    await this.userRepositoy.delete(id);
  }
}