import bcrypt from "bcrypt";

const saltRounds = 8;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
}

export const passwordCompare = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
}

export const validateStrongPassword = (password: string) => {

  if(password.length < 8){
    throw new Error('A senha deve conter no mínimo 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error('A senha deve conter pelo menos 1 letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    throw new Error('A senha deve conter pelo menos 1 letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    throw new Error('A senha deve conter pelo menos 1 número');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error('A senha deve conter pelo menos 1 caractere especial');
  }

}