# Portfólio de Vitor Martins

Site pessoal de apresentação profissional, projetos, currículo e contato. A interface é responsiva, abre em tema escuro por padrão e permite alternar entre tema escuro e claro.

## Projetos

- **Renato Silva — Portfólio comercial:** capturas do site e link para a versão publicada.
- **Smart Citys:** resumo sobre cidades inteligentes e o potencial do Nordeste como futuro polo de inovação, com carrosséis separados para fotos e vídeos. A foto da palestra e o vídeo correspondente estão identificados.
- **Afinp Finance:** imagens das versões desktop e mobile.
- **Estacionamento automatizado:** projeto com Arduino Uno, sensores ultrassônicos, LCD I2C e cancela servo; inclui vídeo da apresentação Smart Citys e demonstração do sistema.
- **Verifica+:** capturas da interface e link para a aplicação publicada.
- **Jogo de xadrez em Java:** capturas da interface e do desenvolvimento.

As galerias de mídia usam carrosséis com botões anterior/próximo, contador e navegação pelas setas do teclado. As fotos podem ser ampliadas. Os arquivos de mídia ficam na pasta `imagem/`.

## Recursos do site

- Layout responsivo para celular e computador.
- Tema escuro padrão; a escolha de tema é salva no navegador.
- Galerias com controles acessíveis e suporte a movimento reduzido.
- Janela para ampliar imagens dos projetos.
- Links para currículo, GitHub, redes sociais, WhatsApp e e-mail.
- Formulário de feedback conectado ao Supabase.
- Painel administrativo de feedbacks em `admin.html`.

## Arquivos principais

- `index.html`: conteúdo e estrutura do portfólio.
- `style.css` e `feedback.css`: estilos do site e do formulário de feedback.
- `src/script.ts`: código-fonte TypeScript da interface.
- `script.js`: JavaScript compilado, carregado pelo site.
- `feedback.js`: envio de feedback ao Supabase.
- `curriculo-vitor-martins.html`: currículo responsivo, com opção de impressão ou salvamento em PDF pelo navegador.
- `admin.html`: painel de administração dos feedbacks.
- `liberar-feedback.sql`: política de Row Level Security para permitir o envio público de feedback.
- `imagem/`: imagens e vídeos usados nos projetos.

## Desenvolvimento

Requer Node.js e npm. Na pasta do projeto, instale as dependências e valide ou compile o TypeScript:

```sh
npm ci
npm run check
npm run build
```

Edite `src/script.ts` e execute `npm run build` para atualizar `script.js`. O navegador carrega o JavaScript compilado, não o TypeScript diretamente. Não é necessário instalar dependências para abrir o site estático; basta abrir `index.html` ou servir a pasta com um servidor local.

## Feedback e Supabase

O formulário envia nome e comentário para a tabela `public.feedbacks` no Supabase. A chave usada no navegador é uma chave publicável; a proteção dos dados depende das políticas RLS, nunca de esconder essa chave. O arquivo `liberar-feedback.sql` habilita a política de inserção pública com validação de tamanho dos campos. Execute-o no projeto Supabase correspondente.

O painel `admin.html` requer autenticação no Supabase e restringe o acesso ao usuário administrador configurado no próprio arquivo. Não publique credenciais privadas ou chaves `service_role` no código do navegador.

## Publicação

O portfólio pode ser publicado em GitHub Pages ou outro host estático. Envie os arquivos HTML, CSS e JavaScript, o currículo, os arquivos SQL necessários e a pasta `imagem/`, preservando a estrutura de diretórios. Se alterar `src/script.ts`, gere e publique também o `script.js` atualizado. Configure o Supabase separadamente para que envio e administração de feedbacks funcionem.