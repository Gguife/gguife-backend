import HttpServer from "../../infra/http/httpServer";
import ProjectRepository from "./project.repository";
import CreateProject from "./usecase/project.create";
import GetProjectsUser from "./usecase/project.getAll";
import GetProject from "./usecase/project.getById";
import UpdateProject from "./usecase/project.update";
import DeleteProject from "./usecase/project.delete";


export default class ProjectController {

  constructor(readonly httpServer: HttpServer, readonly projectRepository: ProjectRepository){
  }

  registerRoutes() {
    this.projectRegister();
    this.getProject();
    this.getAllProject();
    this.updateProject();
    this.deleteProject();
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
    this.httpServer.route('get', '/project/:id', async (params: any, body: any) => {
      const output = await new GetProject(this.projectRepository).run(params.id);
      return output;
    })
  }

  private getAllProject() {
    this.httpServer.route('get', '/projects/:username', async (params: any, body: any,) => {
      const { username } = params;
      const output = await new GetProjectsUser(this.projectRepository).run(username);
      return output;
    })
  }

  private updateProject() {
    this.httpServer.securityRoute('post', '/project/update/:id', async (params: any, query: any, body: any, authDecoded: any) => {
      const input = { 
        title: body.title,
        content: body.content,
        tools: body.tools,
        linkDeploy: body.linkDeploy,
        linkRepository: body.linkRepository
      }; 

      await new UpdateProject(this.projectRepository).run(params.id, input);
      return { message: "Project update successfully." }; 
    })
  }

  private deleteProject() {
    this.httpServer.securityRoute('delete', '/project/delete/:id', async (params: any, query: any, body: any, authDecoded: any) => {
      await new DeleteProject(this.projectRepository).run(params.id);
      return { message: "Project deleted successfully." }; 
    })
  }
}