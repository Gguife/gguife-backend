import HttpServer from "../infra/http/httpServe";
import UserRepository from "./user.repository";
import SendMail from "./usecase/email.send";
import CreateUser from "./usecase/user.create";
import UpdateUser from "./usecase/user.update";



export default class UserController {
  
  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository){
  }

  registerRoutes() {
    this.userRegister();
    this.userUpdate();
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
    this.httpServer.securityRoute('post', '/user/update', async (params: any, body: any, authDecoded: any) => {
      const input = {
        username: body.username,
        password: body.password
      };

      const output = await new UpdateUser(this.userRepository).run(authDecoded.id, input);
      return output;
    })
  }
}