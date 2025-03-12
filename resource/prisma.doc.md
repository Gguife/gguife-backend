# Comandos essenciais para uso do Prisma no projeto

## 1. Inicialização do Prisma no projeto
Se for a primeira vez utilizando o Prisma no projeto, inicialize com:
```sh
npx prisma init
```
Isso criará a pasta `prisma/` com o arquivo `schema.prisma` e adicionará a configuração no `.env`.

## 2. Subindo o banco de dados (uso local com Docker Compose)
Antes de rodar as migrations ou conectar ao banco, suba o container do PostgreSQL:
```sh
docker-compose up -d
```

## 3. Criando uma migration
Sempre que modificar o schema do Prisma, crie uma migration para refletir as mudanças no banco:
```sh
npx prisma migrate dev --name nome_da_migracao
```
Isso aplica as alterações no banco e gera um histórico das mudanças.

## 4. Aplicando migrations em um ambiente de produção
Para rodar as migrations no banco sem o modo de desenvolvimento:
```sh
npx prisma migrate deploy
```

## 5. Gerando o Client do Prisma
Sempre que modificar o schema, gere o client atualizado para que o código reconheça as mudanças:
```sh
npx prisma generate
```

## 6. Resetando o banco de dados (cuidado: deleta os dados!)
Caso precise apagar tudo e recriar o banco, use:
```sh
npx prisma migrate reset
```
Isso removerá todas as tabelas e rodará as migrations do zero.


Esses comandos cobrem o ciclo básico do uso do Prisma no projeto com PostgreSQL rodando em um container Docker.