# Bills API

## Descrição

Este projeto visa desenvolver um sistema para calcular automaticamente os valores de juros e multas de boletos vencidos.
O sistema permitirá que os usuários digitem o código de barras de um boleto e recebam as informações sobre os valores devidos.

O sistema verifica dados de boletos bancários e armazena requisições na base de dados

Node.js: Backend do sistema
PostgreSQL: Banco de dados
Docker: Contêinerização
Prisma: ORM
Redis: Armazenamento de token para consumo de API externa

## Recursos

- Cálculo automático de juros e multas.
- Exibição de informações sobre o boleto, como valor original, data de vencimento e tipo de boleto.
- Tratamento de erros de forma amigável.
- Armazenamento dos cálculos realizados em um banco de dados para análise posterior.

## Forma de funcionamento

- Método HTTP para gerenciamento de requisições de boletos
- Módulo HTTPS para consumir APIs de terceiros
- Cache com Redis para armazenar token de acesso à API externas
- Dados armazenados no PostgreSQL

## Para executar o projeto localmente

### Clone o repositório:
```
git clone https://github.com/caleul/slips.git
```

### Instale as dependências:
```
npm install
```

### Crie o arquivo de configuração do banco de dados:
Edite o arquivo .env e configure as credenciais do PostgreSQL, Redis e porta de execução.
```
DATABASE_URL="postgresql://docker:docker@localhost:5432/bills?schema=public"
REDIS_PORT="localhost"
PORT=3000
```

Crie também as demais configurações necessárias
```
TOKENGENERATOR_CLIENT_ID
TOKENGENERATOR_CLIENT_SECRET
TOKENGENERATOR_HOSTNAME
TOKENGENERATOR_PATH
BILLINFO_HOSTNAME
BILLINFO_PATH
```

### Inicie os containers
Na pasta do repositório
```
docker-compose up -d
```

### Execute o prisma:
```
npx prisma migrate dev
```

### Inicie o servidor:
```
npm run dev
```

## Pronto!
Isso iniciará o serviço localmente, pronto para receber requisições HTTP do tipo POST na rota '/bill'.

Para testar as funcionalidades, você pode:
- Utilizar um cliente HTTP, como Postman
- Utilizar a extensão "REST Client" no seu Visual Studio Code.
- Testar com Jest

### Postman

### REST Client no Visual Studio Code
Para testar com o REST Cliente diretamente do Visual Studio Code basta abrir o arquivo 'request.http' e clicar em 'Send Request' acima de cada método

![image](https://github.com/Caleul/bills/assets/50340360/c712d809-3e2b-429f-a765-b4417fe85aab)

### Jest
Para executar os testes com Jest inicie o serviço e execute
```
npm run test
```

Foram configurados 3 testes:

- Fine: Para verificar se a multa está sendo corretamente calculada
- Interest: Para verificar se o juros está sendo corretamente calculado
- Server: Para verificar se o servidor está funcionando corretamente, além de testar:
  - Se o código de barras é valido
  - Se a data é válida
  - Se o tipo do boleto é válido
  - Se a data de pagamento está em atraso
