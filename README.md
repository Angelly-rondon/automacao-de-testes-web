# Automação de Testes Web

Projeto de automação de testes web desenvolvido como parte de um desafio técnico.

A aplicação utilizada nos testes é uma aplicação web pública. A suíte contempla os principais fluxos de autenticação, navegação, preenchimento de formulários, validações e interação com produtos.

## Considerações sobre o ambiente de testes

A aplicação utilizada é pública e pode sofrer interferências externas durante a execução dos testes, como anúncios e outros elementos de terceiros que podem afetar o carregamento da página ou os elementos do DOM.

Durante os testes, foram identificados casos em que esse tipo de interferência afetou alguns cenários. Para reduzir esse impacto, é altamente recomendável a utilização de um bloqueador de anúncios no navegador, mantendo a configuração padronizada entre as execuções.

Por isso, eventuais falhas devem ser analisadas considerando tanto o comportamento da aplicação quanto as condições do ambiente de execução.

## Tecnologias

* Node.js
* TypeScript
* WebdriverIO
* Mocha
* Allure Report
* ESLint
* Prettier
* GitHub Actions
* LambdaTest
* Faker

## Pré-requisitos

Para execução local, é necessário ter instalado:

* Node.js 22 ou superior (recomendável LTS);
* NPM;
* Git;
* Google Chrome.

A execução desse script requer um ambiente compatível com shell script, como Git Bash ou WSL no Windows.

<br>

Para execução em nuvem utilizando LambdaTest, também são necessárias:

* Conta no LambdaTest;
* Credenciais de acesso ao LambdaTest (`LT_USERNAME` e `LT_ACCESS_KEY`).

As credenciais de serviços externos devem ser fornecidas por variáveis de ambiente e não devem ser versionadas no repositório.

<div style="margin-left: 40px;">
O projeto disponibiliza um arquivo `.env.example` com as variáveis necessárias para a execução.
</div>

## Instalação

Clone o projeto e acesse o diretório:

```bash
git clone https://github.com/Angelly-rondon/automacao-de-testes-web.git
cd automacao-de-testes-web
```

Instale as dependências:

```bash
npm install
```

Por fim, gere o arquivo .env na raiz do projeto.
<br>
<br>

Também é possível utilizar o script de configuração inicial, facilitando os processos citados acima:

```bash
./setup.sh
```

O script automatiza a configuração inicial necessária para preparar o projeto antes da execução dos testes.

## Execução dos testes

Para executar os testes localmente:

```bash
npm run wdio
```

* A execução local utiliza o Google Chrome.
<br>

A seleção do ambiente é feita pela variável `TEST_ENV`.

```text
TEST_ENV=local
```

é utilizada para a execução local.
<br><br>

A configuração de cada ambiente está definida no arquivo `wdio.conf.ts`.

## Execução com LambdaTest

O projeto também permite a execução dos testes em ambiente de nuvem utilizando o LambdaTest. 
<br><br>

A conexão com o LambdaTest utiliza as seguintes variáveis de ambiente:

```text
LT_USERNAME
LT_ACCESS_KEY
```
<br>

**Para executar dos testes no LambdaTest, deve-se executar o seguinte comando:**

```bash
npm run wdio:cloud
```
<br>

A variável:

```text
TEST_ENV=cloud
```

é utilizada na execução com LambdaTest.
<br> 

## Cenários de teste

Foram implementados 10 cenários:

<b>1.</b> Login com credenciais válidas;<br> <b>2.</b> Login com e-mail não cadastrado;<br> <b>3.</b> Login com senha inválida;<br> <b>4.</b> Login com campos obrigatórios vazios;<br> <b>5.</b> Logout após login;<br> <b>6.</b> Navegação entre páginas do sistema;<br> <b>7.</b> Pesquisa de produto;<br> <b>8.</b> Adição de produto ao carrinho;<br> <b>9.</b> Cadastro de usuário com sucesso;<br> <b>10.</b> Isolamento do carrinho entre diferentes usuários.

Os testes utilizam o design pattern `Page Object Model` para separar a interação dos elementos das páginas com a aplicação da definição dos cenários.

No cenário de cadastro de usuário, são utilizados dados gerados dinamicamente com `Faker`, evitando a dependência de dados fixos e reduzindo a possibilidade de conflitos entre execuções.

## Page Object Model (POM)

Os elementos e ações de cada página são centralizados nos respectivos Page Objects, enquanto os arquivos de especificação (specs) ficam responsáveis pela definição e validação dos cenários de teste.

## Evidências e relatórios

O projeto utiliza o *Allure Report* para consolidar os resultados das execuções.

