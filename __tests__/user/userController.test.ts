import { Request, Response, NextFunction } from 'express';
import { prismaMock, userMock, usersMock } from '../mock/prisma';
import { allUsers, createUser, deleteUser, loginUser, oneUser } from '../../src/controller/userContorller';
import { generateToken } from '../../src/middleware/user/authToken';

const createMockReqResNext = () => {
  return {
    req: {
      body: {},
      user: {
        id: 1,
        username: 'linux'
      },
      params: {}
    } as unknown as Request,
    res: {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response,
    next: jest.fn() as NextFunction
  }
}


//mockando func generateToken
jest.mock('../../src/middleware/user/authToken', () => ({
  generateToken: jest.fn(() => 'mockedToken')
}));


describe('User controller', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    ({req, res, next} = createMockReqResNext());
    jest.clearAllMocks();
  });

  describe('POST /user/register', () => {
    test('should create user', async () => {
      req.body = {
        username: 'gguife',
        password: 'Gui123123.'
      }

      prismaMock.users.create.mockReturnValue(req.body);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'usuário criado com sucesso!',
        user: expect.objectContaining({
          username: 'gguife',
          password: 'Gui123123.'
        })}
      );
    })
  });

  describe('GET /users', () => {
    test('should return all users', async () => {
      prismaMock.users.findMany.mockResolvedValue(usersMock);

      await allUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({users: usersMock});
    })
  });
  
  describe('GET /user/:id', () => {
    test('should return error 404 not found user', async () => {
      prismaMock.users.findUnique.mockResolvedValue(null);

      await oneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({error: 'User not found.'});
    })
    
    test('should return one user', async () => {
      prismaMock.users.findUnique.mockResolvedValue(userMock);

      await oneUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({user: userMock});
    })
  });


  describe('POST /login', () => {
    test('should generate token and return success response', async () => {

      await loginUser(req, res);

      expect(generateToken).toHaveBeenCalledWith(1, 'linux');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login bem-sucedido',
        token: 'mockedToken'
      });
    })
  });

  describe('DELETE /user/:id', () => {
    test('should delete user and return success response', async () => {
      req.params = { id: '1'};

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário deletado com sucesso!' });
    })
  });
  
  
})