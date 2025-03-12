import bcrypt from 'bcrypt';


export default class PasswordService {
  private static readonly saltRounds: number = 8;

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  static passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static  validateStrongPassword = (password: string): string[] => {
    const errors: string[] = [];

    if(password.length < 8) errors.push('The password must contain at least 8 characters');
    if(!/[A-Z]/.test(password)) errors.push('The password must contain at least 1 uppercase letter');
    if(!/[a-z]/.test(password)) errors.push('The password must contain at least 1 lowercase letter');
    if(!/[0-9]/.test(password)) errors.push('The password must contain at least 1 number');
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('The password must contain at least 1 special caracter');
    
    return errors;
  }
}