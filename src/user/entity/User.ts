import PasswordService from '../../application/services/password.service';
import DomainError from '../../application/error/DomainError';
import SMTPError from '../../application/error/SmtpError';


//Constantes de validacao
const nameRegex = /^[A-Za-z0-9._-]{3,10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Funcoes auxiliares de validacao
const isFieldEmpty = (field: string) => !field || field.trim().length === 0;
const isValidName = (username: string) => nameRegex.test(username);
const isValidEmail = (email: string) => emailRegex.test(email);

export default class User {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    private password: string,
    private active: boolean,
    public verificationToken?: string,
  ){
    // Nao valida nada no construtor, pois ele deve ser usado apenas para trazer dados do BD.
  }
  
  // Static Factory Method - Para criar usuarios
  static async create(username: string, email: string, passwordPlainText: string) {
    // Validacao obrigatoria dos campos
    if(isFieldEmpty(username) || isFieldEmpty(email) || isFieldEmpty(passwordPlainText)) {
      throw new DomainError('The field is empty');
    }   
    
    // Validacao obrigatoria de username e email
    if(!isValidName(username)) throw new DomainError('Username invalid');
    if(!isValidEmail(email)) throw new DomainError('Email invalid');
    
    //Validacao obrigatoria do password
    const passwordValidateError = PasswordService.validateStrongPassword(passwordPlainText);
    if(passwordValidateError.length > 0) {
      throw new DomainError(passwordValidateError);      
    }

    //criptografia da senha
    const hashedPassword = await PasswordService.hashPassword(passwordPlainText)
    const active = false;

    return new User(0, username, email, hashedPassword, active);
  }

  getPassword(): string{
    return this.password;
  }

  async verifyPassword(passwordPlainText: string) {
    return await PasswordService.passwordCompare(passwordPlainText, this.password);
  }

  async changePassword(passwordPlainText: string) {
    const hashedPassword = await PasswordService.hashPassword(passwordPlainText);
    this.password = hashedPassword;
  }

  actived() {
    if(this.active) throw new DomainError(['User is already active.']);
    this.active = true;
  }

  inactive() {
    if(!this.active) throw new DomainError(['User is already inactive']);
    this.active = false;
  }

  getActive() {
    return this.active;
  }

  verifyEmail(): void {
    if(this.active) throw new SMTPError("User is already active.");
    this.active = true;
    this.verificationToken = undefined; 
  }
  
}