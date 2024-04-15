import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { StatusEnum, TypeEnum } from "./JournalEntry.interface";

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({
    type: "enum",
    enum: TypeEnum,
    default: TypeEnum.DEFAULT,
  })
  type: TypeEnum;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.FAILED,
  })
  status: StatusEnum;

  @Column()
  notes: String;
}
