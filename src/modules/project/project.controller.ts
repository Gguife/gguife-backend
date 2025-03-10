import HttpServer from "../../infra/http/httpServer";
import ProjectRepository from "./project.repository";
import CreateProject from "./usecase/project.create";
import GetProjectsUser from "./usecase/project.getAll";
import GetProject from "./usecase/project.getById";


export default class ProjectController {

  constructor(readonly httpServer: HttpServer, readonly projectRepository: ProjectRepository){
  }

  registerRoutes() {
    this.projectRegister();
    this.getProject();
    this.getAllProject();
  }

  private projectRegister() {
    this.httpServer.securityRoute('post', '/project/register', async (params: any, query: any, body: any, authDecoded: any, imageUrl: string) => {
      const userId = authDecoded.id;
      
      const imageProject = imageUrl || "";

      const input = {
        title: body.title,
        content: body.content,
        tools: body.tools,
        userId: userId,
        categoryId: body.categoryId,
        linkDeploy: body.linkDeploy,
        linkRepository: body.linkRepository,
        imageUrl: imageProject
       }

       const output = await new CreateProject(this.projectRepository).run(input);

       return output;
    })
  }

  private getProject() {
    this.httpServer.securityRoute('get', '/project/:id', async (params: any, query: any, body: any, authDecoded: any) => {
      const output = await new GetProject(this.projectRepository).run(params.id);
      return output;
    })
  }

  private getAllProject() {
    this.httpServer.securityRoute('get', '/projects', async (params: any, query: any, body: any, authDecoded: any) => {
      const userId = authDecoded.id;
      const output = await new GetProjectsUser(this.projectRepository).run(userId);
      return output;
    })
  }
}