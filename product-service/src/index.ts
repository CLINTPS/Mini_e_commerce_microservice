import server from "./presentation/server";
import dbConnection from "./infrastructure/database/dbConnection";

(async () => {
  try {
    server;
    await dbConnection();
  } catch (error: any) {
    console.error("Error during initialization of server:", error);
    process.exit(1);
  }
})();