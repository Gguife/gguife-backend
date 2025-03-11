import ProjectRepository from "../project.repository";



export default class UpdateProject {
  constructor(readonly projectRepository: ProjectRepository){}

  async run(id: number, input: Input): Promise<string> {
    
    const projectId = Number(id);
    
    //Filtering only the fields that were actually sent in the body
    const project = Object.fromEntries(
    Object.entries({
      title: input.title,
      content: input.content,
      tools: input.tools,
      linkDeploy: input.linkDeploy,
      linkRepository: input.linkRepository
    }).filter(([_, value]) => value !== undefined)); // Remove undefined values


    const newProject = await this.projectRepository.update(projectId, project);
    return newProject;
  }
}




type Input = Partial<{
  title: string,
  content: string, 
  tools: string,
  linkDeploy: string,
  linkRepository: string
}>