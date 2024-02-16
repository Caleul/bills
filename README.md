# Slip API

## Descrição

Este projeto visa desenvolver um sistema para calcular automaticamente os valores de juros e multas de boletos vencidos.
O sistema permitirá que os usuários digitem o código de barras de um boleto e recebam as informações sobre os valores devidos.

O sistema verifica dados de boletos bancários e armazena requisições na base de dados

Node.js: Backend do sistema
PostgreSQL: Banco de dados
Docker: Contêinerização
Prisma: ORM

## Forma de funcionamento

- Métodos HTTP para gerenciamento de requisições de boletos
- Módulo HTTPS para consumir APIs de terceiros
- Cache com Fastify para armazenar token de acesso
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
Edite o arquivo .env e configure as credenciais do banco de dados.
```
DATABASE_URL="postgresql://docker:docker@localhost:5432/polls?schema=public"
```

Crie também as demais configurações necessárias
```
TOKENGENERATOR_CLIENT_ID
TOKENGENERATOR_CLIENT_SECRET
TOKENGENERATOR_HOSTNAME
TOKENGENERATOR_PATH
SLIPINFO_HOSTNAME
SLIPINFO_PATH
SECRET
PORT
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

## Recursos

- Cálculo automático de juros e multas.
- Exibição de informações sobre o boleto, como valor original, data de vencimento e tipo de boleto.
- Tratamento de erros de forma amigável.
- Armazenamento dos cálculos realizados em um banco de dados para análise posterior.