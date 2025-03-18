import Article from "../../src/modules/articles/entity/Article";

describe('Article Entity', () => {
  
  test('Should create article without image URL', async () => {    
    const article = await Article.create(
      'Article title',
      'This is a article test',
      'The unit test is necessary',
      1,
      1
    );


    expect(article).toBeDefined();
    expect(article.title).toBe('Article title');
    expect(article.introduction).toBe('This is a article test');
    expect(article.content).toBe('The unit test is necessary');
    expect(article.tagId).toBe(1);
    expect(article.userId).toBe(1);
    expect(article.imageUrl).toBe("");
  })
  
  test('Should create article with image URL', async () => {    
    const article = await Article.create(
      'Article title',
      'This is a article test',
      'The unit test is necessary',
      1,
      1,
      'https://www.google.com'
    );




    expect(article).toBeDefined();
    expect(article.title).toBe('Article title');
    expect(article.introduction).toBe('This is a article test');
    expect(article.content).toBe('The unit test is necessary');
    expect(article.tagId).toBe(1);
    expect(article.userId).toBe(1);
    expect(article.imageUrl).toBe('https://www.google.com');
  });


  test('Should Throw DomainError if title field is empty', async () => {

    await expect(
      Article.create(  
        '',
        'This is a article test',
        'The unit test is necessary',
        1,
        1
      )
    ).rejects.toThrow('The field title is empty.')

  })

  test('Should Throw DomainError if title field is empty', async () => {

    await expect(
      Article.create(  
        'Article title',
        '',
        'The unit test is necessary',
        1,
        1
      )
    ).rejects.toThrow('The field introduction is empty.')

  })

  test('Should Throw DomainError if title field is empty', async () => {

    await expect(
      Article.create(  
        'Article title',
        'This is a article test',
        '',
        1,
        1
      )
    ).rejects.toThrow('The field content is empty.')

  })

  test('Should Throw DomainError if title field is empty', async () => {

    await expect(
      Article.create(  
        'Article title',
        'This is a article test',
        'The unit test is necessary',
        1,
        1,
        'url.invalid.com'
      )
    ).rejects.toThrow('The link of image article is a invalid URL.')

  })

})