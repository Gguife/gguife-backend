import Project from "../entity/Project";
import ProjectRepository from "../project.repository";

export default class GetProject {
  constructor(readonly projectRespository: ProjectRepository){
  }

  async run(id: number): Promise<Output> {
    const projectId = Number(id);
    const project = await this.projectRespository.getOne(projectId);    
  
    return {
      title: project.title,
      content: project.content,
      tools: project.tools,
      imageUrl: project.imageUrl, 
      linkDeploy: project.linkDeploy,
      linkRepository: project.linkRepository,
      userId: project.userId
    };
  }
}


type Output = {
  title: string,
  content: string,
  tools: string[],
  linkRepository: string,
  linkDeploy: string,
  imageUrl: string,
  userId: number
}