# LegaLiga Back-end

Repositório back-end do projeto LegaLiga utilizando [Docker](https://www.docker.com/products/docker-desktop/), com [MySQL 8.2.0](https://dev.mysql.com/downloads/mysql/8.2.html) como banco de dados rodando com [Node.js 20.0.0](https://nodejs.org/dist/v20.0.0/)

## Densevolvimento

### Sem Docker

1. instale o [MySQL 8.2.0](https://dev.mysql.com/downloads/mysql/8.2.html)
2. instale o [Node.js 20.0.0](https://nodejs.org/dist/v20.0.0/)

3. Execute o comando:
```bash
copy .env.example .env
```
altere as credencias da mesma utilizada nas configurações do MySQL.

4. Execute o comando:
```bash
npm install
```
para baixar as dependências do projeto.

5. Execute o comando:
```bash
npm run migration
```
para criar as tables no mysql.

caso deseje ter dados para teste rode o comando:
```bash
npm run seed
```

6. Execute o comando
```bash
npm run dev
```
para iniciar a aplicação


### Com Docker
> [!NOTE]
> Antes de executar o aplicativo, certifique-se de ter o Docker instalado em sua máquina. Em seguida, clone este repositório e siga as instruções abaixo:

1. Execute o comando:
```bash
copy .env.example .env
```
coloque as credencias que deseja no .env, lembrando que as **LOCAL_PORT=3000** &
**DB_LOCAL_PORT=3307**. são as portas que estarão exposta para você acessar a aplicação.

2. Execute o comando:
```bash
docker compose up # Rodando no console
docker compose up -d # Rodando em background
```
para iniciar a aplicação.
O docker baixaram a images do MySQL e Node.js (Ser sua máquina nunca tever antes).