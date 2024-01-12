import { Request, Response } from 'express';
import moment from 'moment';
import { ConnectionUserTimeModel, IGetTimeConnectionIntoTwoTimes } from '../models/connectionUserTime';
import { UserModel } from '../models/user';

/**
 * @titulo Recibe la petición del tiempo de conexión de un o todos los usuarios
 * @descricion Obtiene todas las conexiones del o los usuarios, por medio del uso de funciones
 * que hacen uso de un rango determinado.
 * @returns envia al cliente el acomulado del tiempo de conexión.
 */
export const getConnectionsUserByID = async (req: Request, res: Response) => {
    try {
        const { all } = req.params;
        if (all) { //Se obtiene el acomulado de todos los usuarios en un rango determinado
            //Aca va el del array de usuarios de la base de datos
            let users = await UserModel.find({}, { email: 1, tipo_usuario: 1 });
            let timeUsersArray = [];
            for (const user of users) {
                //se recorre cada ususario y se calcula su acomulado, agregandolo cada vez a un array general
                let accumulated = await getAccumulatedById(req.body.initialDate, req.body.finishDate, user._id);
                timeUsersArray.push({ user, accumulated });
            }
            //Devuelve el array al cliente
            return res.json({
                status: true,
                data: timeUsersArray
            });
        } else { //Si se requiere el acumulado de un usuario en especifico
            let accumulated = await getAccumulatedById(req.body.initialDate, req.body.finishDate, req.body.id);
            return res.json({
                status: true,
                data: accumulated
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            error: 'Se presento un error en el sistema: ' + error
        })
    }
}

/**
 * @Título Esta función establece la diferencia entre dos fechas de un usuario en especifico en la colleccion de connectiontimeusers
 * @param initialDateReq rango inicial desde donde se hace el acomulado
 * @param finishDateReq rango final desde donde se hace el acomulado
 * @param userIdReq corresponde al idenficador del usuario al cual se realiza el acomulado
 * @returns retorna el acomulado en meses, días, horas, minutos y segundos del tiempo de conexión
 */
async function getAccumulatedById(initialDateReq: string, finishDateReq: string, userIdReq: any) {
    //hacemos uso de la libreria moment para extraer el tiempo entre intervalos
    let initialDate = moment(initialDateReq, "YYYY-MM-DD HH:mm:ss");
    let finishDate = moment(finishDateReq, "YYYY-MM-DD HH:mm:ss");
    //Obtenemos los registros de conexión de un usuario
    let arrayConnections = await getConnectByID(userIdReq);
    //Inicializamos la interfaz de datos para el acomulado
    let accumulated = initTime();
    //este es un contador para almacenar el número de conexiones en el rango de fechas.
    let numberConnection = 0;
    for (let index = 0; index < arrayConnections.length; index++) {
        const element = arrayConnections[index];
        let formatInitialDateDB = moment(element.timeStart).format("YYYY-MM-DD HH:mm:ss");
        let formatFinishDateDB = moment(element.timeEnd).format("YYYY-MM-DD HH:mm:ss");

        //validamos que los registros esten entre el rango de fecha solicitado
        if (initialDate.isBefore(formatInitialDateDB) && finishDate.isAfter(formatInitialDateDB)) {
            numberConnection++;
            let timeEndMoment = moment(element.timeEnd, "YYYY-MM-DD HH:mm:ss");
            if (finishDate.isAfter(formatInitialDateDB) && finishDate.isBefore(formatFinishDateDB)) {
                timeEndMoment = finishDate;
            }
            accumulated = getTimeConnectionIntoTwoTimes(formatInitialDateDB, timeEndMoment, accumulated, numberConnection);
        }
    }
    return accumulated;
}

/**
 * @titulo Define la interfaz o estructura de datos para los acomulados de tiempo
 * @returns una estructura de datos con los elementos años, meses, dias, horas, minutos y segundos
 */
function initTime(): IGetTimeConnectionIntoTwoTimes {
    return <IGetTimeConnectionIntoTwoTimes>({
        seconds: 0,
        numberConnection: 0,
        accumulated: {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    });
}

/**
 * @título Realiza consultas de registros en la coleccion connectiontimeusers
 * @param id identificador del usuario a obtener los registros de conexión
 * @returns una lista de registros de conexion de un usuario determinado
 */
function getConnectByID(id: String): any {
    return ConnectionUserTimeModel.find({ createdBy: id })
}

/**
 * @título Obteiene los valores acomulados por cada uno de los atributos de la interfaz IGetTimeConnectionIntoTwoTimes
 * @returns devuelve la interfaz IGetTimeConnectionIntoTwoTimes con los acumulados
 */
function getTimeConnectionIntoTwoTimes(initialDate: any, finishDate: any, accumulated: IGetTimeConnectionIntoTwoTimes, numberConnection: number): any {
    accumulated.seconds += finishDate.diff(initialDate, 's');
    accumulated.numberConnection = numberConnection;

    //se usa moment para calcular las diferencias en años, meses, días, horas, minutos y segundos
    accumulated.accumulated.years = moment.duration(accumulated.seconds, 'seconds').years();
    accumulated.accumulated.months = moment.duration(accumulated.seconds, 'seconds').months();
    accumulated.accumulated.days = moment.duration(accumulated.seconds, 'seconds').days();
    accumulated.accumulated.hours = moment.duration(accumulated.seconds, 'seconds').hours();
    accumulated.accumulated.minutes = moment.duration(accumulated.seconds, 'seconds').minutes();
    accumulated.accumulated.seconds = moment.duration(accumulated.seconds, 'seconds').seconds();

    return accumulated;
}
