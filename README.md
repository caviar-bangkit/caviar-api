# CAVIAR-API

## Description

CAVIAR (Crosswalk Assistance App for the Visually Impaired Peoples) are an application that helps visually impaired people to cross the street safely. This application is developed by Bangkit 2023 Capstone Project Team C23-PS075.

## Getting Started

This repository contains the source code for the CAVIAR API. The API is built using Node.js, Express.js, MySQL and Prisma ORM.

### 1. Installing the Dependencies

Install npm dependencies using the following command:

```bash
cd caviar-api
npm install
```

### 2. Setting up the Database

Create a MySQL instance with docker compose using the following command:

- Make sure you have docker installed on your machine.
- Make sure you have docker-compose installed on your machine.
- Make sure that port 3306 is not used by another application.
- Check the docker-compose.yml file and configure the database name and root password.

```bash
docker-compose up -d
```

### 3. Connecting to the Database

Connect to the database using the following command:

- Make sure to check the connection url on schema.prisma file and adjust it to your database configuration.

```bash
npx prisma migrate dev --name init
```

### 4. Running the API

Run the API using the following command:

```bash
npm run start
```

### Optional: Running the API in Development Mode

Run the API in development mode using the following command:

```bash
npm run dev
```

### Optional: Running the Prisma Studio

Run the Prisma Studio using the following command:

```bash
npx prisma studio
```
