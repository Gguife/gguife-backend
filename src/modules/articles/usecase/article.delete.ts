import ArticleRepository from "../article.repository";

export default class DeleteArticle {

  constructor(readonly articleRepository: ArticleRepository){}

  async run(articleId: number): Promise<void>{
    const id = Number(articleId);
    await this.articleRepository.delete(id);
  }
} 