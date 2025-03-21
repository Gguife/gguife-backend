import HttpServer from "../../infra/http/httpServer";
import CreateArticle from "./usecase/article.create";
import ArticleRepository from "./article.repository";
import GetOneArticle from "./usecase/article.getById";
import GetAllArticles from "./usecase/article.getAll";
import DeleteArticle from "./usecase/article.delete";
import UpdateArticle from "./usecase/article.update";

export default class ArticleController {

  constructor(readonly httpServer: HttpServer, readonly articleRepository: ArticleRepository){}

  registerRoutes() {
    this.articleRegister();
    this.getArticle();
    this.getAllArticle();
    this.articleDelete();
    this.updateArticle();
  }



  private articleRegister() {
    this.httpServer.securityRoute('post', '/article/register', async (params: any, query: any, body: any, authDecoded: any, imageUrl: any) => {
      const userId = authDecoded.id;
      const imageArticle = imageUrl || "";

      const input = {
        title: body.title,
        introduction: body.introduction,
        content: body.content,
        tagId: body.tagId,
        userId: userId,
        imageUrl: imageArticle 
      }

      const output = await new CreateArticle(this.articleRepository).run(input);
      
      return output;
    })
  }

  private getArticle() {
    this.httpServer.route('get', '/article/:id', async (params: any, body: any) => {
      const output = await new GetOneArticle(this.articleRepository).run(params.id);
      return output; 
    })
  }

  private getAllArticle() {
    this.httpServer.route('get', '/articles/:username', async (params: any, body: any, query: any) => {
      const page = +query.page || 1;
      const limit = +query.limit || 10;
      const offset = (page - 1) * limit;

      const output = await new GetAllArticles(this.articleRepository).run(params.username, offset, limit);
      return {
        page,
        limit,
        total: output.total,
        articles: output.articles
      };   
    })
  }

  private updateArticle() {
    this.httpServer.securityRoute('post', '/article/update/:id', async (params: any, query: any, body: any, authDecoded: any, imageUrl: any) => {
      const input = {
        title: body.title,
        introduction: body.introduction,
        content: body.content,
        tagId: body.tagId
      }

      const userId = authDecoded.id;

      await new UpdateArticle(this.articleRepository).run(params.id, userId, input);
      return {message: "Article updated successfully."};
    })
  }

  private articleDelete() {
    this.httpServer.securityRoute('delete', '/article/:id', async (params: any, query: any, body: any, authDecoded: any, imageUrl: any) => {
      await new DeleteArticle(this.articleRepository).run(params.id);
      return {message: "Article deleted successfuly."}
    })
  }
}
