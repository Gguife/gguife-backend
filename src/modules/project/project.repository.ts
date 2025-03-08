import { PrismaClient } from "@prisma/client";
import Project from "./entity/Project";
import DomainError from "application/error/DomainError";



export default interface ProjectRepository {
  create(project: Project): Promise<{id: number, title: string}>;
  getById(id: number): Promise<Project>;
}


export class ProjectRepositoryDB implements ProjectRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }



  async create(project: Project): Promise<{id: number, title: string}> {
    const projectSaved = await this.prisma.projects.create({
      data: {
        title: project.title,
        content: project.content,
        tools: project.tools,
        linkDeploy: project.linkDeploy,
        linkRepository: project.linkRepository,
        imageUrl: project.imageUrl,
        categoryId: project.categoryId,
        userId: project.userId
      }
    })


    return {
      id: projectSaved.id,
      title: projectSaved.title
    }
  }


  async getById(id: number): Promise<Project> {
    const project = await this.prisma.projects.findUnique({
      where: {
        id: id,
      }
    });

    if(!project) throw new DomainError('Project not found.');

    return project;
  } 
}