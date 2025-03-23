import ProjectRepository from "../project.repository";


export default class GetProjectsUser {

  constructor(readonly projectRepository: ProjectRepository) {
  }

  async run(username: string, offset: number, limit: number): Promise<{total: number, projects: Output[]}> {
    const projects = await this.projectRepository.getAll(username, offset, limit);
    return projects;
  }
}


type Output = {
  id: number,
  title: string, 
  introduction: string,
  content: string,
  tools: string[],
  linkDeploy: string,
  linkRepository: string,
  imageUrl: string,
  categoryId: number
}