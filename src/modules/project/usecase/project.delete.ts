import ProjectRepository from "../project.repository";


export default class DeleteProject {
  constructor(readonly projectRepository: ProjectRepository){}

  async run(id: number): Promise<void> {
    const projectId = Number(id);
    await this.projectRepository.delete(projectId);
  }
}