import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCategories = await prisma.categories.findMany();
  const existingTags = await prisma.tags.findMany();
  const existingProjects = await prisma.projects.findMany();
  const existingArticles = await prisma.articles.findMany();

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
        {tagName: 'Lifestyle'},
        {tagName: 'Carrer'}
      ]
    })
    console.log("Tags created successfully.");
  }

  if(existingProjects.length === 0) {
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

  if(existingArticles.length === 0) {
      await prisma.articles.createMany({
        data: [
          {
            id: 1,
            title: "Primeiro mês usando Linux",
            introduction: "Compartilhando minha experiência, distro escolhida e o que mais me agradou.",
            content: `Já se passou um mês desde que migrei para o Linux como meu sistema operacional. Então, decidi trazer alguns relatos sobre o porquê estou usando o Linux, qual distro utilizo neste meu início e o que mais estou gostando até agora.

              ❓ Por que escolhi o Linux?
              Primeiramente, por curiosidade. Nós, que damos nossos primeiros passos na área de desenvolvimento, sempre ouvimos o quão vantajoso é usar o Linux.
              Mas, particularmente, sempre tive vontade de aprender Linux, até pelos meus interesses em cybersecurity, usando o próprio Kali Linux na minha VM.
              A minha vontade de migrar para o Linux sempre existiu; era só uma questão de tempo para isso acontecer.

              ❓ Qual distro utilizo atualmente?
              Atualmente, estou usando o Ubuntu como minha distro principal. Tenho vontade de migrar para outra distribuição futuramente (estou pensando no Arch), mas confesso que estou bem satisfeito e feliz com o Ubuntu, especialmente por ser meus primeiros dias com o Linux. Ele é bem simples e tem me ajudado muito neste começo.

              ❤️ O que mais gostei no Linux?
              Minha jornada como desenvolvedor tem evoluído muito com o Linux, especialmente por estar 100% no terminal, o que torna tudo mais interessante e produtivo. Estou aprendendo a usar o Vim para aumentar minha produtividade (ainda apanhando bastante, kkkk) e aproveitando ao máximo o Docker e outras ferramentas.
              No meu lado de cybersecurity, o Linux oferece mais segurança e uma integração mais natural com os comandos do Kali Linux, além de facilitar o uso de VMs e containers para meus testes e simulações.`,
            imageUrl: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mgpsit7137z49tmosbb3.jpg",
            tagId: 1,
            userId: 1,
          },
          {
            id: 2,
            title: "Guia de Códigos de Status HTTP",
            introduction: "Principais códigos de status HTTP",
            content:`Quando um navegador faz uma solicitação a um serviço web, o servidor responde com um código de status HTTP, indicando o resultado da requisição. Para simplificar e automatizar o desenvolvimento da sua aplicação web, aqui está uma lista dos principais códigos de status HTTP que podem ser retornados.

              ### 1XX Information
              | **Código** | **Descrição**                                                                 |
              |------------|-------------------------------------------------------------------------------|
              | **100**    | **Continue**: O servidor recebeu parte da requisição e o cliente pode continuar enviando o restante. |
              | **101**    | **Switching Protocols**: O servidor está mudando o protocolo conforme solicitado pelo cliente. |
              | **102**    | **Processing**: O servidor recebeu a requisição e está processando, mas ainda sem resposta final. |
              | **103**    | **Early Hints**: O servidor sugere pré-carregamento de recursos enquanto a resposta final ainda está sendo processada. |

              ---

              ### 2XX Success
              | **Código** | **Descrição**                                                                 |
              |------------|-------------------------------------------------------------------------------|
              | **200**    | **OK**: A requisição foi bem-sucedida e o servidor retornou o conteúdo esperado. |
              | **201**    | **Created**: A requisição foi bem-sucedida e resultou na criação de um novo recurso. |
              | **202**    | **Accepted**: A requisição foi aceita para processamento, mas não concluída. |
              | **203**    | **Non-Authoritative Information**: O conteúdo devolvido é modificado de uma fonte original. |
              | **204**    | **No Content**: A requisição foi bem-sucedida, mas não há conteúdo para enviar na resposta. |
              | **205**    | **Reset Content**: O servidor solicita que o cliente reinicie a exibição do documento sem conteúdo adicional. |
              | **206**    | **Partial Content**: O servidor está enviando parte do conteúdo, conforme a solicitação do cliente (usado para downloads). |
              | **207**    | **Multi-Status**: O corpo da mensagem contém informações sobre múltiplos recursos. |
              | **208**    | **Already Reported**: O recurso foi previamente mencionado em uma resposta anterior (usado em respostas WebDAV). |
              | **226**    | **IM Used**: O servidor completou a requisição usando uma instância do recurso com transformações. |

              ---

              ### 3XX Redirection
              | **Código** | **Descrição**                                                                 |
              |------------|-------------------------------------------------------------------------------|
              | **300**    | **Multiple Choices**: Há várias opções para o recurso solicitado, e o cliente deve escolher uma. |
              | **301**    | **Moved Permanently**: O recurso foi movido permanentemente para uma nova URL. |
              | **302**    | **Found**: O recurso foi temporariamente movido para outra URL, mas no futuro pode voltar para a original. |
              | **303**    | **See Other**: O cliente deve usar uma URL diferente para obter o recurso, geralmente após uma requisição POST. |
              | **304**    | **Not Modified**: O recurso não foi modificado desde a última solicitação, então o cliente pode usar sua cópia em cache. |
              | **305**    | **Use Proxy**: O recurso solicitado deve ser acessado por meio de um proxy (não recomendado para uso atual). |
              | **306**    | **Switch Proxy**: Código não utilizado; reservado para uso futuro. |
              | **307**    | **Temporary Redirect**: A solicitação deve ser repetida com uma URL diferente, mas o método HTTP não deve ser alterado. |
              | **308**    | **Permanent Redirect**: Similar ao 301, mas garante que o método HTTP não seja alterado durante o redirecionamento. |

              ---

              ### 4XX Client Error

              | **Código** | **Descrição**                                                                 |
              |------------|-------------------------------------------------------------------------------|
              | **400**    | **Bad Request**: A requisição foi malformada ou inválida, e o servidor não pôde processá-la. |
              | **401**    | **Unauthorized**: A requisição requer autenticação, e o cliente não a forneceu ou falhou ao se autenticar. |
              | **403**    | **Forbidden**: O servidor entendeu a requisição, mas está recusando permissão para atendê-la. |
              | **404**    | **Not Found**: O recurso solicitado não foi encontrado no servidor. |
              | **405**    | **Method Not Allowed**: O método HTTP usado não é permitido para o recurso solicitado. |
              | **408**    | **Request Timeout**: O servidor demorou muito para receber a requisição e a encerrou. |
              | **409**    | **Conflict**: A requisição não pode ser concluída devido a um conflito com o estado atual do recurso. |
              | **410**    | **Gone**: O recurso solicitado não está mais disponível e não será fornecido novamente. |
              | **429**    | **Too Many Requests**: O cliente enviou muitas requisições em um curto período de tempo, resultando em rate limiting. |

              ---

              ### 5XX Server Error 

              | **Código** | **Descrição**                                                                 |
              |------------|-------------------------------------------------------------------------------|
              | **500**    | **Internal Server Error**: O servidor encontrou uma condição inesperada que o impediu de atender a requisição. |
              | **501**    | **Not Implemented**: O servidor não suporta a funcionalidade necessária para atender a requisição. |
              | **502**    | **Bad Gateway**: O servidor recebeu uma resposta inválida ao tentar atuar como gateway ou proxy. |
              | **503**    | **Service Unavailable**: O servidor está temporariamente indisponível, geralmente devido a manutenção ou sobrecarga. |
              | **504**    | **Gateway Timeout**: O servidor, atuando como gateway ou proxy, não recebeu uma resposta a tempo. |
              | **505**    | **HTTP Version Not Supported**: O servidor não suporta a versão do protocolo HTTP usada na requisição. |`,
            imageUrl: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0qil3okxlbi4xzhzvt6l.png", 
            tagId: 1,
            userId: 1,
          },
          {
            id: 3,
            title: "Nomeclaturas Git",
            introduction: "Quais são os principais padrões e nomeclaturas Git e quando usar ?",
            content: `Quando falamos sobre padrões e nomenclaturas no Git, é um ponto importante, embora não seja essencial. No entanto, seguir boas práticas, como manter um padrão consistente e utilizar nomes claros e descritivos nas branches, pode facilitar bastante o desenvolvimento em equipe e a manutenção do projeto. 

              Neste artigo, quero compartilhar um guia prático de versionamento e nomenclaturas que adotei e que tem sido útil no meu dia-a-dia!

              ---

              ### Nomenclaturas para Commits

              O commit semântico possui os seguintes elementos estruturais, que informam a intenção do seu commit:

              \`\`\`
              feat:
              \`\`\`
              Indica que seu código está incluindo um novo recurso.
              \`\`\`
              feat: adicionar funcionalidade de login com Google
              \`\`\`

              \`\`\`
              fix:
              \`\`\`
              Indica que seu commit está solucionando um problema.
              \`\`\`
              fix: corrigir erro 500 na página de perfil
              \`\`\`

              \`\`\`
              docs:
              \`\`\`
              Indica mudanças na documentação, como no README do seu repositório.
              \`\`\`
              docs: atualizar instruções de instalação
              \`\`\`

              \`\`\`
              test:
              \`\`\`
              Utilizado quando realizamos alterações em testes, seja criando, alterando ou excluindo testes unitários.
              \`\`\`
              test: adicionar testes para a função de autenticação
              \`\`\`

              \`\`\`
              build:
              \`\`\`
              Usado para modificações em arquivos de build e dependências.
              \`\`\`
              build: atualizar dependências no package.json
              \`\`\`

              \`\`\`
              perf:
              \`\`\`
              Identifica alterações de código relacionadas à performance.
              \`\`\`
              perf: otimizar consulta ao banco de dados
              \`\`\`

              \`\`\`
              style:
              \`\`\`
              Para alterações relacionadas a aspectos visuais ou de formatação do código.
              \`\`\`
              style: corrigir formatação do código
              \`\`\`

              \`\`\`
              refactor:
              \`\`\`
              Para melhorias na qualidade interna do código, sem alterar sua funcionalidade.
              \`\`\`
              refactor: simplificar a lógica de validação
              \`\`\`

              \`\`\`
              chore:
              \`\`\`
              Indica atualizações de tarefas de build, configurações de administrador, pacotes, etc.
              \`\`\`
              chore: adicionar arquivo .gitignore
              \`\`\`

              \`\`\`
              remove:
              \`\`\`
              Indica a exclusão de arquivos, diretórios ou funcionalidades obsoletas ou não utilizadas.
              \`\`\`
              remove: remover código não utilizado da API
              \`\`\`

              ---

              ### Nomenclaturas de Branch

              #### Branch main
              Esta branch contém a versão atual do software em produção. Ela está vinculada a uma pipeline que, a cada push, implementa automaticamente uma nova versão em produção.

              #### Branch dev
              Aqui se concentra o maior fluxo de trabalho e colaboração da equipe. As alterações feitas aqui provavelmente farão parte da próxima versão de lançamento.

              #### Branch release
              Esta branch é usada para preparar o lançamento de uma nova versão, contendo as funcionalidades desenvolvidas que serão implementadas em produção. O nome da branch geralmente segue o formato: \`release/v2.0.0\`.

              #### Branch feature
              Uma feature branch identifica o desenvolvimento de uma funcionalidade específica, como por exemplo: \`feature/nova-funcionalidade\`. Ela é uma cópia da branch dev, e várias feature branches podem existir simultaneamente, cada uma dedicada a uma funcionalidade diferente. Após a conclusão do desenvolvimento, a branch é finalizada e o merge é feito com a branch dev.

              #### Branch hotfix
              A hotfix branch é usada para corrigir bugs urgentes que não podem esperar pela próxima versão. Ela é uma cópia da branch main e segue o formato \`hotfix/v2.0.0-corrigir-falha-login\`. Após a correção, o merge é feito tanto na branch main quanto na dev para manter os repositórios atualizados.

              #### Branch bugfix
              A bugfix é usada para corrigir bugs de baixa urgência. Ela é uma cópia da branch dev e segue o formato \`bugfix/ajustar-estilo-pagina-inicial\`. Após a correção, o merge é feito na branch dev, e a correção será incluída na próxima release.

              ---

              Seguir essas nomenclaturas e padrões não apenas melhora a organização do seu repositório, mas também facilita a colaboração e o entendimento das mudanças feitas ao longo do tempo. Espero que este guia prático ajude você!`,
            imageUrl: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/50nhj5x5dgkpvx9w7mdl.png",
            tagId: 1,
            userId: 1,
          },
          {
            id: 4,
            title: "Reinicio automático de uma aplicação Nodejs com Docker",
            introduction: "Aprenda a utilizar o Nodemon dentro de containers Docker para agilizar o desenvolvimento da sua aplicação Node.js",
            content: `Este Artigo tem objetivo agilizar o desenvolvimento de uma aplicação Nodejs sem ter a necessidade de subir o container a cada alteração feita no código.

              ## Nodemon
              Nodemon é uma ferramenta para Node.js que reinicia automaticamente a aplicação sempre que detecta alterações nos arquivos do projeto, facilitando o desenvolvimento. Para usá-lo, podemos instalar o nodemon como uma dependência global ou localmente no projeto. Depois, basta ajustar o script no \`package.json\`, trocando o comando \`node \` por \`nodemon \` para que ele gerencie a execução da aplicação automaticamente. 

              ### Instalação Global
              \`\`\`
              npm install -g nodemon
              \`\`\`

              ### Instalação Local
              \`\`\`
              npm install --save-dev nodemon
              \`\`\`

              ### package.json
              \`\`\`
              {
                "scripts": {
                  "start": "nodemon index.js"
                }
              }
              \`\`\`

              ## DockerFile
              O Dockerfile é um arquivo de configuração onde definimos todas as intruções para criar uma imagem Docker. Essa imagem servirá como modelo para criação de containers.
              Vamos realizar a criação de uma imagem do Docker onde será executado na aplicação, que irá seguir as definições do nosso Dockerfile. 

              \`\`\`
              # Usar a imagem base node:16-alpine
              FROM node:16-alpine

              # Definir o diretório de trabalho dentro do container
              WORKDIR /app

              # Copiar o arquivo package.json para o diretório de trabalho
              COPY package*.json ./

              # Instalar as dependências da aplicação
              RUN npm install

              # Copiar o restante dos arquivos da aplicação para o diretório de trabalho
              COPY . .

              # Expor a porta que a aplicação irá rodar (ex: 3000)
              EXPOSE 3000

              # Comando para iniciar a aplicação
              CMD ["npm", "start"]
              \`\`\`

              ## Docker-compose
              Docker-compose é uma ferramenta que ajuda a definir e compartilhar aplicativos entre vários containers. Com o docker-compose, você pode definir todos os serviços que compõem a sua aplicação como (Servidores web, banco de dados, cache) em um único arquivo \`docker-compose.yml\`.

              Vamos criar um arquivo \`docker-compose.yml\` para definir esses serviços e gerenciar eles com mais facilidade.

              \`\`\`
              version: '3.8'  

              services:
                app:
                  image: node:16-alpine  
                  working_dir: /app  
                  volumes:
                    - .:/app  
                  ports:
                    - "3000:3000"  
                  environment:
                    - NODE_ENV=development  
                  depends_on:
                    - db  
                  command: npm start 

                db:
                  image: mysql:8.0  
                  environment:
                    MYSQL_ROOT_PASSWORD: example  
                    MYSQL_DATABASE: my_database  
                  volumes:
                    - db_data:/var/lib/mysql  

              volumes:
                db_data:
              \`\`\`

              - **\`version: '3.8'\`**: Especifica a versão do Docker Compose.
              - **\`services:\`**: Define os serviços da aplicação.

                - **\`app:\`**: Serviço Node.js.
                  - **\`image:\`**: Usa a imagem \`node:16-alpine\`.
                  - **\`working_dir:\`**: Define o diretório de trabalho no container.
                  - **\`volumes:\`**: Sincroniza o diretório atual com o container.
                  - **\`ports:\`**: Mapeia a porta \`3000\` do host para o container.
                  - **\`environment:\`**: Define variáveis de ambiente, como \`NODE_ENV\`.
                  - **\`depends_on:\`**: Estabelece dependência do serviço \`db\`.
                  - **\`command:\`**: Executa o comando \`npm start\`.

                - **\`db:\`**: Serviço MySQL.
                  - **\`image:\`**: Usa a imagem \`mysql:8.0\`.
                  - **\`environment:\`**: Configura a senha do MySQL e o banco de dados.
                  - **\`volumes:\`**: Monta um volume para persistência dos dados.

              - **\`volumes:\`**: Define o volume para armazenar dados do banco de dados.

              Por fim, executamos o comando:
              \`\`\`
              docker-compose up -d --build
              \`\`\`

              ## Conclusão
              Rodamos uma aplicação em Nodejs em um container Docker e, com a ajuda do nodemon, somos capazes de desenvolver nossa aplicação executada dentro do container sem a necessidade de subir o container toda vez que é feita alguma alteração.`,
            imageUrl: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pcsswvjr2vpbqsiyv7d3.jpg",
            tagId: 1,
            userId: 1,
          },
        ]
      })


      console.log("Articles created successfully.");
  }


  console.log("All datas are created.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
})