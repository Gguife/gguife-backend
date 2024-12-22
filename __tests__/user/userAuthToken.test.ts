import jwt from 'jsonwebtoken';
import { authToken } from '../../src/middleware/user/authToken';
import { NextFunction, Request, Response } from 'express';

const SECRET_KEY = 'defaultSecret';

const createMockReqResNext = () => {
  return {
    req: {
      headers: {},
      header: jest.fn() as jest.Mock    
    } as unknown as Request,
    res: {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn().mockReturnThis()
    } as unknown as Response,
    next: jest.fn() as NextFunction
  }
}

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));


describe('Authenticate jwt', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    ({req, res, next} = createMockReqResNext());
    jest.clearAllMocks();
  })

  test('should return error 401 for no authorization header', async () => {
    req.headers = {authorization: 'invalid'};
    (req.header as jest.Mock).mockReturnValue(undefined);

    await authToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Acesso negado!');
    expect(next).not.toHaveBeenCalled();
  });

  test('should verify and return the decoded payload of the JWT token', async () => {
    const mockPayload = {
      id: 1,
      username: 'linux'
    };
    const mockToken = 'jwt-mock-token';
    
    req.headers = {authorization: `Bearer ${mockToken}`};
    (req.header as jest.Mock).mockReturnValue(`Bearer ${mockToken}`); 

    (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

    await authToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, SECRET_KEY);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  })

})