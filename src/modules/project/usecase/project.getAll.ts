import ProjectRepository from "../project.repository";


export default class GetProjectsUser {

  constructor(readonly projectRepository: ProjectRepository) {
  }

  async run(userId: number): Promise<Array<{
    id: number;
    title: string;
    content: string;
    tools: string;
    linkDeploy: string;
    linkRepository: string;
    imageUrl: string;
    }>> {

    const projects = await this.projectRepository.getAllUserProjects(userId);
    return projects;
  }
}