import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(
  "postgres://postgres:adminadmin@0.0.0.0:5432/db",
  { max: 1 }
);
// migrate(drizzle(migrationClient))

const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
