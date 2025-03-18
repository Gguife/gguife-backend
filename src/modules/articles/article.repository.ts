import { PrismaClient } from "@prisma/client";
import Article from "./entity/Article";



export default interface ArticleRepository {
  create(article: Article): Promise<{id: number}>;
}



export class articleRepositoryDB implements ArticleRepository {
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }


  async create(article: Article): Promise<{ id: number; }> {
      

    return {id: 1};
  }
}