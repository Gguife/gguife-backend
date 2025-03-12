export default class SMTPError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SMTPError';
  }
}