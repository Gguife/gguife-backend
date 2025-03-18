import { PrismaClient } from "@prisma/client";
import Article from "./entity/Article";
import DomainError from "application/error/DomainError";



export default interface ArticleRepository {
  create(article: Article): Promise<{id: number}>;
  getOne(id: number): Promise<Article>;
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
}