import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCategories = await prisma.categories.findMany();
  const existingTags = await prisma.tags.findMany();
  const existingProjects = await prisma.projects.findMany();

  if(existingCategories.length === 0){
    await prisma.categories.createMany({
      data: [
        {name: "Front-end"},
        {name: "Back-end"},
        {name: "Systems"}
      ]
    })
    console.log('Categories created successfully.');
  }

  if(existingTags.length === 0){
    await prisma.tags.createMany({
      data: [
        {tagName: 'Tech'},
        {tagName: 'Culture'},
        {tagName: 'Productivity'},
        {tagName: 'Reflections'},
        {tagName: 'Learning'},
      ]
    })
    console.log("Tags created successfully.");
  }

  if (existingProjects.length === 0) {
    await prisma.projects.createMany({
      data: [
        {
          id: 1,
          title: 'Kenai',
          introduction: 'Serviço de streaming',
          content: 'O desenvolvimento deste site foi criado visando uma plataforma de streaming. Ao consumirmos uma API pública (TMDB) de filmes em cartaz, o site traz a sinopse do filme, sua língua de origem e muitos outros detalhes interessantes. O sistema foi desenvolvido totalmente em React com TypeScript. Tivemos o uso de ferramentas como Axios para fazer as requisições com a API, Styled-components para a estilização do nosso site e React-router-dom para a criação das rotas de login e a rota principal. Um sistema totalmente responsivo e intuitivo para o usuário.',
          tools: 'react, typescript',
          linkDeploy: 'https://kenai-murex.vercel.app',
          linkRepository: '',
          imageUrl: '',
          categoryId: 1,
          userId: 1
        },
        {
          id: 2,
          title: 'CodeNFT',
          introduction: 'Landing Page de NFTs',
          content: 'Sistema criado com o objetivo de oferecer uma experiência maravilhosa ao usuário. Desenvolvi esta Landing Page com uma atenção grande aos detalhes, priorizando a responsividade e beleza estética do site. Utilizando tecnologias como React com Typescript, Framer Motion para animações e Swiper, foi criado um ambiente digital muito atrativo.',
          tools: 'react, typescript, CSS',
          linkDeploy: 'https://codenft-virid.vercel.app/',
          linkRepository: '',
          imageUrl: '',
          categoryId: 1,
          userId: 1
        },
        {
          id: 3,
          title: 'Mecânica Mundial',
          introduction: 'Empresa Mecânica mundial',
          content: 'Um projeto freelancer com o objetivo da captação de novos clientes. O projeto foi desenvolvido para aumentar a exposição da Mecânica Mundial ao público e facilitar o recebimento de currículos, centralizando tudo no site. A Mecânica Mundial é uma empresa familiar que atua no mercado há mais de 30 anos, no ramo de carros leves, nos modelos B2C e B2B. A Landing Page foi o meio proposto para dar maior visibilidade da empresa e de seus serviços e produtos.',
          tools: 'react, typescript',
          linkDeploy: 'https://mecanica-mundial.netlify.app/',
          linkRepository: '',
          imageUrl: '',
          categoryId: 1,
          userId: 1
        },
        {
          id: 5,
          title: 'Shortener link',
          introduction: 'Encurtador de links',
          content: 'Shortener link um sistema de encurtamento de links, que também coleta informações, como IP, navegador e horário da ultima vez que o link foi utlizado. Desenvolvido com Node.js, Sequelize e MySQL, esse projeto simples teve como foco o aprimoramento das minhas habilidades!',
          tools: 'nodejs, MySQL, Sequelize, docker-compose, Jest',
          linkDeploy: '',
          linkRepository: 'https://github.com/Gguife/link-shortener',
          imageUrl: '',
          categoryId: 2,
          userId: 1
        },
        {
          id: 6,
          title: 'RESTful API',
          introduction: 'Java RESTful API Back-end Santander',
          content: 'Em minha trajetória no bootcamp Santander, tive como desafio construir uma aplicação em Java com foco na criação de uma RESTful API. Utilizei o Spring Boot e o Spring Data para simplificar a integração com o banco de dados, com o planejamento desde da modelagem do banco de dados até sua integração usando MySQL. A aplicação simula uma conta bancária, armazenando e gerenciando os dados do usuário de forma eficiente e segura.',
          tools: 'java, spring-boot',
          linkDeploy: '',
          linkRepository: 'https://github.com/Gguife/RESTful-API-Dio',
          imageUrl: '',
          categoryId: 2,
          userId: 1
        },
        {
          id: 7,
          title: 'Naped',
          introduction: 'Sua plataforma de entretenimento',
          content: 'Desenvolvimento de uma Landing Page de entretenimento, visando muito a responsividade e o uso de rotas deixando projeto com uma interatividade maior e uma beleza única. Aprimorada para uma experiência de usuário agradável. Ferramentas usadas para o desenvolvimento foram o React com Typescript e o react-router-dom para as rotas da nossa aplicação. Todo o layout foi estilizado com CSS puro.',
          tools: 'react, typescript, CSS',
          linkDeploy: 'https://naped-nine.vercel.app/',
          linkRepository: '',
          imageUrl: '',
          categoryId: 1,
          userId: 1
        },
        {
          id: 8,
          title: 'Finance API',
          introduction: 'Tudo em um só lugar',
          content: 'Contabilizando seus gastos e ganhos do mês, o Finance foi desenvolvido para um gerenciamento mais eficaz do seu dinheiro. Com ele, você consegue aprimorar seu controle financeiro. Desenvolvido em Node.js com Express, os dados são armazenados no banco de dados relacional MySQL, utilizando Knex para interagir com o banco e realizar a criação de suas migrações. No sistema, conseguimos realizar as operações matemáticas necessárias para, ao final do mês, retornarmos seu saldo exato, contabilizando seu defit ou granhos mensais.',
          tools: 'nodejs, mysql',
          linkDeploy: '',
          linkRepository: 'https://github.com/Gguife/finance-fullstack-api',
          imageUrl: '',
          categoryId: 2,
          userId: 1
        },
        {
          id: 9,
          title: 'Event register System',
          introduction: 'EventiX',
          content: 'O aplicativo gerencia eventos, permitindo cadastro, listagem, filtragem, visualização de detalhes do evento e associação de cupons de desconto.',
          tools: 'Java, Spring Boot, Postgresql, Docker',
          linkRepository: 'https://github.com/Gguife/eventiX',
          linkDeploy: '',
          imageUrl: '',
          categoryId: 2,
          userId: 1
        },
        {
          id: 10,
          title: 'API para Conversão monetária',
          introduction: 'Converta valores entre as principais moedas',
          content: 'O Software de Conversão Monetária é um desafio proposto pela Bravo com o objetivo de proporcionar a conversão das quatro principais moedas: EUR, BRL, BTC e USD. Para isso, o sistema interage com uma API pública que fornece os preços atualizados das moedas, simplificando assim o processo de conversão. Desenvolvida com foco na rapidez e na entrega de dados precisos, a aplicação foi desenvolvida com o intuito de garantir que meu sistema suporte determinadas moedas e que suas operações sejam eficientes.',
          tools: 'nodejs, jest, sequelize, mysql, docker',
          linkRepository: 'https://github.com/Gguife/Challenge-bravo',
          linkDeploy: '',
          imageUrl: '',
          categoryId: 2,
          userId: 1
        },
      ]
    });

    console.log("Projects created successfully.");
  }

  console.log("All datas are created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  })