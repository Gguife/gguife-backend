import { PrismaClient } from "@prisma/client";
import Project from "./entity/Project";
import DomainError from "../../application/error/DomainError";



export default interface ProjectRepository {
  create(project: Project): Promise<{id: number, title: string}>;
  getOne(id: number): Promise<Project>;
  getAll(username: string, offset: number, limit: number): Promise<{total: number, projects: OutputAllProjects[]}>;
  update(id: number, userId: number, input: updateInput): Promise<void>;
  delete(id: number): Promise<void>;
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
        introduction: project.introduction,
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


  async getOne(id: number): Promise<Project> {
    const project = await this.prisma.projects.findUnique({
      where: {
        id: id,
      }
    });

    if(!project) throw new DomainError('Project not found.');

    return project;
  } 

  async getAll(username: string, offset: number, limit: number): Promise<{total: number, projects: OutputAllProjects[]}>{
    
    const user = await this.prisma.users.findUnique({where: {username: username}})
    if(!user) throw new DomainError('User not found.');

    const totalProjects = await this.prisma.projects.count({
      where: { userId: user.id }
    });
    
    const projects = await this.prisma.projects.findMany({
      where: {
        userId: user.id
      },
      skip: offset,
      take: limit, 
      select: {
        id: true,
        title: true,
        introduction: true,
        content: true,
        tools: true,
        linkDeploy: true,
        linkRepository: true,
        imageUrl: true,
        categoryId: true
      }
    })

    if(projects.length === 0) throw new DomainError('Not projects found.'); 
    
    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      introduction: project.introduction,
      content: project.content,
      tools: project.tools.split(",").map(tool => tool.trim()),
      linkDeploy: project.linkDeploy ?? '',
      linkRepository: project.linkRepository ?? '',
      imageUrl: project.imageUrl ?? '',
      categoryId: project.categoryId
    }))
    

    return {
      total: totalProjects, 
      projects: formattedProjects
    };
  }

  async update(id: number, userId: number, input: updateInput): Promise<void> {
    await this.prisma.projects.update({
      where: {
        id: id,
        userId: userId
      },
       data: {
        title: input.title,
        introduction: input.introduction,
        content: input.content,
        tools: input.tools,
        linkDeploy: input.linkDeploy,
        linkRepository: input.linkRepository
       }
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.projects.delete({
      where: {
        id: id
      }
    })
  }
}



type updateInput = Partial<{
  title: string,
  introduction: string,
  content: string, 
  tools: string,
  linkDeploy: string,
  linkRepository: string
}>

type OutputAllProjects = {
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