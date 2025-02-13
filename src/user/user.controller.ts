import HttpServer from "../infra/http/httpServe";
import UserRepository from "./user.repository";
import SendMail from "./usecase/email.send";
import CreateUser from "./usecase/user.create";
import UpdateUser from "./usecase/user.update";
import Login from "./usecase/user.login";
import DeleteUser from "./usecase/user.delete";



export default class UserController {
  
  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository){
  }

  registerRoutes() {
    this.userRegister();
    this.userUpdate();
    this.delete();
    this.login();
  }

  private userRegister() {
    this.httpServer.route('post', '/user/register', async (_: any, body: any) => {
      const input = {
        username: body.username,
        email: body.email,
        passwordPlainText: body.password,
      };

      const sendEmail = new SendMail();
      const output = await new CreateUser(this.userRepository, sendEmail).run(input);

      return output;
    })
  }

  private userUpdate() {
    this.httpServer.securityRoute('post', '/user/update', async (_: any, body: any, authDecoded: any) => {
      const input = {
        username: body.username,
        password: body.password
      };

      const output = await new UpdateUser(this.userRepository).run(authDecoded.id, input);
      return output;
    })
  }
    
  private delete() {
    this.httpServer.securityRoute('delete', '/user/delete', async(_:any, body: any, authDecoded: any) => {
      const output = await new DeleteUser(this.userRepository).run(authDecoded.id);
      return output;
    })
  }

  private login() {
    this.httpServer.route('post', '/login', async (_: any, body: any) => {
      const input = {
        username: body.username,
        password: body.password
      };
      
      const output = await new Login(this.userRepository).run(input);
      return output;
    })
  }
}