import HttpServer from "../infra/http/httpServe";
import UserRepository from "./user.repository";
import SendMail from "./usecase/email.send";
import CreateUser from "./usecase/user.create";



export default class UserController {
  
  constructor(readonly httpServer: HttpServer, readonly userRepository: UserRepository){
  }

  registerRoutes() {
    this.userRegister();
  }

  private userRegister() {
    this.httpServer.route('post', '/register', (_: any, body: any) => {
      const input = {
        username: body.username,
        email: body.email,
        passwordPlainText: body.password,
      };

      const sendEmail = new SendMail();
      const output = new CreateUser(this.userRepository, sendEmail).run(input);

      return output;
    })
  }

}