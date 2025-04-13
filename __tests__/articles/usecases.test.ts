import ArticleRepository from '../../src/modules/articles/article.repository';
import Article from '../../src/modules/articles/entity/Article';
import CreateArticle from '../../src/modules/articles/usecase/article.create';
import GetArticle from '../../src/modules/articles/usecase/article.getById';
import GetAllArticles from '../../src/modules/articles/usecase/article.getAll';
import UpdateArticle from '../../src/modules/articles/usecase/article.update';
import DeleteArticle from '../../src/modules/articles/usecase/article.delete';


jest.mock('../../src/modules/articles/article.repository');

describe('Article usecases - read, create, update, delete', () => {
  let articleRepository: jest.Mocked<ArticleRepository>;
  let createArticle: CreateArticle;
  let getArticle: GetArticle;
  let getAllArticles: GetAllArticles;
  let updateArticle: UpdateArticle;
  let deleteArticle: DeleteArticle;

  beforeEach(() => {
    articleRepository = {
      create: jest.fn(),
      getOne: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    createArticle = new CreateArticle(articleRepository);
    getArticle = new GetArticle(articleRepository);
    getAllArticles = new GetAllArticles(articleRepository);
    updateArticle = new UpdateArticle(articleRepository);
    deleteArticle = new DeleteArticle(articleRepository);
  })  


  describe('Create article', () => {
    test('Should create article and return article id', async () => {
      const input = {
        title: 'Test title',
        introduction: 'Test introduction',
        content: 'Test content',
        imageUrl: '',
        tagId: 1,
        userId: 1
      }

      await Article.create(
        input.title,
        input.introduction,
        input.content,
        input.tagId,
        input.userId,
        input.imageUrl
      );

      articleRepository.create.mockResolvedValue({id: 1});


      const response = await createArticle.run(input);

      expect(articleRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test title',
        introduction: 'Test introduction',
        content: 'Test content',
        imageUrl: '',
      tagId: 1,
        userId: 1
      }))

      expect(response).toEqual({id: response.id});
    })
  })

  describe('Get a Article', () => {
    const article = {
      id: 1,
      title: 'Test title',
      introduction: 'Test introduction',
      content: 'Test content',
      imageUrl: '',
      tagId: 1
    }

    test('Should return article by article id', async () => {
      articleRepository.getOne.mockResolvedValue(article);

      const response = await getArticle.run(1);

      expect(response).toEqual(article);
    })

    test('Should throw a DomainError if not found the article', async () => {
      articleRepository.getOne.mockRejectedValue(new Error('DomainError: Article not found.'));

      await expect(getArticle.run(1))
      .rejects
      .toThrow('DomainError: Article not found.');
    })

  })

  describe('Get all articles', () => {
    test('Should get all user projects by username', async () => {
      const allArticles = {
        total: 10,
        articles: [
          {
            id: 1,
            title: 'Test title',
            introduction: 'Test introduction',
            content: 'Test content',
            imageUrl: '',
            tagId: 1
          },
          {
            id: 2,
            title: 'Test title 2',
            introduction: 'Test introduction 2',
            content: 'Test content 2',
            imageUrl: '',
            tagId: 1
          }
        ]
      };

      articleRepository.getAll.mockResolvedValue(allArticles);

      const response = await getAllArticles.run('Linux', 10, 6);      
      expect(response).toEqual(allArticles);
    })    

    test('Should throw a DomainError if not found user', async () => {
      articleRepository.getAll.mockRejectedValueOnce(new Error('DomainError: Not have any articles.'));

      await expect(getAllArticles.run('linux', 10 ,6))
      .rejects
      .toThrow('DomainError: Not have any articles.')
    })
  })


  //update article
    //should update article and return message

  describe('Update article', () => {
    const id = 1;
    const userId = 1;
    const input = {
      title: "Test title",
      introduction: "Test introduction",
      content: 'Teste Content',
      tagId: 1
    }

    test('Should update a article', async () => {
      await articleRepository.update.mockResolvedValue(undefined);

      await updateArticle.run(id, userId, input);

      expect(articleRepository.update).toHaveBeenCalledWith(
        id,
        userId,
        expect.objectContaining({
          title: "Test title",
          introduction: "Test introduction",
          content: 'Teste Content',
          tagId: 1
        })
      )
    })
  })

  describe('Delete article', () => {
    const id = 1;

    test('Should delete a project', async () => {
      await articleRepository.delete.mockResolvedValue(undefined);

      await deleteArticle.run(id);

      expect(articleRepository.delete).toHaveBeenCalledWith(1);
    })
  })

})