import express from 'express'
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";

//<--------------------------------CONFIG FILE-------------------------------------->
config({
  path: "./config.env",
});

//<---------------Importing Routes
import apiRoutes from "./routes/apiRoute.js"



const app = express();
const port = 8000;


//<--------additional middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, `http://localhost:5173`],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
// app.options("*", cors());

//<---------------test api------------------------------------------------------------>
app.get("/", (req, res) => {
  res.send("api working");
});

//<-------------------------------------USING ROUTES----------------------------------->
app.use("/api", apiRoutes); //user routes



app.listen(port, () => {
  console.log(
    `<============================SERVER WORKING ${port}====================================>`
  );
});