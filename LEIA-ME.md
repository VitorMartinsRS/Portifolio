# Portfólio — melhorias

Mantidos o conteúdo principal, as imagens, a paleta e os temas claro/escuro.

## Alterações
- Navegação no celular e botões maiores.
- Apresentação padronizada como desenvolvedor e estudante.
- Projetos abrem imagens e descrições em uma janela com fechamento por Escape.
- Carrossel manual, com posição corrigida e controles acessíveis.
- Currículo abre uma página com opção de imprimir ou salvar em PDF pelo navegador.
- Contato por WhatsApp e e-mail em destaque.
- Suporte a movimento reduzido e navegação por teclado.

## Atualizar o GitHub Pages
1. Faça uma cópia dos arquivos atuais ou crie uma branch no repositório.
2. Substitua index.html, style.css e curriculo-vitor-martins.html pelos arquivos desta pasta.
3. Adicione script.js na mesma pasta. Mantenha a pasta imagem.
4. Faça commit na branch usada pelo GitHub Pages e aguarde a publicação.

Não é necessário instalar dependências ou configurar um banco de dados.

## Verificação
A sintaxe de script.js e os caminhos locais de imagens, páginas e âncoras foram conferidos. Não foi feita validação visual em navegador nesta entrega. Antes de publicar, confira a página em celular e computador, alterne o tema, percorra os projetos e abra o currículo.

## Pendências de conteúdo
- Associar os links específicos de código/demonstração a cada projeto quando forem informados. O botão geral abre seus repositórios.
- O site e o currículo têm e-mails diferentes; ambos foram preservados. Confirme qual deve ser usado.

As alterações deste pacote ainda não foram enviadas ao GitHub.

## JavaScript e TypeScript
- `src/script.ts`: código-fonte com tipos e verificações estritas.
- `script.js`: JavaScript compilado que o navegador executa.
- `tsconfig.json`: configuração de compilação.
- `package.json` e `package-lock.json`: comandos e versão fixa do compilador.

Novos recursos: filtros Todos/Java/Python/Web, contador de projetos, navegação com setas, Home e End, e retorno de foco ao fechar a imagem ampliada. Todos os projetos continuam disponíveis sem JavaScript; os filtros só aparecem quando inicializados.

Para desenvolver, instale Node.js e execute na pasta do projeto:

```sh
npm ci
npm run check
npm run build
```

Edite `src/script.ts`, depois execute `npm run build`. Não edite `script.js` diretamente, pois ele será regenerado. Para publicar no GitHub Pages, envie também o `script.js` já compilado; o navegador não executa TypeScript diretamente. Não envie a pasta `node_modules`.

Compilação TypeScript, verificação estrita e sintaxe JavaScript aprovadas nesta versão. A revisão visual no navegador continua pendente.

## Projeto comercial de Renato Silva
Adicionado destaque em Projetos selecionados com três capturas reais: página inicial, catálogo Arla Eco 32 e catálogo Bardahl. As imagens podem ser ampliadas. Os botões abrem o site publicado e o repositório correspondente. Tecnologias informadas a partir do repositório: HTML, CSS e JavaScript.
As capturas foram feitas em 19/10/2026 (UTC). Para atualizar o GitHub Pages, envie também as três imagens imagem/renato-*.jpg.

## Atualização dos projetos — 19/10/2026
- Renato Silva: removido o botão de código; mantido Visitar site.
- Controle financeiro: adicionado destaque com três capturas do README público do repositório (dashboard, tela inicial e cadastro de entrada). Botão aponta ao endereço de download fornecido pelo proprietário. Essa página não pôde ser acessada pelo navegador de verificação; confira a disponibilidade antes de publicar.
- Verifica+: captura real da página publicada, descrição e botão Visitar site. A captura documenta a interface; o funcionamento da análise de notícias não foi validado.
- O endereço github.com/VitorMartinsRS/projetojava retornou 404 no acesso público. Os cartões Java existentes foram preservados, sem criar associação ou link de demonstração não confirmado. Envie o endereço correto ou arquivos para completar esse destaque.
- As versões TypeScript e JavaScript compilado continuam incluídas.

## Galerias fixas — versão atual
O carrossel antigo e sua lógica TypeScript foram removidos. Agora são quatro projetos com galerias fixas e ampliação por clique:
- Renato Silva: 5 capturas.
- Controle financeiro: 5 capturas.
- Verifica+: 2 capturas (interface inicial e validação de campo vazio).
- Xadrez Java: 2 capturas originais do portfólio, identificadas pela inspeção das imagens (interface e desenvolvimento JavaFX).
Os filtros e comandos de carrossel descritos nas notas antigas não se aplicam a esta versão. O projeto Java permanece sem botão de site porque não foi fornecido um endereço público funcional.

## Projeto de estacionamento automatizado
Adicionado aos projetos selecionados com link para o repositório `VitorMartinsRS/sistemas-embarcados-estacionamento`. O destaque explica que o Arduino Uno coordena os sensores ultrassônicos de entrada e saída, a contagem de até 10 vagas, o LCD I2C e o servo da cancela. Inclui a demonstração em vídeo `imagem/WhatsApp Video 2026-10-18 at 04.30.56.mp4`.
