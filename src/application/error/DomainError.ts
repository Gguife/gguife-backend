export default class DomainError extends Error {
  public errors: string[];

  constructor(message: string | string[]){
    super(Array.isArray(message) ? message.join(', ') : message);
    this.name = 'DomainError';
    this.errors = Array.isArray(message) ? message : [message];
  }
}