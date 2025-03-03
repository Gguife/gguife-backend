import { PrismaClient } from "@prisma/client";
import User from "./entity/User";
import DomainError from "../application/error/DomainError";

export default interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  getAll(): Promise<{username: string; email: string; active: boolean}[]>;
  getById(id: number): Promise<User | undefined>;
  validateUsername(username: string): Promise<void>;
  login(username: string): Promise<User>;
}


export class UserRepositoryDB implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: User): Promise<User> {
    const userSaved = await this.prisma.users.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.getPassword(),
        active: user.getActive()
      }
    })

    return new User(
      userSaved.id,
      userSaved.username, 
      userSaved.email, 
      userSaved.password, 
      userSaved.active
    );
  }

  async update(user: User): Promise<User>{
    const updateUser = await this.prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.getPassword(),
        active: user.getActive()
      }
    });

    return new User(
      updateUser.id,
      updateUser.username,
      updateUser.email,
      updateUser.password,
      updateUser.active
    )
  }

  async getById(id: number): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      }
    });

    if(!user) throw new DomainError('User not found.');
    
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.active
    );
  }


  async getAll(): Promise<{username: string; email: string; active: boolean}[]> {
    return await this.prisma.users.findMany({
      select: {
        username: true,
        email: true,
        active: true
      }
    })
  }
  
  async delete(id: number): Promise<void> {    
    await this.prisma.users.delete({
      where: {
        id: id
      }
    })
  }
 
  async login(username: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username,
      }
    });

    if(!user) throw new DomainError('Credentials invalid.');

    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.active
    );
  }

  async validateUsername(username: string): Promise<void> {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username
      }
    });
    
    if(user) throw new DomainError('Username already exist.');
  }


}