import { Schema, model, ObjectId } from 'mongoose';

export interface IUser {
  // _id?                 : ObjectId,
  firstName: string;
  lastName: string;
  email: string;
  firstAccess: Date;
  lastAccess: Date;
  password: string;

  // Identificacion perfil de usuario
  tipo_usuario?: String; // Puedes ser admin o user
  admin?: boolean;

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
    password: String,

    // Identificacion perfil de usuario
    tipo_usuario: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    admin: {
      type: Boolean,
      default: false,
    },

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
