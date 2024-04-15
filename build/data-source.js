"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var JournalEntry_1 = require("./entity/JournalEntry");
var _1712648880585_JournalEntry_1 = require("./migration/1712648880585-JournalEntry");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 54321,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [JournalEntry_1.JournalEntry],
    migrations: [_1712648880585_JournalEntry_1.JournalEntry1712648880585],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map