import { PrismaClient } from "@prisma/client";
import Article from "./entity/Article";
import DomainError from "application/error/DomainError";



export default interface ArticleRepository {
  create(article: Article): Promise<{id: number}>;
  getOne(id: number): Promise<Article>;
  getAll(username: string): Promise<GetAllOutput[]>;
  update(id: number, userId: number, input: udpateInput): Promise<void>;
  delete(id: number): Promise<void>;
}



export class articleRepositoryDB implements ArticleRepository {
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }
  
  async create(article: Article): Promise<{ id: number; }> {
    const newArticle = await this.prisma.articles.create({
      data: {
        title: article.title,
        introduction: article.introduction,
        content: article.content,
        imageUrl: article.imageUrl,
        tagId: article.tagId,
        userId: article.userId
      }
    });


    return { id: newArticle.id };
  }


  async getOne(id: number): Promise<Article> {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: id,
      }
    }); 

    if(!article) throw new DomainError('Article not found.');
    if (!article.imageUrl) throw new DomainError('The imageUrl is not defined.');

    return new Article(
      article.title,
      article.introduction,
      article.content,
      article.tagId,
      article.userId,
      article.imageUrl
    )
  }

  async getAll(username: string): Promise<GetAllOutput[]> {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username,
      }
    })  

    if(!user) throw new DomainError('User not found.');

    const articles = await this.prisma.articles.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        introduction: true,
        content: true,
        imageUrl: true,
        tagId: true
      }
    })

    if(articles.length === 0) throw new DomainError(`${user.username} don't have any projects`);
    
    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      introduction: article.introduction,
      content: article.content,
      imageUrl: article.imageUrl ?? "",
      tagId: article.tagId
    }));
  }

  async update(id: number, userId: number, input: udpateInput): Promise<void> {
    await this.prisma.articles.update({
      where: {
        id: id,
        userId: userId
      },
      data: {
        title: input.title,
        introduction: input.introduction,
        content: input.content,
        tagId: input.tagId
      }
    })  
  }

  async delete(id: number): Promise<void> {
    await this.prisma.articles.delete({
      where: {
        id: id
      }
    })
  }
}



type GetAllOutput = {
  id: number,
  title: string, 
  introduction: string,
  content: string,
  imageUrl: string,
  tagId: number
};

type udpateInput = {
  title: string, 
  introduction: string,
  content: string,
  tagId: number
}