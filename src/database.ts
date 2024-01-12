// import { connect } from "mongoose";
import mongoose from "mongoose";
/**
 * @titulo connectDB
 * @descricion Realiza la conexión a la base de datos teniendo en cuenta las varibles de entorno configuradas
 * @returns Retorna si la conexión fue exitosa o fallída
 * mongodb+srv://scorpioxxx2325:<password>@redsocial.tdr0129.mongodb.net/?retryWrites=true&w=majority
 */
export const connectDB = async () => {
  try {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "  ⏳ - CONECTANDOSE A LA BASE DE DATOS..."
    );
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@redsocial.tdr0129.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const setupConect = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: `${process.env.DB_NAME}`,
    };
    await mongoose
      .connect(uri!, setupConect)
      .then((res: any) => {
        console.log(res);
        console.log("Conectado a la base de datos");
        console.log("\x1b[32m%s\x1b[0m", "  👍 - BASE DE DATOS CONECTADA");
      })
      .catch((e: any) => {
        console.log("Database error", e);
      });

    // Conexión establecida
    return true;
  } catch (error: any) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "  ⛔ - ERROR AL CONECTAR CON LA BASE DE DATOS: ",
      error?.message
    );
    // Error en conexión
    return false;
  }
};
