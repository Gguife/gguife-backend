import HttpServer from "../../infra/http/httpServer";
import UserRepository from "./user.repository";
import SendMail from "./usecase/email.send";
import CreateUser from "./usecase/user.create";
import UpdateUser from "./usecase/user.update";
import Login from "./usecase/user.login";
import DeleteUser from "./usecase/user.delete";
import VerifyEmail from "./usecase/email.verify";



export default class UserController {
  
  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository){
  }

  registerRoutes() {
    this.userRegister();
    this.userUpdate();
    this.delete();
    this.login();
    this.verifyEmail();
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
    this.httpServer.securityRoute('put', '/user/update', async (_: any, query: any, body: any, authDecoded: any) => {
      const input = {
        username: body.username,
        currentPassword: body.currentPassword,
        newPassword: body.newPassword
      };

      const output = await new UpdateUser(this.userRepository).run(authDecoded.id, input);
      return output;
    })
  }
    
  private delete() {
    this.httpServer.securityRoute('delete', '/user/delete', async(_:any, query: any, body: any, authDecoded: any) => {
      await new DeleteUser(this.userRepository).run(authDecoded.id);
      return {message: 'User successfully deleted.'};
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


  private verifyEmail() {
    this.httpServer.securityRoute('get', '/verify-email', async (params: any, query: any, body: any, authDecoded: any) => {
      const { token } = query;
      const verifyEmail = new VerifyEmail(this.userRepository);    
      await verifyEmail.run(token);

      return {message: 'Email verified successfully.'}
    })
  }
}