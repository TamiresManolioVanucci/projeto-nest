import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres", // ou "mysql", "sqlite", etc.
  host: "localhost",
  port: 5432, // Porta do banco de dados
  username: "seu_usuario",
  password: "sua_senha",
  database: "seu_banco",
  synchronize: true, // Altere para "false" em produção
  logging: true,
  entities: ["src/entities/*.ts"], // Caminho para suas entidades
  migrations: ["src/migrations/*.ts"],
});
