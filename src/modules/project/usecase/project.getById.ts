import Project from "../entity/Project";
import ProjectRepository from "../project.repository";

export default class GetProject {
  constructor(readonly projectRespository: ProjectRepository){
  }

  async run(id: number): Promise<Project>{
    const projectId = Number(id);
    const project = await this.projectRespository.getOneProject(projectId);    
    return project;
  }
}