import { Between, Repository } from "typeorm";
import { JournalEntry } from "../entity/JournalEntry";
import {
  ICreateEntryRequest,
  IDeleteEntryRequest,
  IGetEntryRequest,
  IPatchEntryRequest,
} from "./JournalEntry.service.interface";
import { create } from "domain";

export class JournalEntryService {
  private readonly journalEntryRepo: Repository<JournalEntry>;

  constructor(journalEntryRepo: Repository<JournalEntry>) {
    this.journalEntryRepo = journalEntryRepo;
  }

  public async createEntry(req: ICreateEntryRequest): Promise<JournalEntry> {
    const createdDate: Date = new Date(req.createdDate);
    const isExist = await this.journalEntryRepo.exists({
      where: {
        created: createdDate,
        type: req.type,
      },
    });

    if (isExist) throw new Error("entry exists");

    const journalEntry = await this.journalEntryRepo.save({
      created: createdDate,
      updated: createdDate,
      type: req.type,
      status: req.status,
      notes: req.notes,
    });
    return journalEntry;
  }

  public async getEntry(req: IGetEntryRequest): Promise<JournalEntry[]> {
    const startDate: Date = new Date(req.startDate);
    const endDate: Date = new Date(req.endDate);

    const journalEntries = await this.journalEntryRepo.findBy({
      created: Between(startDate, endDate),
    });

    return journalEntries;
  }

  public async patchEntry(req: IPatchEntryRequest): Promise<JournalEntry> {
    let updatedObject = { ...req };
    if (req.createdDate) {
      const created: Date = new Date(req.createdDate);
      updatedObject["created"] = created;
      delete updatedObject.createdDate;
    }

    await this.journalEntryRepo.update({ id: req.id }, updatedObject);

    const journalEntry = await this.journalEntryRepo.findOneBy({
      id: req.id,
    });

    return journalEntry;
  }

  public async deleteEntry(req: IDeleteEntryRequest): Promise<Boolean> {
    await this.journalEntryRepo.delete(req.id);

    const isExist = await this.journalEntryRepo.existsBy({
      id: req.id,
    });

    if (isExist) throw new Error("entry exists");

    return !isExist;
  }
}
