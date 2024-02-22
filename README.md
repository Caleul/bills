# Bills API

### Descrição

Este projeto visa desenvolver um sistema para calcular automaticamente os valores de juros e multas de boletos vencidos.
O sistema permitirá que os usuários digitem o código de barras de um boleto e recebam as informações sobre os valores devidos.

O sistema verifica dados de boletos bancários e armazena requisições na base de dados

- Node.js: Backend do sistema, com Fastify e Zod
- PostgreSQL: Banco de dados
- Docker: Contêinerização
- Prisma: ORM
- Redis: Armazenamento de token para consumo de API externa
- Jest: Testes unitários
- Postman: Collection para teste de integração
- Docker: Serviço de containers

### Recursos ao cliente

- Cálculo automático de juros compostos e multas.
- Exibição de informações sobre o boleto, como valor original, data de vencimento e tipo de boleto.
- Tratamento de erros de forma amigável.
- Armazenamento dos cálculos realizados em um banco de dados para análise posterior.

### Funcionamento

- Método HTTP para gerenciamento de requisições de boletos
- Módulo HTTPS para consumir APIs de terceiros
- Cache com Redis para armazenar token de acesso à API externas
- Dados armazenados no PostgreSQL

![image](https://github.com/Caleul/bills/assets/50340360/22786dd5-49b5-4122-8e2d-1564cfced1e5)


# Para executar o projeto localmente

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
Essa etapa deve ser feita para que o prisma crie na base PostgreSQL a tabela que irá armazenar as requisições
```
npx prisma migrate dev
```

### Inicie o servidor:
```
npm run dev
```

### Pronto!
Isso iniciará o serviço localmente, pronto para receber requisições HTTP do tipo POST na rota '/bill' pela porta configurada em 'PORT' no arquivo '.env'.

# Testar

Como foi requerido pelo desafio, a ferramenta principal para executar testes de integração foi o Postman.
Por isso, ela é a com maior abrangência nas validações

Para testar as funcionalidades, você pode:
- Utilizar um cliente HTTP, como Postman
- Utilizar a extensão "REST Client" no seu Visual Studio Code.
- Testar com Jest

## Postman
Para executar os testes com Postman, um arquivo com a coleção foi deixado na reaiz do repositório 'Bills API.postman_collection.json'.

1. Importe no Postman a coleção 'Bills API'
2. Crie variáveis de coleção 'baseUrl' e 'basePort' como 'http://localhost' e '3000' respectivamente
3. execute os testes

## REST Client no Visual Studio Code
Para testar com o REST Client diretamente do Visual Studio Code basta instalar a extensão 'REST Cliente', abrir o arquivo 'request.http' e clicar em 'Send Request' acima de cada método

![image](https://github.com/Caleul/bills/assets/50340360/c712d809-3e2b-429f-a765-b4417fe85aab)

Foi deixado no arquivo 'request.http' 4 testes, um para cada código de barras fornecido pelo desafio

## Jest
Para executar os testes com Jest inicie o serviço e execute
```
npm run test
```

Foram configurados 3 testes com o Jest:

- Unitário - Fine: Para verificar se a multa está sendo corretamente calculada
- Unitário - Interest: Para verificar se o juros está sendo corretamente calculado
- Integração - Server: Para verificar se o servidor está funcionando corretamente, além de testar: 
  - Se o código de barras é valido
  - Se a data é válida
  - Se o tipo do boleto é válido
  - Se a data de pagamento está em atraso
  - ATENÇÂO: O teste de integração com Postman tem maior abrangência
 
