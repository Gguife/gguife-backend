import ProjectRepository from "../project.repository";


export default class GetProjectsUser {

  constructor(readonly projectRepository: ProjectRepository) {
  }

  async run(username: string): Promise<Array<{
    id: number;
    title: string;
    content: string;
    tools: string;
    linkDeploy: string;
    linkRepository: string;
    imageUrl: string;
    categoryId: number;
    }>> {

    const projects = await this.projectRepository.getAllUserProjects(username);
    return projects;
  }
}