import { Schema, model, ObjectId } from 'mongoose';
import { IRoles } from './roles';

export interface IUser {
  // _id?                 : ObjectId,
  firstName: string;
  lastName: string;
  email: string;
  firstAccess: Date;
  lastAccess: Date;
  roles: [IRoles];
  password: string;
  courses?: number;
  _tenantId: ObjectId;

  // Identificacion perfil de usuario
  tipo_usuario?: String; // Puedes ser Profesor o Estudiante
  admin?: boolean;

  componentes_utilizados?: number;

  // Configruacion pra alertas
  tiempo_desconexion: number;
  duracion_alerta: number;
  fecha_inicio_alertas: Date;

  auth: string;
  failedLoginCount: number;
  idNumber: number;
  _isDeleted: boolean;
}

const userSchema = new Schema<IUser>(
  {
    // _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    firstAccess: Date,
    lastAccess: Date,
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
      },
    ],
    courses: Number,
    password: String,
    _tenantId: Schema.Types.ObjectId,

    // Identificacion perfil de usuario
    tipo_usuario: {
      type: String,
      default: 'docente',
      enum: ['docente', 'estudiante'],
    },
    admin: {
      type: Boolean,
      default: false,
    },

    tiempo_desconexion: Number,
    duracion_alerta: Number,
    fecha_inicio_alertas: {
      type: Date,
      default: Date.now,
    },

    componentes_utilizados: Number,

    auth: {
      type: String,
      default: 'local',
    },
    failedLoginCount: {
      type: Number,
      default: 0,
    },
    idNumber: {
      type: Number,
    },
    _isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'users',
  }
);

export const UserModel = model<IUser>('User', userSchema);
