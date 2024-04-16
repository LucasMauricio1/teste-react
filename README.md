<h1 align="center">Teste feito em NextJS🚀</h1>

> O projeto é o front-end de um CRUD de usuários contendo 4 telas diferentes. Além de autenticação via Bearer Token.

## :page_facing_up: Explicação

O projeto da de cara na tela de login onde o usuário é obrigado a colocar o e-mail e a senha, se não, não podera acessar as outras telas e somente usuários admin podem cadastrar outros usuários.

Após isso irá para o dashboard onde vai estar a tabela com todos os usuários e suas informações, inicialmente só terá um usuário mas podera ser cadastrado outros.
No dashboard você também pode clicar em cima do usuário para ser redirecionado para a tela do usuário escolhido.

Na tela do usuário específico você poderá tanto editar quanto deletar um usuário.
O único usuário que não poderá ser excluido é o admin.

Na tela de cadastro de usuários você criara quantos usuários quiser desde que o e-mail não sejá repetido, também poderá conceder permissões de admin ao usuário que quiser criar.

## 📁 Paginas

O site é composto por 4 telas diferentes:

- **Login:** Nesta tela, os usuários podem inserir seus dados cadastrados (email e senha) e fazer login.
- **Listar todos os usuários:** Aqui você tem acesso a tabela onde todos os usuários estão cadastrado, e você pode clica em cima de um para ver um usuário específico.
- **Listar um usuário:** Nesta tela você vai obter os dados mais detalhados um usuário específico como a sua senha, que não está presente em mais nenhum lugar do site. Você também poderá editar ou deletar esse usuário caso queira.
- **Cadastro:** Nesta página, se você tiver na conta de um usuário admin, você poderá criar novos usuários.

Email para login: "admin@spsgroup.com.br"
Senha para login: 1234

## :dart: Passos

:heavy_check_mark: Componente Header;\
:heavy_check_mark: Componente Icone;\
:heavy_check_mark: Componente Input;\
:heavy_check_mark: Criação do formulário de login;\
:heavy_check_mark: Conexão com a API;\
:heavy_check_mark: Salvamento do token;\
:heavy_check_mark: Bloquear as telas sem o token;\
:heavy_check_mark: Listar todos os usuários;\
:heavy_check_mark: Listar um usuário específico;\
:heavy_check_mark: Editar um usuário;\
:heavy_check_mark: Deletar um usuário;\
:heavy_check_mark: Criar um usuário;\
:heavy_check_mark: Validação dos formulários;\
:heavy_check_mark: Componentes de formulários;\
:heavy_check_mark: Criação do hook useCookies;\
:heavy_check_mark: Remoção de erros do next;\
:heavy_check_mark: Tratamento de erros e toast;

## :rocket: Tecnologias

As seguintes ferramentas foram utilizadas neste projeto:

- [NextJs](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/docs/intro)
- [Nookies](https://github.com/maticzav/nookies)
- [React-Hook-Form](https://react-hook-form.com/)
- [Heroicons](https://heroicons.com/)

## :closed_book: Requisitos ##

Antes de começar, você precisa ter a [API] rodando na sua maquina,
instruções em: https://github.com/LucasMauricio1/teste-node [Git](https://git-scm.com) e [Node](https://nodejs.org/en/) instalados em seu computador.

## :checkered_flag: Getting Started ##

```bash
# Clone o projeto
$ git clone https://github.com/LucasMauricio1/teste-react
# Accesso
$ cd teste-react
# Instalando dependencias
$ yarn ou npm i
# Rodando o comando
$ yarn dev ou npm run dev
# O servidor iniciará na porta: <http://localhost:3000>
```
## 🤝 Contribuidores

Queremos agradecer às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/122059282?s=400&u=96bc9300d660f1b489efcfb0a557ab08a6298c99&v=4" width="100px;" alt="Lucas Mauricio"/><br>
        <sub>
          <b>Lucas Maurício</b>
        </sub>
      </a>
    </td>
  </tr>
</table>