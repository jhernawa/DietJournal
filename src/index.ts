import { AppDataSource } from "./data-source";
import express, { Express, Request, Response } from "express";
import { config as dotenv } from "dotenv";
import cors from "cors";
import { JournalEntryService } from "./services/JournalEntry.service";
import { JournalEntryController } from "./controllers/JournalEntry.controller";
import { JournalEntry } from "./entity/JournalEntry";
dotenv();

const app: Express = express();
app.use(express.json());

app.use(cors());
const port = process.env.PORT;

const init = async () => {
  AppDataSource.initialize();
  const journalEntryRepo = AppDataSource.getRepository(JournalEntry);
  const journalEntryService = new JournalEntryService(journalEntryRepo);
  const journalEntryController = new JournalEntryController(
    journalEntryService
  );

  return {
    journalEntryController,
  };
};

const setupRoutes = async () => {
  const { journalEntryController } = await init();
  app.get("/", (req: Request, res: Response) => {
    res.send("Healthcheck OK");
  });
  app.use("/journalentry", journalEntryController.getRouter());

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

setupRoutes();
