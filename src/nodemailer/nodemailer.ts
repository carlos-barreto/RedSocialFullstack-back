import nodemailer from 'nodemailer';

// Inicializar el trasnporter encargado de realizar el envio de correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CORREO,
        pass: process.env.PASSWORD,
    },
});

let mailOptions = {
    from: process.env.CORREO,
    to: '',
    subject: 'LABINNOVA',
    html: '',
    attachments: [
        {
            filename: 'logo.png',
            path: __dirname + '/logo.png',
            cid: 'logo',
        },
    ],
};

const estilosCorreo = `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif!important;
            font-size: 17px;
            letter-spacing: 0.02rem;
        }
        .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif!important;
            font-size: 18px;
            letter-spacing: 0.02rem;
            box-shadow: 0px 0px 10px rgb(0, 0, 0, .25);
        }
        .header {
            width: 100%;
            background: #004466;
        }
        .logo {
            padding: 20px 15px;
        }
        .logo a {
            text-decoration: none;
            font-size: 2rem;
            font-weight: 700;
            color: #FFF;
            text-align: center;
            position: relative;
            top: -23px;
        }
        .correo {
            padding: 25px 30px;
            border: 1px solid #004466;
            border-top: none;
            border-bottom: none;
        }
        .mensaje {
            color: #4e4e4e;
            text-align: justify;
        }
        .info {
            color: #7c7c7c;
            font-size: 0.8rem;
            text-align: center;
            margin-bottom: 15px;
            font-style: italic;
        }
        .text-center {
            text-align: center;
        }
        .mensaje h2 {
            text-align: center;
            margin-bottom: 10px;
        }
        .button {
            display: inline-block;
            background: #004466;
            color: #FFF!important;
            font-weight: 700;
            border: 2px solid #004466;
            border-radius: 4px;
            font-size: 0.8rem;
            padding: 11px 22px;
            margin: 20px auto;
            text-transform: uppercase;
            text-decoration: none;
        }
        .button:hover {
            background: #FFF;
            color: #004466!important;
        }
        .footer
        {
            background: #004466;
            padding: 10px;
        }
        .footer_cr
        {
            display: block;
            width: 100%;
            text-align: center;
            color: #fff;
        }
        .footer p {
            font-size: .85rem;
        }
        @media only screen and (max-width: 600px) {
            * {
                font-size: 14px;
            }
            .container {
                font-size: 14px;
            }
            .correo {
                border: none;
                padding: 20px 10px;
            }
            .logo a {
                font-size: 1.1rem;
            }
            .img-logo {
                max-width: 100px;
            }
            .button {
                font-size: 0.7rem;
                padding: 0.6rem 1rem;
            }
            .footer_intro p
            {
                font-size: 0.75rem;
            }
        }
    </style>
`;

const headerCorreo = () => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <title>LABINNOVA</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${estilosCorreo}
    </head>
    <body>
        <div class="container" style="width: 100%;max-width: 900px;margin: 0 auto;font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif!important;font-size: 18px;letter-spacing: 0.02rem;box-shadow: 0px 0px 10px rgb(0, 0, 0, .25);">
            <div class="header" style="width: 100%;background: #004466;">
                <div class="logo" style="text-align:center;padding: 15px;">
                    <a href="${process.env
    .URL_ADAPT!}" style="text-decoration: none;font-size: 1.8rem;font-weight: 700;color: #FFF;text-align: center;position: relative;top: -23px;margin: 0 auto;" target="_blank">LabINNOVA</a>
                </div>
            </div>
`;

const footerCorreo = `
            <div class="correo" style="padding:0;padding-bottom:20px;">
                <img class="img-logo" src="cid:logo" alt="Logo" height="57" width="210" style="width: 70%;max-width: 210px;height: auto;display: block;margin: 0 auto;">
            </div>
            <div class="footer">
                <div class="footer_intro">                                   
                    <div class="footer_cr">
                        <p>&copy; ${new Date().getFullYear()} UNAD - Todos los derechos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
