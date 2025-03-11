import { PrismaClient } from "@prisma/client";
import Project from "./entity/Project";
import DomainError from "../../application/error/DomainError";



export default interface ProjectRepository {
  create(project: Project): Promise<{id: number, title: string}>;
  getOne(id: number): Promise<Project>;
  getAll(username: string): Promise<Array<{
    id: number;
    title: string;
    content: string;
    tools: string;
    linkDeploy: string;
    linkRepository: string;
    imageUrl: string;
    categoryId: number;
  }>>;
  update(id: number, input: updateInput): Promise<string>;
  //delete project
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


  async getOne(id: number): Promise<Project> {
    const project = await this.prisma.projects.findUnique({
      where: {
        id: id,
      }
    });

    if(!project) throw new DomainError('Project not found.');

    return project;
  } 

  async getAll(username: string): Promise<Array<{
    id: number;
    title: string;
    content: string;
    tools: string;
    linkDeploy: string;
    linkRepository: string;
    imageUrl: string;
    categoryId: number;
    }>>{
    
    const user = await this.prisma.users.findUnique({where: {username: username}})
    if(!user) throw new DomainError('User not found.');

    const projects = await this.prisma.projects.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        title: true,
        content: true,
        tools: true,
        linkDeploy: true,
        linkRepository: true,
        imageUrl: true,
        categoryId: true
      }
    })

    if(projects.length === 0) throw new DomainError('Not projects found.');  
    
    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      content: project.content,
      tools: project.tools,
      linkDeploy: project.linkDeploy ?? '',
      linkRepository: project.linkRepository ?? '',
      imageUrl: project.imageUrl ?? '',
      categoryId: project.categoryId
    }));
  }

  async update(id: number, input: updateInput): Promise<string> {
    await this.prisma.projects.update({
      where: {
        id: id
      },
       data: {
        title: input.title,
        content: input.content,
        tools: input.tools,
        linkDeploy: input.linkDeploy,
        linkRepository: input.linkRepository
       }
    })
   
    return 'Project update successfully.';
  }
}



type updateInput = Partial<{
  title: string,
  content: string, 
  tools: string,
  linkDeploy: string,
  linkRepository: string
}>