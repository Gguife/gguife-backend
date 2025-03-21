import ArticleRepository from "../article.repository";

export default class GetAllArticles {
  constructor(readonly articleRepository: ArticleRepository){}


  async run(username: string, offset: number, limit: number): Promise<{total: number; articles: Output[]}>{
    const article = await this.articleRepository.getAll(username, offset, limit);
    return article;
  }
}


type Output = {
  id: number,
  title: string, 
  introduction: string,
  content: string,
  imageUrl: string,
  tagId: number
}