import fs from "fs";

import { toolConfig } from "./config";
import type { DbSchema } from "./processGqlSchema";

const header = `
/* Autogenerated file. Do not edit manually. */
`;

const imports = `
${header}
import { db } from "../tool/db";
`;

const generateContext = async (dbSchema: DbSchema) => {
  const { tables } = dbSchema;

  let generatedFileCount = 0;

  const tableProperties = tables
    .map(
      (table) =>
        `${table.name}: db<{id: number; account: string;}>('${table.name}'),`
    )
    .join("");

  const entities = `
  const entities = {
    ${tableProperties}
  }
  `;

  const body = entities;

  const final = imports + body;

  fs.writeFileSync(
    `${toolConfig.pathToGeneratedDir}/entities.ts`,
    final,
    "utf8"
  );
  generatedFileCount += 1;

  return generatedFileCount;
};

export { generateContext };
