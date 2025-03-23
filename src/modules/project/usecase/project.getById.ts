import Project from "../entity/Project";
import ProjectRepository from "../project.repository";

export default class GetProject {
  constructor(readonly projectRespository: ProjectRepository){
  }

  async run(id: number): Promise<{
    id: number;
    title: string;
    introduction: string;
    tools: string[];
    imageUrl: string;
    }> {
    const projectId = Number(id);
    const project = await this.projectRespository.getOne(projectId);    
    const arrTools = project.tools.split(","); 
  
    return {
      id: project.id,
      title: project.title,
      introduction: project.introduction,
      tools: arrTools,
      imageUrl: project.imageUrl, 
    };
  }
}