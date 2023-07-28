import { app } from "./app";
import { connectDatabase } from "./database/connect";

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000...");
});
