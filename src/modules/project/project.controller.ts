import HttpServer from "../../infra/http/httpServer";
import ProjectRepository from "./project.repository";
import CreateProject from "./usecase/project.create";




export default class ProjectController {

  constructor(readonly httpServer: HttpServer, readonly projectRepository: ProjectRepository){
  }

  registerRoutes() {
    this.projectRegister();
  }

  private projectRegister() {
    this.httpServer.securityRoute('post', '/project/register', async (params: any, query: any, body: any, authDecoded: any) => {
      const userId = authDecoded.id;

      const input = {
        title: body.title,
        content: body.content,
        tools: body.tools,
        userId: userId,
        categoryId: body.categoryId,
        linkDeploy: body.linkDeploy,
        linkRepository: body.linkRepository,
        imageUrl: body.imageUrl
       }

       const output = await new CreateProject(this.projectRepository).run(input);

       return output;
    })
  }
}