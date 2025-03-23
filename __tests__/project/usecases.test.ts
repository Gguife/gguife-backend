import CreateProject from '../../src/modules/project/usecase/project.create';
import GetOneProject from '../../src/modules/project/usecase/project.getById';
import GetProjectsUser from '../../src/modules/project/usecase/project.getAll';
import UpdateProject from '../../src/modules/project/usecase/project.update';
import DeleteProject from '../../src/modules/project/usecase/project.delete';
import ProjectRepository from '../../src/modules/project/project.repository';
import Project from '../../src/modules/project/entity/Project';


//Mock dependencies
jest.mock('../../src/modules/project/project.repository');


describe('Project usecases - read, create, update, delete', () => {
  let projectRepository: jest.Mocked<ProjectRepository>;
  let createProject: CreateProject;
  let getOneProject: GetOneProject;
  let getProjectsUser: GetProjectsUser;
  let updateProject: UpdateProject;
  let deleteProject: DeleteProject;


  beforeEach(() => {

    projectRepository = {
      create: jest.fn(),
      getOne: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
    
    createProject = new CreateProject(projectRepository);
    getOneProject = new GetOneProject(projectRepository);
    getProjectsUser = new GetProjectsUser(projectRepository);
    updateProject = new UpdateProject(projectRepository);
    deleteProject = new DeleteProject(projectRepository);

  
  })

  describe('Create Project', () => {

    test('Should create project and return project id and project title', async () => {
      const input = {
        title: 'title project',
        introduction: 'introduction project',
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
        input.introduction,
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
        introduction: 'introduction project',
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
      title: 'title project',
      content: 'content project',
      tools: ['nodejs', 'express'],
      linkDeploy: "https://www.google.com",
      linkRepository: "https://www.google.com",
      imageUrl: "https://www.google.com",
      userId: 1
    };
    
    test('Should return a project by Id', async () => {  
      projectRepository.getOne.mockResolvedValue(mockProject);
    
      const response = await getOneProject.run(1);

      expect(response).toEqual(mockProject);
    });

    test('Should throw a DomainError if not found project', async () => {
      projectRepository.getOne.mockRejectedValueOnce(new Error('DomainError: Project not found'));

      await expect(getOneProject.run(999))
        .rejects
        .toThrow('DomainError: Project not found');
      })
  })



  //Inseriri test pagination aqui
  describe('Get all projects of unique user', () => {
    const limit = 10;
    const offset = 3;
    const mockProjects = [
      {
        id: 1,
        title: 'Title Project 1',
        introduction: 'introduction project 1',
        content: 'Content for project 1',
        tools: ['Node.js', 'Express'],
        linkDeploy: "https://www.google.com",
        linkRepository: "https://www.github.com/project1",
        imageUrl: "https://www.google.com/project1.jpg",
        categoryId: 1,
      },
      {
        id: 2,
        title: 'Title Project 2',
        introduction: 'introduction project 1',
        content: 'Content for project 2',
        tools: ['React', 'Node.js'],
        linkDeploy: "https://www.example.com",
        linkRepository: "https://www.github.com/project2",
        imageUrl: "https://www.example.com/project2.jpg",
        categoryId: 1,
      }
    ];

    test('Should return all projects by username', async () => {
      projectRepository.getAll.mockResolvedValue({total: 10, projects: mockProjects});

      const response = await getProjectsUser.run('linux', offset, limit);
      expect(response).toEqual({total: 10, projects: mockProjects});
    })

    test('Should throw a DomainError if not found projects', async () => {
      projectRepository.getOne.mockRejectedValueOnce(new Error('DomainError: Not projects found.'));

      await expect(getOneProject.run(999))
        .rejects
        .toThrow('DomainError: Not projects found.');
    })
  })


  describe('Update project', () => {
    const id = 1;
    const userId = 1;
    const input = {
      title: "Test title",
      introduction: 'introduction project',
      content: "Test Content",
      tools: undefined,
      linkDeploy: "http://google.com",
      linkRepository: undefined
    }



    test('Shoudl update project', async () => {
      await projectRepository.update.mockResolvedValue(undefined);

      await updateProject.run(id, userId,input);

      expect(projectRepository.update).toHaveBeenCalledWith(
        id, 
        userId,
        expect.objectContaining({
          title: "Test title",
          introduction: 'introduction project',
          content: "Test Content",
          linkDeploy: "http://google.com",
      }))
    });


    test('Should throw a DomainError if project have a invalid URL', async () => {
      const invalidInput = {
        title: "Test title",
        introduction: 'introduction project',
        content: "Test Content",
        tools: undefined,
        linkDeploy: "httgoogle.com",
        linkRepository: undefined
      }

      await expect(updateProject.run(1, 1, invalidInput)).rejects.toThrow('Invalid URL.');
    })
  })



  describe('Delete project', () => {
    test('Should delete project', async () => {
      await projectRepository.delete.mockResolvedValue(undefined);

      await deleteProject.run(1);

      expect(projectRepository.delete).toHaveBeenCalledWith(1);
    });
  })
})