import { NextFunction, Request, Response, Router } from "express";
import { JournalEntryService } from "../services/JournalEntry.service";
import {
  JCreateEntry,
  JDeleteEntry,
  JGetEntry,
  JPatchEntry,
} from "./JournalEntry.controller.interface";

const JOI_OPTIONS = {
  stripUnknown: { objects: true },
  convert: false,
};

export class JournalEntryController {
  private readonly journalEntryService: JournalEntryService;
  private readonly router: Router;

  constructor(journalEntryService: JournalEntryService) {
    this.journalEntryService = journalEntryService;
    this.router = Router();
    this.router.post("/", this.createEntry.bind(this));
    this.router.get("/", this.getEntry.bind(this));
    this.router.patch("/:id", this.patchEntry.bind(this));
    this.router.delete("/:id", this.deleteEntry.bind(this));
  }

  getRouter(): Router {
    return this.router;
  }

  public async createEntry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const payload = req.body;
      const validatedPayload = await JCreateEntry.validateAsync(
        payload,
        JOI_OPTIONS
      );

      const journalEntry = await this.journalEntryService.createEntry(
        validatedPayload
      );
      return res.status(200).send(journalEntry);
    } catch (err) {
      return res.status(500).send({
        msg: "error",
      });
    }
  }

  public async getEntry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const query = req.query;
      const validatedQuery = await JGetEntry.validateAsync(query, JOI_OPTIONS);

      const journalEntries = await this.journalEntryService.getEntry(
        validatedQuery
      );

      return res.status(200).send(journalEntries);
    } catch (err) {
      return res.status(500).send({
        msg: "no entry",
      });
    }
  }

  public async patchEntry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const id = req.params.id;
      const payload = {
        id, //id: id
        ...req.body,
      };
      const validatedPayload = await JPatchEntry.validateAsync(
        payload,
        JOI_OPTIONS
      );

      const journalEntry = await this.journalEntryService.patchEntry(
        validatedPayload
      );

      return res.status(200).send(journalEntry);
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        msg: "no applicable",
      });
    }
  }

  public async deleteEntry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const id = req.params.id;
      const param = {
        id,
      };

      const validatedParam = await JDeleteEntry.validateAsync(
        param,
        JOI_OPTIONS
      );

      await this.journalEntryService.deleteEntry(validatedParam);

      const resPayload = {
        isDeleted: "success",
      };

      return res.status(200).send(resPayload);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: "error delete",
      });
    }
  }
}
