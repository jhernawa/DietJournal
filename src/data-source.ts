import "reflect-metadata";
import { DataSource } from "typeorm";
import { JournalEntry } from "./entity/JournalEntry";
import { JournalEntry1712648880585 } from "./migration/1712648880585-JournalEntry";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 54321,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [JournalEntry],
  migrations: [JournalEntry1712648880585],
  subscribers: [],
});
