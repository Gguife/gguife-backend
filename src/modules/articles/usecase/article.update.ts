import ArticleRepository from "../article.repository";

export default class UpdateArticle {

  constructor(readonly articleRepository: ArticleRepository){}

  async run(articleId: number, userIdInput: number,input: Input): Promise<void> {
    const id = Number(articleId);
    const userId = Number(userIdInput);
    await this.articleRepository.update(id, userId, input);
  }
}


type Input = {
  title: string,
  introduction: string,
  content: string,
  tagId: number
}