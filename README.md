# Projeto Labeddit

O Labeddit é uma rede social inspirada no reddit, com o objetivo de promover a conexão e interação entre pessoas através de postagens e comentários. Quem se cadastrar no aplicativo poderá criar, comentar e curtir publicações.<br>

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman


# Banco de dados
![projeto-labeddit (2)](https://)

## URLs de acesso
Documentação da API com as instruções de uso de cada endpoint da aplicação Labeddit.<br>

[Labeddit API](https://) 

Links do deploy e repositório do bando de dados da aplicação Labeddit.<br>

[Labeddit Deploy Backend](https://)<br>
[Labeddit Repo Backend](https://github.com/marinajaudy/labeddit-backend.git)

Links do deploy e repositório do front da aplicação Labeddit.<br>

[Labeddit Deploy Frontend](labeddit-iota.vercel.app)<br>
[Labeddit Repo Frontend](https://github.com/marinajaudy/labeddit-frontend.git)


# Lista de requisitos

- [ ]  Endpoints seguindo as boas práticas HTTP
- [ ]  Uso do ExpressJS, Typescript e SQLite
- [ ]  Cobertura de testes (pelo menos 70%)
- [ ]  API deployada
- [ ]  Documentação README e POSTMAN
 

## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro ou acesso a Login. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |


## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `201` | Dados creado com sucesso(sucess).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `500` | Erro inesperado.|


## Iniciando 

Esse é um exemplo das intruções de como você configura o projeto localmente.
Para ter uma copia local, siga os passos abaixo:

### Instalação

1. Clone do repositório
  ```sh
  git clone https://github.com/marinajaudy/labeddit-backend.git
  ```
   
2. Install -->
 TypeScript packages,
 Express packages,
 Cors packages,
 Node packages,
 Identificador Único Universal (UUID),
 Variáveis de ambiente (ENV), 
 JWT(Token),
 Bcrypt,
 Jest,
 developer tools:

  ```sh
  npm install
   ```

## Uso

Uma API onde as pessoas se conectam e interagem entre si.

Para iniciar o uso da API primeiramente entre no labeddit.sql na pasta database, crie a tabela users e insira o conteúdo, faça o mesmo com a tabela post e comments. A tabela likes_dislikes, tanto do post como o do comments deve ser criada, porém não insira nenhum dado nessas duas tabelas, se popular essas tabelas acarretará em erros no momento de inserir like e dislike no post e comentário.  

# Exemplos de requisição
Não precisa cadastrar o mesmo nome, email e quaisquer outros valores vistos aqui nos exemplos de saída. Porém, lembre-se de respeitar a estrutura pedida no banco de dados (nome das tabelas e colunas) e os nomes das propriedades na resposta da API.

Colunas a mais na tabela não tem problema, por exemplo adicionar uma 'category' dentro da tabela 'products', mas a falta de uma coluna ou propriedade na resposta será considerada falha de implementação!

## Signup
Endpoint público utilizado para cadastro. Devolve um token jwt.
```typescript
// request POST /users/signup
// body JSON
{
   "nickname": "Andrea", 
   "email": "andrea@email.com", 
   "password": "Andre@123"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```

## Login
Endpoint público utilizado para login. Devolve um token jwt.
```typescript
// request POST /users/login
// body JSON
{
  "email": "andrea@email.com",
  "password": "Andre@123"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

## Get posts
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
       id: "db704ae1-18c8-4895-9f54-165af46f66e6",
       content: "To cansada e com o corpo doendo!!",
       likes: 0,
       dislikes: 0,
       comments: 0,
       creator: {
            id: "8bc4ea9c-b511-4c14-bedd-16df2a077485",
            nickname: "Andrea"
        },
        createdAt: "2023-02-20T19:35:38.841Z",
        updatedAt: "2023-02-20T19:37:22.265Z"
    },
    {
        id: "uma uuid v4",
        content: "kkkkkkkkkrying",
        likes: 0,
        dislikes: 0,
        comments: 0,
        creator: {
            id: "uma uuid v4",
            nickname: "Ciclana"
        },
        createdAt: "2023-01-20T15:41:12:000Z"
        updatedAt: "2023-01-20T15:49:55:000Z"
    }
]
```

## Create post
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request POST /posts
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu praia!"
}

// response
// status 201 CREATED
{
    id: "52fbc8b7-bd7e-4ce2-bba7-2e51c7124bdc",
    content: "Partiu praia!",
    likes: 0,
    dislikes: 0,
    creator: {
        id: "u002",
        nickname: "Alex"
    },
    createdAt: "2023-03-12T16:41:17.187Z",
    updatedAt: "2023-03-12T16:41:17.187Z"
}
```

## Edit post
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
```typescript
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu festinha na casa da Mari!"
}

// response
// status 200 OK
{
    message: "Post editado com sucesso"
}
```

## Delete post
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

```typescript
// request DELETE /posts/:id
// params.id = "idToDelete"
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    message: "Post deletado com sucesso"
}
```

## Like or dislike post (mesmo endpoint faz as duas coisas)

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Quem criou o post não pode dar like ou dislike no mesmo.<br><br>
Caso dê um like em um post que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.
### Like or Dislike
```typescript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
{
    message: "Reação realizada com sucesso"
}
```

## Get comments
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /comments
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
       id: "ef894ae1-17f4-8900-9f54-165af46f66e6",
       postId: "db704ae1-18c8-4895-9f54-165af46f66e6"
       content: "Feliz demais!!",
       likes: 0,
       dislikes: 0,
       createdAt: "2023-02-20T19:35:38.841Z",
       updatedAt: "2023-02-20T19:37:22.265Z",
       creator: {
           id: "8bc4ea9c-b511-4c14-bedd-16df2a077485",
           nickname: "Andrea"
        }
    },
    {
        id: "uma uuid v4",
       postId: "uma uuid v4"
       content: "jhdlkjhdkljhdk!!",
       likes: 0,
       dislikes: 0,
       createdAt: "2023-02-20T19:35:38.841Z",
       updatedAt: "2023-02-20T19:37:22.265Z",
       creator: {
           id: "uma uuid v4",
           nickname: "Fulano"
        }
    }
]
```

## Create comment
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request POST /comments
// headers.authorization = "token jwt"
// body JSON
{
    "content": "To saindo pra praia!"
}

// response
// status 201 CREATED
{
    id: "uma uuid v4",
    content: "To saindo pra praia!",
    likes: 0,
    dislikes: 0,
    creator: {
        id: "uma uuid v42",
        nickname: "Alex"
    },
    createdAt: "2023-03-12T16:41:17.187Z",
    updatedAt: "2023-03-12T16:41:17.187Z"
}
```

## Edit comment
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o comentário pode editá-lo e somente o conteúdo pode ser editado.
```typescript
// request PUT /posts/:id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Partiu festinha na casa da Mari!"
}

// response
// status 200 OK
{
    message: "Comentário editado com sucesso"
}
```

## Delete comment
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

```typescript
// request DELETE /posts/:id
// params.id = "idToDelete"
// headers.authorization = "token jwt"

// response
// status 200 OK
{
    message: "Comentário deletado com sucesso"
}
```

## Like or dislike post (mesmo endpoint faz as duas coisas)

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Quem criou o post não pode dar like ou dislike no mesmo.<br><br>
Caso dê um like em um post que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike em um post que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like em um post que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike em um post que tenha dado like, o dislike sobrescreve o like.
### Like or Dislike
```typescript
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
{
    message: "Reação realizada com sucesso"
}
```

### Para entender a tabela likes_dislikes
- no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER)
- quando like valer 1 na tabela é porque a pessoa deu like no post
    - na requisição like é true
    
- quando like valor 0 na tabela é porque a pessoa deu dislike no post
    - na requisição like é false
    
- caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike
- caso dê like em um post que já tenha dado like, o like é removido (deleta o item da tabela)
- caso dê dislike em um post que já tenha dado dislike, o dislike é removido (deleta o item da tabela)

## Contato

Marina Jaudy  - marinarrjaudy@hotmail.com

Project Backend Link: [https://github.com/marinajaudy/labeddit-backend.git](https://github.com/marinajaudy/labeddit-backend.git)
<br/>

Project Frontend Link: [https://github.com/marinajaudy/labeddit-frontend.git](https://github.com/marinajaudy/labeddit-frontend.git)
<br/>

[![Linkedin](https://img.shields.io/badge/linkedin-%230A66C2.svg?&style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/andrejaques/)](https://www.linkedin.com/in/marina-jaudy)

## Agradecimentos

* Aos professores da Labenu
* Meus colegas de sala que me ajudaram no processo do projeto
* Meus familiares pelo apoio ao longo da construção do projeto

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[contributors-url]: https://github.com/marinajaudy/projeto-react-apis/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[forks-url]: https://github.com/marinajaudy/projeto-react-apis/network/members
[stars-shield]: https://img.shields.io/github/stars/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[stars-url]: https://github.com/marinajaudy/projeto-react-apis/stargazers
[issues-shield]: https://img.shields.io/github/issues/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[issues-url]: https://github.com/marinajaudy/projeto-react-apis/issues
[license-shield]: https://img.shields.io/github/license/marinajaudy/projeto-react-apis.svg?style=for-the-badge
[license-url]: https://github.com/marinajaudy/projeto-react-apis/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marinajaudy
[product-screenshot]: readme-image/projeto-react-apis.gif
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Styled-components]:https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
[Styled-url]: https://www.styled-components.com/
[Chakra-UI]: https://img.shields.io/static/v1?style=for-the-badge&message=Chakra+UI&color=319795&logo=Chakra+UI&logoColor=FFFFFF&label=
[Chakra-url]: https://chakra-ui.com/getting-started
