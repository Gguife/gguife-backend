import express, { Request, Response } from 'express';
import cors from 'cors';
import AuthError from '../../application/error/AuthError';
import TokenError from '../../application/error/TokenError';
import TokenService from '../../application/services/toke.service';

export default interface HttpServer {
  route(method: string, url: string, callback: Function, statusCodeSuccess?: number): void;
  securityRoute(method: string, url: string,callback: Function, statusCodeSuccess?: number): void;
  listen(port: number): void;
}


export class ExpressAdapter implements HttpServer {
  private app: any;

  constructor(readonly allowedOrigens: any[]) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: allowedOrigens,
        credentials: true
      })
    )
  }

  route(method: string, url: string, callback: Function, statusCodeSuccess: number = 200): void {
    this.app[method.toLowerCase()](url.replace(/\{|\}/g, ""), async function(req: Request, res: Response) {
      try {
        const output = await callback(req.params, req.body);
        res.status(statusCodeSuccess).json(output)
      }catch(err: any) {
        res.status(handleStatusCode(err)).json({message: err.message});
      }
    })
  }

  securityRoute(method: string, url: string, callback: Function, statusCodeSuccess: number = 200): void {
    this.app[method.toLowerCase()](url.replace(/\{|\}/g, ""), async function(req: Request, res: Response) {
      try {
        const tokenService = new TokenService();

        //Pegar token via query - garantindo ser uma string
        const tokenFromQuery = typeof req.query.token === 'string' ? req.query.token : undefined;

        const authDecoded = await tokenService.validate(req.headers.authorization, tokenFromQuery);
        const output = await callback(req.params, req.query,req.body, authDecoded);
        res.status(statusCodeSuccess).json(output);  
      }catch(err: any) {
        res.status(handleStatusCode(err)).json({message: err.message});
      }
    })
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`Server running on port ${port}`));
  }
}


function handleStatusCode(err: any): number {
  let errorCode: number = 500;
  
  if(err.typeOf === AuthError) errorCode = 401;
  if(err.typeOf === TokenError) errorCode = 403;

  return errorCode;
}