import Project from "../entity/Project";
import ProjectRepository from "../project.repository";

export default class GetProject {
  constructor(readonly projectRespository: ProjectRepository){
  }

  async run(id: number): Promise<Project>{
    const project = await this.projectRespository.getById(id);    
    return project;
  }
}