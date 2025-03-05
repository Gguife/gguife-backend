import Project from "../../src/modules/project/entity/Project";

describe('Project Entity', () => {
  
  test('Should create project without the URLs', async () => {
    const project = await Project.create(
      'title project',
      'content project',
      'nodejs',
      1,
      1,
    )

    expect(project).toBeDefined();
    expect(project.title).toBe('title project');
    expect(project.content).toBe('content project');
    expect(project.tools).toBe('nodejs');
    expect(project.userId).toBe(1);
    expect(project.categoryId).toBe(1);
  });

  //should domainError if title is empty
  test('Should throw DomainError if title is empty', async () => {
    await expect(
      Project.create('', 'content project', 'nodejs', 1, 1)
    ).rejects.toThrow('The field title is empty.');
  })
  //should domainError if title is empty
  test('Should throw DomainError if content is empty', async () => {
    await expect(
      Project.create('title project', '', 'nodejs', 1, 1)
    ).rejects.toThrow('The field content is empty.');
  })
  //should domainError if tools is empty
  test('Should throw DomainError if tools is empty', async() => {
    await expect(
      Project.create('title project', 'content project', '', 1, 1)
    ).rejects.toThrow('The field tools is empty.')
  })


  //should domainError if linkDeploy url is invalid
  test('Should throw DomainError if linkDeploy url is invalid', async () => {
    await expect(
      Project.create('title project','content project', 'nodejs', 1, 1, 'hpp:invalid.com')
    ).rejects.toThrow('The link of deploy project is a invalid URL.')
  })
  //should domainError if linkRepository url is invalid
  test('Should throw DomainError if linkRepository url is invalid', async () => {
    await expect(
      Project.create('title project','content project', 'nodejs', 1, 1, '', 'hpp:invalid.com')
    ).rejects.toThrow('The link of repository project is a invalid URL.')
  })
  //should domainError if imageUrl url is invalid
  test('Should throw DomainError if imageURL is a invalid URL', async () => {
    await expect(
      Project.create('title project','content project', 'nodejs', 1, 1, '', '', 'hpp:example.com')
    ).rejects.toThrow('The link of image project is a invalid URL.')
  })

  //Should create project with all urls valid
  test('Shoud create project with all URLs valid', async () => {
       const project = await Project.create(
      'title project',
      'content project',
      'nodejs',
      1,
      1,
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com"
    )

    expect(project).toBeDefined();
    expect(project.title).toBe('title project');
    expect(project.content).toBe('content project');
    expect(project.tools).toBe('nodejs');
    expect(project.userId).toBe(1);
    expect(project.categoryId).toBe(1);
    expect(project.linkDeploy).toBe('https://www.google.com');
    expect(project.linkRepository).toBe('https://www.google.com');
    expect(project.imageUrl).toBe('https://www.google.com');
  })
})