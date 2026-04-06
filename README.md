# NestJS Microservices — Users & Wallet

A microservices application built with NestJS, gRPC, Prisma, and pnpm. The system consists of three services: an API Gateway, a User Service, and a Wallet Service.

---

## Architecture

```
Client Request
      ↓
API Gateway (nestjsmicroservices) — port 3000
      ↓
gRPC calls
      ↓
┌─────────────────┬──────────────────┐
User Service       Wallet Service
port 3002          port 3001
      ↓                  ↓
   Prisma DB          Prisma DB
```

---

## Tech Stack

- **Framework** — NestJS (Monorepo)
- **Transport** — gRPC
- **ORM** — Prisma
- **Package Manager** — pnpm
- **Environment** — dotenvx
- **Language** — TypeScript

---

## Project Structure

```
nestjsmicroservices/
├── apps/
│   ├── nestjsmicroservices/     # API Gateway
│   ├── user-service/            # User microservice
│   └── wallet-service/          # Wallet microservice
├── libs/
│   └── packages/
│       └── src/
│           ├── proto/           # Protobuf definitions
│           ├── generated/       # Prisma generated client
│           ├── prisma/          # Prisma service & module
│           └── index.ts         # Shared exports
├── prisma/
│   └── schema.prisma
├── nest-cli.json
├── .env
└── package.json
```

---

## Prerequisites

- Node.js >= 18
- pnpm installed globally (`npm install -g pnpm`)
- dotenvx installed globally (`npm install -g @dotenvx/dotenvx`)
- protoc (Protocol Buffer Compiler) installed and added to PATH

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd micrpserviceswithnestjs
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### 4. Generate Prisma client

```bash
dotenvx run -f .env -- pnpm prisma generate
```

### 5. Run database migrations

```bash
dotenvx run -f .env -- pnpm prisma migrate dev
```

### 6. Generate Protobuf TypeScript types

```bash
pnpm proto:gen
```

---

## Running the Services

Each service must be started in a **separate terminal**. Always start the shared packages build first.

### Build shared packages

```bash
pnpm nest build packages
```

### Start API Gateway

```bash
dotenvx run -f .env -- pnpm nest start nestjsmicroservices --watch
```

### Start User Service

```bash
dotenvx run -f .env -- pnpm nest start user-service --watch
```

### Start Wallet Service

```bash
dotenvx run -f .env -- pnpm nest start wallet-service --watch
```

> **Note:** Make sure all three services are running before making requests to the API Gateway.

---

## API Routes

All requests go through the API Gateway at `http://localhost:3000`

### Users

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/users/create` | Create a new user |
| GET | `/users/:id` | Get a user by ID |

### Wallet

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/wallet/create` | Create a wallet for a user |
| GET | `/wallet/:id` | Get a wallet by ID |
| POST | `/wallet/credit` | Credit a wallet |
| POST | `/wallet/debit` | Debit a wallet |

---

## Example Requests

### Create User

```http
POST http://localhost:3000/users/create
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
}
```

**Response**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

### Get User by ID

```http
GET http://localhost:3000/users/1
```

**Response**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

### Create Wallet

```http
POST http://localhost:3000/wallet/create
Content-Type: application/json

{
  "userId": 1
}
```

**Response**

```json
{
  "id": 1,
  "userId": 1,
  "balance": 0,
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

### Get Wallet by ID

```http
GET http://localhost:3000/wallet/1
```

**Response**

```json
{
  "id": 1,
  "userId": 1,
  "balance": 0,
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

### Credit Wallet

```http
POST http://localhost:3000/wallet/credit
Content-Type: application/json

{
  "userId": 1,
  "amount": 500
}
```

**Response**

```json
{
  "id": 1,
  "userId": 1,
  "balance": 500,
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

### Debit Wallet

```http
POST http://localhost:3000/wallet/debit
Content-Type: application/json

{
  "userId": 1,
  "amount": 200
}
```

**Response**

```json
{
  "id": 1,
  "userId": 1,
  "balance": 300,
  "createdAt": "2026-04-06T01:33:48.444Z"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request — invalid input |
| 404 | Not Found — resource does not exist |
| 409 | Conflict — resource already exists |
| 500 | Internal Server Error |

---

## Postman Collection

> Add your Postman collection link or import badge here

[![Run in Postman](https://run.pstmn.io/button.svg)]((https://planetary-shuttle-739649.postman.co/workspace/Assignment~1d0c3a28-8598-4c07-89d3-04f52e9c91e0/collection/27655412-077153ed-923e-49af-aed0-e4bde184d145?action=share&source=copy-link&creator=27655412))

Or import the collection manually:
1. Open Postman
2. Click **Import**
3. Paste the collection link or upload the JSON file

---

## Database Schema

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String
  createdAt DateTime @default(now())
  wallet Wallet?
}

model Wallet {
  id        Int     @id @default(autoincrement())
  userId    Int    @unique
  balance   Float   @default(0)
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

---

## Common Issues

**Services not connecting**
Make sure all three services are running and the ports match what's configured in the gateway's `ClientsModule`.

**Proto files not found**
Run `nest build packages` before starting any service to ensure proto files are copied to the correct dist location.

**Prisma client not found**
Run `dotenvx run -f .env -- pnpm prisma generate` to regenerate the Prisma client after any schema changes.

**Migration errors**
Make sure your `DATABASE_URL` in `.env` is correct and the database is running before running migrations.
