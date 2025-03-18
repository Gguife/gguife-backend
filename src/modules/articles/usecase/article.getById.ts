import ArticleRepository from "../article.repository";

export default class GetOneArticle {

  constructor(readonly articleRepository: ArticleRepository){}

  async run(articleId: number){
    const id = Number(articleId);
    const article = await this.articleRepository.getOne(id);
    return article;
  }
}