# Múltiplos DBs SQL com Node.js + Sequelize

Este projeto é uma REST API feita em Express.js. O principal intuito é demonstrar como o ORM Sequelize pode ser utilizado para conectar diferentes DBs SQL. O banco de dados MongoDB também foi utilizado em conjunto com o ODM Mongoose para a implementação do sistema de login.

## Tecnologias utilizadas

As seguintes tecnologias foram utilizadas na construção do projeto:

* [Node.js] - ambiente de execução Javascript p/ o server-side
* [yarn] - gerenciador de pacotes javascript/nodejs
* [Docker] - Docker é uma plataforma de código aberto para criação de ambientes isolados via container
* [Express.js] - framework node.js para construcçaão de aplicações 
* [MongoDB] - um banco de dados NoSQL baseado em documentos
* [Mongoose] - ODM projetado para o [MongoDB]
* [MySQL] - um dos sistemas de gerenciamento de bancos de dados mais populares da Oracle Corporation
* [PostgreSQL] - sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto
* [Sequelize] - ORM projetado para funcionar com múltiplos banco de dados relacionais

## Problema alvo

O problema consiste em receber 1 ou mais contatos de celulares através de uma API Rest e adicioná-los ao banco de dados do cliente Macapá ou do cliente Varejão.

### Fluxo de Ações
- A API receberá um JSON via POST contendo o nome e celular;
- O cliente deverá estar autenticado para inserir o contato na base
- O contato deverá ser inserido no banco de dados do cliente seguindo as regras de cada cliente

### Especificações da API:
- A autenticação será através de um token JWT no Authorization Header
- A lista de contatos que deve ser inserido em cada cliente está no formato JSON e pode ser encontrado no diretório `data`
- O schema para cada banco de dados (mínimo) requerido pode ser encontrado no diretório `table-schemas`

### Especificações do Cliente Macapá:
- Banco de dados Mysql
- Formato do Nome é somente maiúsculas
- O formato de telefone segue o padrão +55 (41) 93030-6905

### Especificações do Cliente Varejão:
- Banco de dados Postgresql
- Formato do Nome é livre
- O formato de telefone segue o padrão 554130306905

##  Como executar

### Bancos de dados

Todos os dados de configuração devem ser disponibilizados em um arquivo `.env`. Os campos estão descritos no arquivo `.env.fields`. No arquivo `.env.example` é possível ver um exemplo de configuração. 

É possível instanciar os bancos de dados via Docker, basta executar o arquivo `docker-compose.yml`:

    docker-compose  up -d --build

Os dados de configuração para se conectar com esses banco de dados estão no arquivo `.env.example`.

### Migrations

Os comandos para execução das migrations podem estão definidos como script no arquivo `package.json`. 

Para executar a migration do banco de dados do cliente Varejão:

    yarn sequelize:varejao:migrate

Para executar a migration do banco de dados do cliente Macapá:

    yarn sequelize:macapa:migrate

**OBS.: É NECESSÁRIO EXECUTAR AS MIGRATIONS ANTES DE INICIAR A APLICAÇÃO.**

### REST API

Basta executar:

    yarn start


## Rotas da API

### Postman

Todas as rotas foram documentadas via Postman. O arquivo para importar essa documentação pode ser encontrado neste repositório no arquivo `Node+Sequelize para múltiplos DBs.postman_collection.json`.
 
### Instruções

Apenas admins podem criar novos usuários. Ao iniciar a aplicação um usuário admin será automaticamente criado com as seguintes credenciais:

    {
        "email": "admin@admin.com",
        "password": "admin"
    }


### **IMPORTANTE**

Nas rotas da API em que o nome do DB é solicitado, digite `varejao` para o banco de dados do cliente Varejão e `macapa` para o banco de dados do cliente Macapá.



[NodeJS]: <https://nodejs.org>
[Docker]: <https://www.docker.com>
[MongoDB]: <https://www.mongodb.com>
[yarn]: <https://yarnpkg.com/>
[Node.js]: <https://nodejs.org>
[Express.js]: <https://expressjs.com>
[Mongoose]: <https://mongoosejs.com>
[MySQL]: <https://www.mysql.com/>
[PostgreSQL]: <https://www.postgresql.org/>
[Sequelize]: <https://sequelize.org>