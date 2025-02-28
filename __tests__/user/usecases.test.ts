import CreateUser from '../../src/user/usecase/user.create';
import UserRepository from '../../src/user/user.repository';
import SendEmail from '../../src/user/usecase/email.send';
import JWTService from '../../src/application/services/jwt.service';
import User from '../../src/user/entity/User';

//Mock dependecies
jest.mock('../../src/infra/http/httpClient');
jest.mock('../../src/user/user.repository');
jest.mock('../../src/user/usecase/email.send');
jest.mock('../../src/application/services/jwt.service');


describe('User requests - create, udpate, delete, login', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let sendEmail: jest.Mocked<SendEmail>;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      validateUsername: jest.fn(),
      login: jest.fn(),
    }
    
    sendEmail = { run: jest.fn() } as jest.Mocked<SendEmail>;
    createUser = new CreateUser(userRepository, sendEmail);
    
    (JWTService as jest.Mock).mockImplementation(() => ({
      token: jest.fn().mockReturnValue("mocked-jwt-token")
    }));    
  })
  
  
  
  describe('Create user', () => {
    const input = {
      username: 'linux',
      email: 'linux@gmail.com',
      passwordPlainText: 'Linux123123.'
    }

    test.skip('Should create user and send emai with jwt Token', async () => {
      const mockUser = await User.create(input.username, input.email, input.passwordPlainText);

      userRepository.create.mockResolvedValue(mockUser);
      sendEmail.run.mockResolvedValue(undefined);
      
      const response = await createUser.run(input);

      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        username: 'linux',
        email:  'linux@gmail.com'
      }))
      expect(sendEmail.run).toHaveBeenCalledWith('linux@gmail.com', 'mocked-jwt-token');
      expect(response).toEqual({id: mockUser.id});
    })
    
    test('Should user do not be created with wrong credentials', async () => {
      const wrongInput = {
        username: 'Linux',
        email: 'linuxemail.com',
        passowrdPlainText: '123123'
      }

      const mocWrongUser = await User.create(wrongInput.username, wrongInput.email, wrongInput.passowrdPlainText);

      console.log(mocWrongUser);
    })

    //Nao criar para quando nao enviar token
    test.skip('Should user do not be created if not have token', () => {

    })

    //Nao criar para quando nao enviar email
    test.skip('Should user do not be created if not send verify email', () => {

    })
  })

  //describe('Update user',() => {})
  //describe('Delete user',() => {})
  //describe('login user',() => {})
})