Durante os testes são capturadas screenshots como evidências dos cenários executados, incluindo situações de sucesso e de falha.

As evidências fornecem rastreabilidade da execução e auxiliam na investigação de inconsistências, regressões e possíveis alterações no comportamento da aplicação ao longo do tempo.

**O relatório reúne informações relevantes da execução, como:**

* Status dos testes (`Passed`, `Failed` e `Skipped`);
* Steps e ações reportadas pelo WebdriverIO;
* Logs de console, quando disponíveis;
* Screenshots das execuções;
* Metadados do ambiente;
* Informações do navegador e versão utilizada.

**Os resultados brutos são armazenados na pasta `allure-results/` e utilizados para gerar o relatório interativo na pasta `allure-report/`.**

Para gerar o relatório localmente:

```bash
npm run allure:generate
```

Para abrir o relatório:

```bash
npm run allure:open
```

## CI/CD

O projeto possui uma pipeline configurada no `GitHub Actions` para automatizar as verificações e a execução dos testes.

O fluxo é executado automaticamente nos seguintes eventos:

* Push na branch `main`;
* Pull Request para a branch `main`.
<br>

Durante a execução da pipeline são realizadas as seguintes etapas:

<b>1.</b> Configuração para inicialização do projeto (localmente e na nuvem);<br> 
<b>2.</b> Execução dos testes;<br> 
<b>3.</b> Geração do relatório do Allure Report;<br> 
<b>4.</b> Criação do Artifact contendo os reports.<br> 

- A pipeline executa os testes por meio de dois jobs diferentes, sendo eles, localmente e na nuvem (LambdaTest), utilizando as credenciais armazenadas como GitHub Secrets.

As credenciais e demais dados sensíveis são disponibilizados para o fluxo por variáveis de ambiente durante a execução.

### Artifacts do relatório

Após a execução da pipeline, os resultados do Allure são publicados como artifacts no GitHub Actions.
<div style="margin-left: 40px;">
O artifact do relatório contém o conteúdo da pasta `allure-report/`, permitindo consultar o relatório HTML gerado pela execução.
</div>
<br>

Também são disponibilizados os arquivos da pasta `allure-results/`, que contêm os resultados utilizados na geração do relatório e as evidências anexadas, como screenshots.

Os resultados das etapas também ficam disponíveis nos logs da execução do workflow.

## Variáveis de ambiente

O projeto utiliza variáveis de ambiente para armazenar credenciais e configurações que não devem ser incluídas diretamente no código-fonte.

### .env

Durante a execução local, os valores são armazenados no arquivo `.env`.

**Para configurar o ambiente local:**

<b>1.</b> Crie uma cópia do `.env.example` e renomeie para `.env`.<br> <b>2.</b> Preencha os valores das variáveis.<br> <b>

Exemplo:

```text
# Usuário cadastrado previamente
TEST_USER_NAME=Nome do usuário
TEST_USER_EMAIL=email@exemplo.com
TEST_USER_PASSWORD=senha

# Usuário alternativo
TEST_USER_NAME_ALTERNATIVE=Nome do usuário alternativo
TEST_USER_EMAIL_ALTERNATIVE=email-alternativo@exemplo.com
TEST_USER_PASSWORD_ALTERNATIVE=senha

# Ambiente de execução
TEST_ENV=local

# LambdaTest
LT_USERNAME=seu_usuario
LT_ACCESS_KEY=sua_chave
```

Para executar os testes no LambdaTest, o ambiente utilizado deve ser:

```text
TEST_ENV=cloud
```


## Estrutura do projeto

A organização do projeto separa a configuração do WebdriverIO, os dados de teste, os cenários e os Page Objects, mantendo a lógica de interação com a aplicação independente da definição dos casos de teste.

A estrutura principal segue a organização utilizada pelo projeto:

```text
.
├── test/
│   ├── data/
│   ├── pageobjects/
│   │   ├── components/
│   │   └── pages/
│   └── specs/
│
├── .github/
│   └── workflows/
│
├── wdio.conf.ts
├── package.json
├── tsconfig.json
├── .env.example
├── setup.sh
└── README.md
```

## Execução resumida

Após configurar os pré-requisitos e as variáveis de ambiente:

Execute os testes localmente:

```bash
npm run wdio
```

Para executar os testes no LambdaTest:

```bash
npm run wdio:cloud
```

Para gerar e visualizar o relatório Allure:

```bash
npm run allure:generate
npm run allure:open
```

A execução automatizada também pode ser acompanhada pelo workflow configurado no GitHub Actions, incluindo os resultados e artifacts gerados pela pipeline.
