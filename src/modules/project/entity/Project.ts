import DomainError from "../../../application/error/DomainError";


const isFieldEmpty = (field: string) => !field || field.trim().length === 0;

export default class Project {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
    readonly tools: string,
    readonly categoryId: number,
    readonly userId: number,
    public imageUrl?: string,
    public linkDeploy?: string,
    public linkRepository?: string,
  ){
  }


  //Factory Method for create projects
  static create(title: string, content: string, tools: string, categoryId: number, userId: number) {
    //Validation fields title, content, tools
    if(isFieldEmpty(title) || isFieldEmpty(content) || isFieldEmpty(tools)) {
      throw new DomainError('The field is empty.');
    }

    return new Project(0, title, content, tools, categoryId, userId);
  }
}