

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
  static async create(title: string, content: string, tools: string) {
    //Validetaion fields title, content, tools
    if(isFieldEmpty(title)) {

    }


    
  }



}