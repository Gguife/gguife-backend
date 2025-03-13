# API for Gguife portfolio
This is my backend portfolio, created with clean architecture.

<div style='text-align: center;1'>
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" width="5%" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" width="6%" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" width="4.5%" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" width="6%" />
  <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" width="5%" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" width="3.5%" />
</div>

## Content  
- [Technologies](#technologies)  
- [Requirements](#requirements)  
- [Installation and Configuration](#installation-and-configuration)  
- [Project Structure](#project-structure-clean-code)  
- [Authentication](#authentication)  
- [Endpoints](#endpoints)  
- [Tests](#tests)  

---

### Technologies
The main technologies used in the project are:
- Nodejs with Express
- Typescript
- Prisma(ORM)
- Postgresql(DB) 
- JWT
- Docker-compose
- Jest
- AWS S3
- SMTP

---

### Requirements
Before you start, you need to have installed:
- Nodejs
- Yarn or npm
- Docker(recommended)
- DB PostgreSQL(either using Docker image or Istalled locally)

---

### Installation and Configuration
#### 1. Clone the project:
```bash
git clone http://github.com/
cd <project-folder>
```

#### 2. Install dependencies:
```bash
yarn install # or npm install
```

#### 3. Configure env file:
```bash
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

DATABASE_URL=

PORT=

JWT_SECRET=

#AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME= 

#SMTP
SMTP_HOST=
SMTP_USER=
SMTP_PORT=
SMTP_PASS=
SMTP_FROM=
```

#### 4. Run the Docker container (if using Docker)
```bash
docker-compose up -d
```

#### 5. Run the prisma migrate:
```bash
yarn sequelize db:migrate
```

#### 6. Start server:
```bash
yarn dev # or npm run dev
```

---

### Project Structure (clean architecture)
```
src/
│── @types/          # Type definitions
│── application/     # Application layer containing core logic and configurations
  │── config/        # Global project configuration
  │── error/         # Application error handling and management
  │── services/      # Core application services
│── infra/           # Infrastructure layer
  │── httpServer/    # HTTP Server configuration
  │── clientServer/  # Communication with exerternal services and APIs
│── modules/            # User module following domain-driven design principles
  │── entity/        # User entity definition
  │── usecase/       # User cases (business logic) related to users
  │── controller     # Controller handling user requests
  │── repository     # Repository for managing user persistence
│── index.ts         # Main server entry point

```

---

### Authentication
This project uses Json Web Token(JWT) for authentication. To access protected endpoints, you must send a token in the request header.

---

### Endpoints
API endpoints documentation is abailable in the docs directory.
---

### Tests
For run tests, use:
```bash
yarn test # or npm test
```