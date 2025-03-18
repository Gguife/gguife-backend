import DomainError from "../../../application/error/DomainError";
import ProjectRepository from "../project.repository";



export default class UpdateProject {
  constructor(readonly projectRepository: ProjectRepository){}

  async run(id: number, userIdInput: number, input: Input): Promise<void> {
    const projectId = Number(id);
    const userId = Number(userIdInput);

    //url Validation
    if (
      (input.linkDeploy !== undefined && !isValidURL(input.linkDeploy)) || 
      (input.linkRepository !== undefined && !isValidURL(input.linkRepository))
    ) {
      throw new DomainError('Invalid URL.');
    }

    //Filtering only the fields that were actually sent in the body
    const project = Object.fromEntries(
    Object.entries({
      title: input.title,
      content: input.content,
      tools: input.tools,
      linkDeploy: input.linkDeploy,
      linkRepository: input.linkRepository
    }).filter(([_, value]) => value !== undefined)); // Remove undefined values


    await this.projectRepository.update(projectId, userId, project);
  }
}


const isValidURL = (url: string) => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if(!urlPattern.test(url)) return false;

  try {
    new URL(url);
    return true;
  }catch(err: any){
    return false;
  }
}  



type Input = Partial<{
  title: string,
  content: string, 
  tools: string,
  linkDeploy: string,
  linkRepository: string
}>