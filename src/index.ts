import { ExpressAdapter } from "./infra/http/httpServer";
import dotenv from "dotenv";
import allowedOrigin from "./application/config/cors.config";
import { UserRepositoryDB } from "./modules/user/user.repository";
import UserController from "./modules/user/user.controller";
import ProjectController from "./modules/project/project.controller";
import { ProjectRepositoryDB } from "./modules/project/project.repository";

dotenv.config();

const httpServer = new ExpressAdapter(allowedOrigin);

//repository - Data
const userRepository = new UserRepositoryDB();
const projectRepository = new ProjectRepositoryDB();

//Controller - endpoints/routes
const userController = new UserController(httpServer, userRepository);
const projectController = new ProjectController(httpServer, projectRepository); 
userController.registerRoutes();
projectController.registerRoutes();


httpServer.route('get', '/', (params: any, body: any) => { 
  return {
    message: "© 2025 - Gguife portfolio está Online!"
  } 
});

httpServer.listen(Number(process.env.PORT) || 8080);