import mongoose from 'mongoose';
import { Schema, model, ObjectId } from 'mongoose';
import { IUser } from './user';

export interface IConnectionTimes {
  _isDeleted: boolean;
  _tenantId: ObjectId;
  timeStart: Date;
  timeEnd: Date;
  createdBy: IUser;
}

export interface IGetTimeConnectionIntoTwoTimes {
  numberConnection: number;
  seconds: number;
  accumulated: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const connectionUserTimeSchema = new Schema<IConnectionTimes>(
  {
    _isDeleted: Boolean,
    _tenantId: mongoose.Schema.Types.ObjectId,
    timeStart: Date,
    timeEnd: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    collection: 'connectiontimeusers',
  }
);

export const ConnectionUserTimeModel = model<IConnectionTimes>(
  'Connectiontimeusers',
  connectionUserTimeSchema
);
