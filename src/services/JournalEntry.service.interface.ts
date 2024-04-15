import { StatusEnum, TypeEnum } from "../entity/JournalEntry.interface";

export interface ICreateEntryRequest {
  createdDate: string;
  type: TypeEnum;
  status: StatusEnum;
  notes?: string;
}

export interface IGetEntryRequest {
  startDate: string;
  endDate: string;
}

export interface IPatchEntryRequest {
  id: string;
  createdDate?: string;
  type?: TypeEnum;
  status?: StatusEnum;
  notes?: string;
}

export interface IDeleteEntryRequest {
  id: string;
}
