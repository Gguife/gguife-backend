import {NextFunction, Request, Response} from 'express';
import validateUser from '../../src/middleware/user/validateUser';
import { prismaMock, userMock } from '../mock/prisma';
import * as passwordService from '../../src/service/user/passwordService';

const createMockReqResNext = () => {
  return {
    req: {body: {}, params: {}} as unknown as Request,
    res: {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response,
    next: jest.fn() as NextFunction
  };
}


describe("User validate fields test", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    ({req, res, next} = createMockReqResNext());
    jest.clearAllMocks();
  });
  
  describe('isFieldEmpty', () => {
    test('should return true for null or undefined', () => {
      expect(validateUser.isFieldEmpty(undefined as unknown as string)).toBe(true);
      expect(validateUser.isFieldEmpty(null as unknown as string)).toBe(true);
    });

    test('should return true for empty field string', () => {
      expect(validateUser.isFieldEmpty("")).toBe(true);
    });
    
    test('should return true for field string with only spaces', () => {
      expect(validateUser.isFieldEmpty(" ")).toBe(true);
    });
    
    test('should return false for non-empty field string', () => {
      expect(validateUser.isFieldEmpty("linux")).toBe(false);
    });
  })
  
  describe("Validate user Login", () => {
    test('should return 404 if the user is not validated', async () => {
      req.body = {
        username: 'Gabriel',
        password: '123123'
      }
      
      prismaMock.users.findUnique.mockResolvedValue(null);
      
      await validateUser.credentialLogin(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({error: 'Credenciais inválidas!'});
      expect(next).not.toHaveBeenCalled;
    });

    test('should return 500 if an authenticaton error', async () => {
      req.body = {
        username: 'Gabriel',
        password: '123123'
      }
      
      const dbError = new Error('Database error!');
      (prismaMock.users.findUnique as jest.Mock).mockResolvedValueOnce(dbError);

      await validateUser.credentialLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'Error na autenticação. Tente novamente mais tarde!'});
      expect(next).not.toHaveBeenCalled();
    });
    
    test('should return 401 if the password is invalid', async () => {
      req.body = {
        username: 'linux',
        password: '123123'
      }

      prismaMock.users.findUnique.mockResolvedValue(userMock);
      
      //Mock da funcao passwordCompare
      jest.spyOn(passwordService, 'passwordCompare').mockResolvedValue(false);

      await validateUser.credentialLogin(req, res, next); 

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({message: 'Credenciais inválidas!'})
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next when credentials are valid', async () => {
      req.body = {
        username: 'linux',
        password: '123123'
      }

      prismaMock.users.findUnique.mockResolvedValue(userMock);
      
      //Mock da funcao passwordCompare
      jest.spyOn(passwordService, 'passwordCompare').mockResolvedValue(true);
      
      await validateUser.credentialLogin(req, res, next); 
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  })
      
      
  describe('Validate user Register', () => {
    test('should return 400 for username that already exist', async () => {
      req.body = {
        username: 'linux',
        password: '123123'
      }

      prismaMock.users.findFirst.mockResolvedValue(userMock);

      await validateUser.credentialRegister(req, res ,next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({message: 'Este nome de usuário já existe!'});
      expect(next).not.toHaveBeenCalled();
    });
    
    test('should return 400 for weak password', async () => {
      req.body = {
        username: 'Gustavo',
        password: '123123'
      }

      prismaMock.users.findUnique.mockResolvedValue(req.body);
      
      //Mock da funcao validateStrongPassowrd
      jest.spyOn(passwordService, 'validateStrongPassword').mockReturnValue([
        'A senha deve conter no mínimo 8 caracteres',
        'A senha deve conter pelo menos 1 letra maiúscula',
        'A senha deve conter pelo menos 1 letra minúscula',
        'A senha deve conter pelo menos 1 caractere especial'
      ]);
      
      await validateUser.credentialRegister(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next when credentials are valid', async () => {
      req.body = {
        username: 'Gustavo',
        password: 'Gus123123.'
      }

      jest.spyOn(passwordService, 'validateStrongPassword').mockReturnValue([]);

      prismaMock.users.create.mockResolvedValue(req.body);

      await validateUser.credentialRegister(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  })
})