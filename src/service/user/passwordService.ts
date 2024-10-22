import bcrypt from "bcrypt";

const saltRounds = 8;

const hashPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
}

const passwordCompare = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
}


export default { hashPassword, passwordCompare };