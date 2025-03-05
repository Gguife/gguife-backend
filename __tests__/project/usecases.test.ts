import CreateProject from '../../src/modules/project/usecase/project.create';
import ProjectRepository from '../../src/modules/project/project.repository';
import Project from '../../src/modules/project/entity/Project';


//Mock dependencies
jest.mock('../../src/modules/project/project.repository');


describe('Project requests - read, create, update, delete', () => {
  let projectRepository: jest.Mocked<ProjectRepository>;
  let createProject: CreateProject;

  beforeEach(() => {

    projectRepository = {
      create: jest.fn()
    }
    
    createProject = new CreateProject(projectRepository);
  })

  describe('Create Project', () => {

    test('Should create project and return project id and project title', async () => {
      const input = {
        title: 'title project',
        content: 'content project',
        tools: 'nodejs',
        userId: 1,
        categoryId: 1,
        linkDeploy: "https://www.google.com",
        linkRepository: "https://www.google.com",
        imageUrl: "https://www.google.com"
      }

      const mockProject = await Project.create(
        input.title, 
        input.content,
        input.tools, 
        input.userId,
        input.categoryId,
        input.linkDeploy,
        input.linkRepository,
        input.imageUrl
      );

      projectRepository.create.mockResolvedValue(mockProject);

      const response = await createProject.run(input);

      expect(projectRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        title: 'title project',
        content: 'content project',
        tools: 'nodejs',
        userId: 1,
        categoryId: 1,
        linkDeploy: "https://www.google.com",
        linkRepository: "https://www.google.com",
        imageUrl: "https://www.google.com"
      }))

      expect(response).toEqual({id: mockProject.id, title: mockProject.title});
      })
    })

})