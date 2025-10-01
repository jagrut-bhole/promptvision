import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    app.on("error", (error) => {
      console.log("Server Error!!", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed", error);
  });
