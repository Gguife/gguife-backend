import DomainError from "../../../application/error/DomainError";


const isFieldEmpty = (field: string) => !field || field.trim().length === 0;

const isValidURL = (url: string) => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if(!urlPattern.test(url)) return false;

  try {
    new URL(url);
    return true;
  }catch(err: any){
    return false;
  }
}  



export default class Project {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
    readonly tools: string,
    readonly userId: number,
    readonly categoryId: number,
    public linkDeploy: string | null,
    public linkRepository: string | null,
    public imageUrl: string | null
  ){
  }


  //Factory Method for create projects
  static async create(
    title: string,
    content: string,
    tools: string,
    userId: number,
    categoryId: number,
    linkDeploy: string = "",
    linkRepository: string = "",
    imageURl: string = ""
  ) {

    //Validation fields title, content, tools
    if(isFieldEmpty(title)) throw new DomainError('The field title is empty.');  
    if(isFieldEmpty(content)) throw new DomainError('The field content is empty.');  
    if(isFieldEmpty(tools)) throw new DomainError('The field tools is empty.');  

    //Validation URl for fields deploy repository and image
    if(!isFieldEmpty(linkDeploy) && !isValidURL(linkDeploy)) throw new DomainError('The link of deploy project is a invalid URL.');
    if(!isFieldEmpty(linkRepository) && !isValidURL(linkRepository)) throw new DomainError('The link of repository project is a invalid URL.');
    if(!isFieldEmpty(imageURl) && !isValidURL(imageURl)) throw new DomainError('The link of image project is a invalid URL.');

    return new Project(
      0,
      title,
      content, 
      tools, 
      userId, 
      categoryId, 
      linkDeploy, 
      linkRepository, 
      imageURl
    );
  }
}