const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret';

const auth = {
  secret: SECRET_KEY,
  expiresIn: "1d"
}

export default auth;