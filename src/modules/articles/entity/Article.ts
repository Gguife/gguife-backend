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


export default class Article {
  constructor(
    readonly title: string,
    readonly introduction: string,
    readonly content:string,
    readonly tagId: number,
    readonly userId: number,
    public imageUrl?: string,
  ) {}


  //Factory Method for create article
  static async create(
    title: string,
    introduction: string,
    content: string,
    tagId: number,
    userId: number,
    imageUrl: string = ""
  ) {

    //Validation fields title, introduction, content
    if(isFieldEmpty(title)) throw new DomainError('The field title is empty.');
    if(isFieldEmpty(introduction)) throw new DomainError('The field introduction is empty.');
    if(isFieldEmpty(content)) throw new DomainError('The field content is empty.');

    //Validation imageUrl 
    if(imageUrl && !isValidURL(imageUrl)) throw new DomainError('The link of image article is a invalid URL.')

    //Return article object    
    return new Article(
      title,
      introduction,
      content,
      tagId,
      userId,
      imageUrl
    )
  }

}