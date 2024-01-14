import mongoose from 'mongoose';
import { Schema, model, ObjectId } from 'mongoose';

export interface IPublications {
  id: Number;
  title: String;
  description: String;
  user: ObjectId;
  date_in: String;
  image: String;
  like: Number;
  createdBy: ObjectId;
  directory: String,
  filename: String;
  isDirectory: boolean;
  _isDeleted: boolean;
  path: String;
  mimeType: String
}

const publicationsSchema = new Schema<IPublications>(
  {
    title: String,
    description: String,
    user: mongoose.Schema.Types.ObjectId,
    date_in: String,
    image: String,
    like: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    directory: String,
    filename: String,
    isDirectory: Boolean,   
    path: String,
  },
  {
    collection: 'publications',
    timestamps: true,
  }
);

export const PublicationsModel = model<IPublications>('Publications', publicationsSchema);
