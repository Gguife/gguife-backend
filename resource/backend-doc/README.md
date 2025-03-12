# Project Management API

## Indice
- Introdcution
- Requirements
- Authentication
- Endpoints
  - User register
  - User update
  - User login
  - User delete
- Using Examples
- Explanation

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


## Enpoints
### User

- **POST /register**
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

- **PUT /update**
  - **Description:** Update user information.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`
  - **Body:**
    - `username?`: string
    - `currentPassword?`: string
    - `password?`: string

- **DELETE /delete**
  - **Description:** Delete user account.
  - **Headers:** `Authorization: Bearer your_token_jwt_here`



## Using Examples:
### User register
```
curl -X POST "http://localhost:8080/user/register" \
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

## Explanation
- **Introduction:** Explains the purpose of the API
- **Requirements:** Provides steps to set up and run the API
- **Authentication:** Guides on how to obtain and use the JWT Token
- **Endpoints:** Documents the main endpoints, describing their function, required parameters, and expected headers.
- **Using examples:** Provides practical examples to help users interact with the API.