import app from "./src/app.js";
import { connectoDb } from "./src/config/db.js";

connectoDb()
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});