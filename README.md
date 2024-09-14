# Lembete-se
Repositório privado para o projeto do processo seletivo da Dti Digital.
Consiste em um site simples para organizar lembretes.

#Back-end: 
- Feito em typescript porque é a linguagem que tenho mais familiaridade.
- Utilizei o Sqlite pela facilidade de rodar sem a necessidade de um container Docker.
- Testes unitários com Jest.
  
#Front-end:
- Feito em React (com typescript).
- Fiz direto na App.tsx por ser a única tela do projeto.
- Utilizei o Axios para requisições.
- Não fiz testes unitários, pois nunca havia feito no front e não consegui dentro do prazo pegar para aprender a usar o Testing Library (necessário).

Apesar de o design proposto ser apenas ilustrativo e simples, eu preferi ser relativamente fiel a ele para mostrar que sei seguir as telas ilustradas. Apenas adicionei um modal de exclusão (que não constava), porque já estou acostumado e acho essencial para não excluir por missclick.

#Executando o programa:
- Clonar esse repositório
- Abrir a pasta raiz deste projeto
- Rodar os seguintes comandos para inicializar o back-end:
  - cd api
  - npm i
  - npm start
- Depois abrir um outro terminal na pasta raiz do projeto
- Rodar os seguintes comandos para inicializar o front-end:
  - cd client
  - npm i
  - npm run dev
- Clicar no link que aparecer (localhost porta 5173)
- Assim o programa deve funcionar, qualquer problema só entrar em contato comigo 😃
