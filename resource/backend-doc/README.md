# Project Management API

## Indice
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Using Examples](#using-examples)
- [Explanation](#explanation)

## Introduction
The API was developed to facilitate user access control in the application. This control allows for the effective management of projects and articles created by the users. Users are allowed to register, log in, update their profile (note that the username is unique), reset their password, create and edit their projects and articles, as well as delete them.

## Requirements
- **Nodejs** installed;
- **Database**: PostgreSQL;
- **Test tools**: Postman, curl or any others HTTP client;

## Authentication
By default, all users start deactivated. When a user registers, an email is sent so they can confirm their email address and activate their account. To be verified and activated, a link containing the token retrieved via query string is sent.
  ```
  http://localhost:3000/verify-email?{token}
  ```

To access certain endpoints, you will need an authentication token. This token is obtained during login and must be included in the Authorization header in all subsequent requests.
  ```
    Authorization: Bearer your_jwt_token_here
  ```

---

## Enpoints
### 📌 User

- **POST /user/register**
  - **Description:** Register a new user.
  - **Headers:** `content-type: application/json`
  - **Body:**
    - `username`: string
    - `email`: string
    - `password`: string

- **GET /verify-email**
  - **Description:** Email verification for account activation.

- **POST /login**
  - **Description:** Authenticate user and return a JWT token.
  - **Headers:** `content-type: application/json`
  - **Body:**
    - `username`: string
    - `password`: string

- **PUT /user/update**
  - **Description:** Update user information.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `username?`: string
    - `currentPassword?`: string
    - `password?`: string

- **DELETE /user/delete**
  - **Description:** Delete user account.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`

---

### 📌 Project

- **POST /project/register**
  - **Description:** Register a new project.
  - **Headers:** 
    - `content-type: application/json`
    - `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `title`: string
    - `content`: string
    - `tools`: string
    - `categoryId`: number
    - `linkDeploy`: string
    - `linkRepository`: string
    - `imageUrl`: string (URL gerada pelo S3)

- **GET /project/:id**
  - **Description:** Get one project with params.

- **GET /projects/:username**
  - **Description:** Get all projects of a user.

- **PUT /project/update/:id**
  - **Description:** Update project informations.
  - **Headers:** 
    - `content-type: application/json`
    - `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `title`: string
    - `content`: string
    - `tools`: string
    - `linkDeploy`: string
    - `linkRepository`: string

- **DELETE /project/delete/:id**
  - **Description:** Delete preject.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`

### 📌 Articles

- **POST /article/register**
  - **Description:** Register a new article.
  - **Headers:** 
    - `content-type: application/json`
    - `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `title`: string
    - `introduction`: string
    - `content`: string
    - `tagId`: number
    - `imageUrl`: string (URL gerada pelo S3)

- **GET /article/:id**
  - **Description:** Get one article with params.

- **GET /articles/:username**
  - **Description:** Get all articles of a user.

- **PUT /article/update/:id**
  - **Description:** Update project informations.
  - **Headers:** 
    - `content-type: application/json`
    - `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `title`: string
    - `introduction`: string
    - `content`: string
    - `tagId`: number

- **DELETE /article/:id**
  - **Description:** Delete preject.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`




## Using Examples:
### User register
```
curl -X POST "http://localhost:8080/project/register" \
-H "Content-Type: application/json" \
-d '{
  "username": "yourname",
  "email": "youemail@email.com",
  "password": "Yourpass123."
}'
```

### User login
```
curl -X POST "http://localhost:8080/login" \
-H "Content-Type: application/json" \
-d '{
  "username": "yourname",
  "password": "Yourpass123."
}'
```

### User update username
```
curl -X PUT "http://localhost:8080/user/update" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json" \
-d '{
  "username": "newUsername"
}'
```
### User update password
```
curl -X PUT "http://localhost:8080/user/update" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json" \
-d '{
  "currentPassword": "Yourpass123.",
  "password": "newPass123."
}'
```
### User delete
```
curl -X DELETE "http://localhost:8080/user/delete" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json"

```

---

### Project register
```
curl -X POST "http://localhost:8080/project/register" \
-H "Content-Type: application/json" \
-d '{
  "title": "Teste title project 2",
  "content": "teste content project 2",
  "tools": "nodejs, postegresql",
  "categoryId": 1,
  "linkDeploy": "http://github.com/gguife",
  "linkRepository": "http://github.com/gguife",
  "imageUrl": "url gerada pelo bucket"
}'
```

### Get one Project
```
curl -X POST "http://localhost:8080/project/:id"
```

### Get all Project
```
curl -X POST "http://localhost:8080/projects/:username" 
```

### Project update
```
curl -X PUT "http://localhost:8080/project/update/:id" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json" \
-d '{
  "title": "Teste title project 2",
  "content": "teste content project 2",
  "tools": "nodejs, postegresql",
  "linkDeploy": undenifed,
  "linkRepository": "http://github.com/gguife",
}'
```

### Project delete
```
curl -X DELETE "http://localhost:8080/project/delete/:id" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json"

```

### Article register
```
curl -X POST "http://localhost:8080/article/register" \
-H "Content-Type: application/json" \
-d '{
  "title": "Test title",
  "introduction": "Test introduction",
  "content": "Test content",
  "tagId": 1,
  "imageUrl": "url gerada pelo bucket"
}'
```

### Get one Article
```
curl -X POST "http://localhost:8080/article/:id"
```

### Get all user Articles
```
curl -X POST "http://localhost:8080/articles/:username" 
```

### Article update
```
curl -X PUT "http://localhost:8080/article/update/:id" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json" \
-d '{
  "title": "Test title att",
  "introduction": "Test introduction att",
  "content": "Test content att",
  "tagId": 2,
}'
```

### Article delete
```
curl -X DELETE "http://localhost:8080/article/:id" \
-H "Authorization: Bearer seu_token_jwt_aqui" \
-H "Content-Type: application/json"
```

## Explanation
- **Introduction:** Explains the purpose of the API
- **Requirements:** Provides steps to set up and run the API
- **Authentication:** Guides on how to obtain and use the JWT Token
- **Endpoints:** Documents the main endpoints, describing their function, required parameters, and expected headers.
- **Using examples:** Provides practical examples to help users interact with the API.