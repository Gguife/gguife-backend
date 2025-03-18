import ArticleRepository from "../article.repository"
import Article from "../entity/Article"



export default class CreateArticle {

  constructor(readonly articleRepository: ArticleRepository){}

  async run(input: Input): Promise<Ouput> {

    const article = await Article.create(
      input.title,
      input.introduction,
      input.content,
      input.tagId,
      input.userId,
      input.imageUrl
    );

    const newArticle = await this.articleRepository.create(article);

    return {
      id: newArticle.id
    };
  }

}





type Input = {
  title: string,
  introduction: string,
  content: string,
  tagId: number,
  userId: number,
  imageUrl?: string
}

type Ouput = {
  id: number
}