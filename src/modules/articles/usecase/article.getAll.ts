import ArticleRepository from "../article.repository";

export default class GetAllArticles {
  constructor(readonly articleRepository: ArticleRepository){}


  async run(username: string): Promise<Output[]>{
    const article = await this.articleRepository.getAll(username);
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