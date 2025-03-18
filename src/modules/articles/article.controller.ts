import HttpServer from "../../infra/http/httpServer";
import CreateArticle from "./usecase/article.create";
import ArticleRepository from "./article.repository";
import GetOneArticle from "./usecase/article.getById";

export default class ArticleController {

  constructor(readonly httpServer: HttpServer, readonly articleRepository: ArticleRepository){}

  registerRoutes() {
    this.articleRegister();
    this.getArticle();
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
  
}
