import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

import { config } from "dotenv";
config();

import { connectDB } from "./database";
import { apiRoutes } from "./routes/index.routes";
import { createServer, Server } from "http";

// Integración LTI
import { connection } from "mongoose";
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const app: Application = express();

app.use(json());
app.use(express.text());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(
  session({
    name: "session_v1p3",
    secret: "iualcoelknasfnk",
    saveUninitialized: true,
    resave: true,
    secure: true,
    ephemeral: true,
    httpOnly: true,
    store: new MongoStore({ mongooseConnection: connection }),
  })
);

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

/**
 * @titulo initServer
 * @descricion Realiza la inicialización del API para
 * postriormente inicializar los demas servicios
 */
const initServer = async () => {
  // Conectar con la base de datos
  const DBConectada = await connectDB();

  // Si la conexión a la BD es exitosa se inicializa el servidor
  if (DBConectada) {
    const server: Server = createServer(app);

    server.listen(PORT, async () => {
      console.log(
        "\x1b[32m%s\x1b[0m",
        `  🔴 - API INICIADA EN ${process.env.API_URL}`
      );
    });
  }
};

initServer();
