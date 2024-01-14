import path from "path";
import fs from "fs-extra";

/**
 * @titulo archivoExiste
 * @descricion Comprueba si un archivo existe o no en una carpeta específica
 * @returns true o false segun sea el caso
 */
export const archivoExiste = (archivo: any) => {
  try {
    if (fs.existsSync(archivo)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

/**
 * @titulo prettierFecha
 * @descricion Realliza el formateo de una fecha al formato especifíco
 * @returns fecha formateada
 */
export const prettierFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const prettierFechaCorta = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * @titulo randomString
 * @descricion Crea una cadena de texto aleatoria
 * @returns string de caracteres aleatorios
 */
export const randomString = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

