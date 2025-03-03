import { ExpressAdapter } from "./infra/http/httpServe";
import dotenv from "dotenv";
import allowedOrigin from "./application/config/cors.config";
import { UserRepositoryDB } from "./modules/user/user.repository";
import UserController from "./modules/user/user.controller";

dotenv.config();

const httpServer = new ExpressAdapter(allowedOrigin);


const userRepository = new UserRepositoryDB();
const userController = new UserController(httpServer, userRepository);

httpServer.route('get', '/', (params: any, body: any) => { return { message: "© 2025 - Gguife portfolio está Online!" } });


userController.registerRoutes();

httpServer.listen(Number(process.env.PORT) || 8080);