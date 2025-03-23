import Project from "../entity/Project";
import ProjectRepository from "../project.repository";



export default class CreateProject {

  constructor(readonly projectRepository: ProjectRepository){
  }

  async run(input: Input): Promise<Output> {
    // Use factory method for create project
    const project = await Project.create(
      input.title,
      input.introduction,
      input.content,
      input.tools,
      input.userId,
      input.categoryId,
      input.linkDeploy,
      input.linkRepository,
      input.imageUrl
    );
    
    // send response new project for projec repository create data
    const newProject = await this.projectRepository.create(project);

    // Return project ID and project title
    return {
      id: newProject.id,
      title: newProject.title
    };
  }

}



type Input = {
  title: string, 
  introduction: string
  content: string,
  tools: string,
  userId: number,
  categoryId: number,
  linkDeploy: string,
  linkRepository: string,
  imageUrl: string
}

type Output = {
  id: number,
  title: string
}