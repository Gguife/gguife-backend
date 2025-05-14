import ArticleRepository from "../article.repository";
// import { marked } from "marked";

export default class GetAllArticles {
  constructor(readonly articleRepository: ArticleRepository){}


  async run(username: string, offset: number, limit: number): Promise<{total: number; articles: Output[]}>{
    const article = await this.articleRepository.getAll(username, offset, limit);
    const formattedArticles = article.articles.map(article => ({
      ...article,
      // content: marked.parse(article.content) as string,
      createdAt: new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
    }));

    return {total: article.total, articles: formattedArticles};
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