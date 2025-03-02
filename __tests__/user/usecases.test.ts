import CreateUser from '../../src/user/usecase/user.create';
import UpdateUser from '../../src/user/usecase/user.update';
import DeleteUser from '../../src/user/usecase/user.delete';
import Login from '../../src/user/usecase/user.login';
import UserRepository from '../../src/user/user.repository';
import SendEmail from '../../src/user/usecase/email.send';
import JWTService from '../../src/application/services/jwt.service';
import User from '../../src/user/entity/User';
import PasswordService from '../../src/application/services/password.service';

//Mock dependecies
jest.mock('../../src/infra/http/httpClient');
jest.mock('../../src/user/user.repository');
jest.mock('../../src/user/usecase/email.send');
jest.mock('../../src/application/services/jwt.service');


describe('User requests - create, udpate, delete, login', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let sendEmail: jest.Mocked<SendEmail>;
  let createUser: CreateUser;
  let updateUser: UpdateUser;
  let deleteUser: DeleteUser;
  let login: Login;
  
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
    updateUser = new UpdateUser(userRepository);
    deleteUser = new DeleteUser(userRepository);
    login = new Login(userRepository);

    (JWTService as jest.Mock).mockImplementation(() => ({
      token: jest.fn().mockReturnValue("mocked-jwt-token")
    }));    
  })
  
  
  
  describe('Create user', () => {

    test('Should create user and send emai with jwt Token', async () => {
      const input = {
        username: 'linux',
        email: 'linux@gmail.com',
        passwordPlainText: 'Linux123123.'
      }

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
  })

  describe('Update user',() => {    
    const mockUser = new User(
      1,
      'linux',
      'linux@gmail.com',
      'hashedPass',
      true,
    );

    test('Should update user and return updated user', async () => {

      userRepository.getById.mockResolvedValue(mockUser);
      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(true);
      jest.spyOn(PasswordService, 'validateStrongPassword').mockReturnValue([]);
      jest.spyOn(PasswordService, 'hashPassword').mockResolvedValue('hashedNewPass');
      userRepository.update.mockImplementation((user) => Promise.resolve(user));


      const updatedUser = await updateUser.run(mockUser.id, {
        username: 'newUser',
        newPassword: 'newPass123.',
        currentPassword: 'hashedPass'
      }); 

      expect(updatedUser.username).toBe('newUser');
      expect(updatedUser.getPassword()).toBe('hashedNewPass');
      expect(userRepository.update).toHaveBeenCalledWith(expect.any(User));
    })

    test('Should call validateUsername if username is provided', async () => {
      userRepository.getById.mockResolvedValue(mockUser);
      const validateUsernameSpy = jest.spyOn(userRepository, 'validateUsername').mockResolvedValue();

      await updateUser.run(1, {username: 'newUser'});

      expect(validateUsernameSpy).toHaveBeenCalledWith('newUser');
    });
    
    test('Should throw an error if user is not found', async () => {
      userRepository.getById.mockResolvedValue(undefined);

      await expect(updateUser.run(1, {username: 'newUser'}))
      .rejects
      .toThrow('User not found.')
    })

    test('Should throw an error if new password is provided without current password', async () => {
      userRepository.getById.mockResolvedValue(mockUser);

      await expect(updateUser.run(1, {newPassword: 'Newpass123.'}))
      .rejects
      .toThrow('Current password is required to update password.');
    });

    test('Should throw an error if new password is the same as current password', async () => {
      userRepository.getById.mockResolvedValue(mockUser);

      await expect(updateUser.run(1, {newPassword: 'newPass123.', currentPassword: 'newPass123.'}))
      .rejects
      .toThrow('This password has already been registred, enter a new one.')
    })

    test('Should throw an error if current password is incorrect', async () => {
      userRepository.getById.mockResolvedValue(mockUser);
      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(false);

      await expect(updateUser.run(1, {newPassword: 'newPass123.', currentPassword: 'newPass1235.'}))
      .rejects
      .toThrow('Current password is incorret.')
    })

    test('Should throw an error if new password is weak', async () => {
      userRepository.getById.mockResolvedValue(mockUser);

      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(true);
      jest.spyOn(PasswordService, 'validateStrongPassword').mockReturnValue([
        'The password must contain at least 1 number',
      ])

      await expect(updateUser.run(1, {newPassword: 'Weakpass.', currentPassword: 'hashpass'}))
      .rejects
      .toThrow('The password must contain at least 1 number');

    });

    test('Should hash the new password if it is valid', async () => {
      userRepository.getById.mockResolvedValue(mockUser);
      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(true);
      jest.spyOn(PasswordService, 'validateStrongPassword').mockReturnValue([]);
      
      const hashPasswordSpy = jest.spyOn(PasswordService, 'hashPassword').mockResolvedValue('hashedNewPass');

      await updateUser.run(1, {newPassword: 'NewPass123.', currentPassword: 'hashedPass'})

      expect(hashPasswordSpy).toHaveBeenCalledWith('NewPass123.');
    })

  })


  describe('Delete user',() => {
    const mockUser = new User(
      1,
      'linux',
      'linux@gmail.com',
      'hashedPass',
      true,
    );
    
    test('Should delete user', async () => {
      userRepository.getById.mockResolvedValue(mockUser);

      await deleteUser.run(mockUser.id);

      expect(userRepository.getById).toHaveBeenCalledWith(mockUser.id);
      expect(userRepository.delete).toHaveBeenCalledWith(mockUser.id);
    })
  })
  
  
  describe('login user', () => {
    const input = {
      username: 'linux',
      password: 'Linux123123.'
    }

    const mockUser = new User(
      1,
      'linux',
      'linux@gmail.com',
      'hashedPass',
      true,
    );
    
    //Should login and return token
    test('Should success login and return token', async () => {

      userRepository.login.mockResolvedValue(mockUser);            
      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(true);
      
      const response = await login.run(input);

      expect(userRepository.login).toHaveBeenCalledWith(input.username);
      expect(PasswordService.passwordCompare).toHaveBeenCalledWith(input.password, mockUser.getPassword());
      expect(mockUser.getActive()).toBe(true);
      expect(response).toEqual({"token": "mocked-jwt-token"});
    })

    test('Should throw an error if credentials is invalid', () => {

      userRepository.login.mockResolvedValue(mockUser);

      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(false);

      expect(login.run(input)).rejects.toThrow('Credentials Invalid.');
    })

    //should call getActive if user not verify and return Domain Error
    test('Should throw an erro if user not verify', () => {
      const mockUserInactive = new User(
        1,
        'linux',
        'linux@gmail.com',
        'hashedPass',
        false,
      );

      userRepository.login.mockResolvedValue(mockUserInactive);
      jest.spyOn(PasswordService, 'passwordCompare').mockResolvedValue(true);

      expect(mockUserInactive.getActive()).toBe(false);
      expect(login.run(input)).rejects.toThrow('Verify your email.');
    })
  })

})
