import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres", // ou "mysql", "sqlite", etc.
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 3000, // Porta do banco de dados
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // Altere para "false" em produção
  logging: true,
  entities: [__dirname + "/../../src/modules/**/domain/entities/*.entity.{js,ts}"], // Caminho para suas entidades
  migrations: [__dirname + "/migrations/*.{js,ts}"],
});
