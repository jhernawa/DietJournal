import Joi from "joi";
import { StatusEnum, TypeEnum } from "../entity/JournalEntry.interface";

export const JCreateEntry = Joi.object({
  createdDate: Joi.string().required(),
  type: Joi.string().valid(...Object.values(TypeEnum)),
  status: Joi.string().valid(...Object.values(StatusEnum)),
  notes: Joi.string().optional(),
});

export const JGetEntry = Joi.object({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});

export const JPatchEntry = Joi.object({
  id: Joi.string().required(),
  createdDate: Joi.string().optional(),
  type: Joi.string()
    .valid(...Object.values(TypeEnum))
    .optional(),
  status: Joi.string()
    .valid(...Object.values(StatusEnum))
    .optional(),
  notes: Joi.string().optional(),
});

export const JDeleteEntry = Joi.object({
  id: Joi.string().required(),
});