`;

// configuraciones iniciales del correo
const initMailOptions = () => {
    return {
        from: process.env.CORREO,
        to: '',
        subject: 'Universidad Nacional Abierta y a Distancia - UNAD',
        html: '',
        attachments: [
            {
                filename: 'logo.png',
                path: __dirname + '/logo.png',
                cid: 'logo',
            },
        ],
    };
};

// Envia el correo de registro de cuenta en LabINNOVA
export const setMailUserRegister = (usuario: string, correo: string) => {
    mailOptions = initMailOptions();
    mailOptions.to = correo;
    mailOptions.subject = `🔔 Registro de usuario | LabINNOVA`;
    mailOptions.html = `
        ${headerCorreo()}
        <div class="correo">
            <div class="mensaje">
                <p>
                    Cordial Saludo<br>
                    <b>Respetado ${usuario}</b><br>
                    <b>UNAD</b>

                    <div style="margin:15px auto;margin-top: 25px;">
                        El presente correo tiene como objetivo informarle que se ha creado un usuario en la plataforma <b style="color: #004466;">LabINNOVA</b>, asociado al correo electronico ${correo}, recuerde que en este encontrará herramientas muy interesantes para fortalecer sus competencias como profesional; puede crear su propio contenido educativo digital, realizar gamificación para las prácticas pedagógicas, simular decisiones pedagógicas, crear avatares, tener escenarios 360, entre otros.
                    </div>

                    <a href="${process.env.URL_ADAPT!}" class="button" style="margin-top: 15px;margin-bottom: 0;">Ir a LabInnova</a>

                    <div style="margin:15px auto;margin-top: 25px;">
                        Cualquier inquietud sobre el uso de <b style="color: #004466;">LabINNOVA</b>, puede escribir al correo xxxxx@unad.edu.co
                    </div>

                    <div style="margin:15px auto;">
                        La universidad trabaja continuamente para ofrecerle un mejor servicio.
                    </div>

                    <div style="margin:15px auto;">
                        Atentamente,
                    </div>

                    <div style="margin:15px auto;">
                        <b>xxxxxxxxxx</b><br>
                        <b>Administrador LabINNOVA</b><br>
                        <b>UNAD</b><br>
                    </div>

                </p>
            </div>
        </div>
        ${footerCorreo}
    `;
}

// Envia el correo de alerta de tiempos de conexión al usuario
export const setCorreoUsuario = (usuario: string, correo: string, diasDesconexion: number) => {
    mailOptions = initMailOptions();
    mailOptions.to = correo;
    mailOptions.subject = `🔔 Recordatorio ingreso | LabINNOVA`;

    mailOptions.html = `
        ${headerCorreo()}
        <div class="correo">
            <div class="mensaje">
                <p>
                    Cordial Saludo<br>
                    <b>Respetado ${usuario}</b><br>
                    <b>UNAD</b>

                    <div style="margin:15px auto;margin-top: 25px;">
                        El presente correo tiene como objetivo recordarle que hace ${diasDesconexion} días no ha utilizado el laboratorio <b style="color: #004466;">LabINNOVA</b>, recuerde que en este encontrará herramientas muy interesantes para fortalecer sus competencias como profesional; puede crear su propio contenido educativo digital, realizar gamificación para las prácticas pedagógicas, simular decisiones pedagógicas, crear avatares, tener escenarios 360, entre otros.
                    </div>

                    <a href="${process.env.URL_ADAPT!}" class="button" style="margin-top: 15px;margin-bottom: 0;">Ir a LabInnova</a>

                    <div style="margin:15px auto;margin-top: 25px;">
                        Cualquier inquietud sobre el uso de <b style="color: #004466;">LabINNOVA</b>, puede escribir al correo xxxxx@unad.edu.co
                    </div>

                    <div style="margin:15px auto;">
                        La universidad trabaja continuamente para ofrecerle un mejor servicio.
                    </div>

                    <div style="margin:15px auto;">
                        Atentamente,
                    </div>

                    <div style="margin:15px auto;">
                        <b>xxxxxxxxxx</b><br>
                        <b>Administrador LabINNOVA</b><br>
                        <b>UNAD</b><br>
                    </div>

                </p>
            </div>
        </div>
        ${footerCorreo}
    `;
};

export const enviarEmail = () => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (!error) {
                // console.log('CORREO ENVIADO: ' + info.response)
                resolve(true);
                return;
            } else {
                // console.log('ERROR AL ENVIAR EL CORREO: ' + error)
                reject(false);
                return;
            }
        });
    });
};

