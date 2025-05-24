import ArticleRepository from "../article.repository";
import {marked} from "marked";

export default class GetOneArticle {

  constructor(readonly articleRepository: ArticleRepository){}

  async run(articleId: number): Promise<Output>{
    const id = Number(articleId);
    const article = await this.articleRepository.getOne(id);
    const formattedArticles = {
      ...article,
      content: marked.parse(article.content) as string,
      createdAt: new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
    };

    return formattedArticles;
  }
}

type Output = {
  id: number,
  title: string, 
  introduction: string,
  content: string,
  imageUrl: string,
  tagId: number,
  createdAt: string
}