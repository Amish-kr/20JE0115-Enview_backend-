import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
app.use("/", routes);
