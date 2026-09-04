// import 'dotenv/config';
// import postgres from '@prisma/orm-postgres/runtime';
// import type { Contract } from './contract.d';
// import contractJson from './contract.json' with { type: 'json' };

// export const db = postgres<Contract>({
//   contractJson,
//   url: process.env['DATABASE_URL']!,
// });

import { definePrismaConfig } from "@prisma/cli-engine"
import { defineConfig as postgresConfig } from "@prisma/orm-postgres/config"
import "dotenv/config"

const directUrl = process.env.DIRECT_URL
if (!directUrl) {
  throw new Error("DIRECT_URL is required for Prisma CLI.")
}

export default definePrismaConfig({
  orm: postgresConfig({
    contract: "./src/prisma/contract.prisma",

    db: {
      connection: directUrl
    }
  })
})
