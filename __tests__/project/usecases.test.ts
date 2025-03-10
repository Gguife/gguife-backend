import CreateProject from '../../src/modules/project/usecase/project.create';
import GetOneProject from '../../src/modules/project/usecase/project.getById';
import GetProjectsUser from '../../src/modules/project/usecase/project.getAll';
import ProjectRepository from '../../src/modules/project/project.repository';
import Project from '../../src/modules/project/entity/Project';


//Mock dependencies
jest.mock('../../src/modules/project/project.repository');


describe('Project requests - read, create, update, delete', () => {
  let projectRepository: jest.Mocked<ProjectRepository>;
  let createProject: CreateProject;
  let getOneProject: GetOneProject;
  let getProjectsUser: GetProjectsUser;

  beforeEach(() => {

    projectRepository = {
      create: jest.fn(),
      getOneProject: jest.fn(),
      getAllUserProjects: jest.fn()
    }
    
    createProject = new CreateProject(projectRepository);
    getOneProject = new GetOneProject(projectRepository);
    getProjectsUser = new GetProjectsUser(projectRepository);
  
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

    
  describe('Get a project', () => {
    const mockProject = {
      id:1,
      title: 'title project',
      content: 'content project',
      tools: 'nodejs',
      linkDeploy: "https://www.google.com",
      linkRepository: "https://www.google.com",
      imageUrl: "https://www.google.com",
      userId: 1,
      categoryId: 1,
    };
    
    test('Should return a project by Id', async () => {  
      projectRepository.getOneProject.mockResolvedValue(mockProject);
    
      const response = await getOneProject.run(1);

      expect(response).toEqual(mockProject);
    });

    test('Should throw a DomainError if not found project', async () => {
      projectRepository.getOneProject.mockRejectedValueOnce(new Error('DomainError: Project not found'));

      await expect(getOneProject.run(999))
        .rejects
        .toThrow('DomainError: Project not found');
      })
  })


  //get all user projects
  describe('Get all projects of unique user', () => {
    const mockProjects = [
      {
        id: 1,
        title: 'Title Project 1',
        content: 'Content for project 1',
        tools: 'Node.js, Express',
        linkDeploy: "https://www.google.com",
        linkRepository: "https://www.github.com/project1",
        imageUrl: "https://www.google.com/project1.jpg",
        categoryId: 1,
      },
      {
        id: 2,
        title: 'Title Project 2',
        content: 'Content for project 2',
        tools: 'React, Node.js',
        linkDeploy: "https://www.example.com",
        linkRepository: "https://www.github.com/project2",
        imageUrl: "https://www.example.com/project2.jpg",
        categoryId: 1,
      }
    ];

    test('Should return all projects by userId', async () => {
      projectRepository.getAllUserProjects.mockResolvedValue(mockProjects);

      const response = await getProjectsUser.run(1);
      expect(response).toEqual(mockProjects);
    })

    //Shoudl throw a DomainError if not found project
    test('Should throw a DomainError if not found projects', async () => {
      projectRepository.getOneProject.mockRejectedValueOnce(new Error('DomainError: Not projects found.'));

      await expect(getOneProject.run(999))
        .rejects
        .toThrow('DomainError: Not projects found.');
    })
  })

})