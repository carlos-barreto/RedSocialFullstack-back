import mongoose from 'mongoose';
import { Schema, model, ObjectId } from 'mongoose';

export interface IAssets {
  title: number;
  assetType: string;
  description: string;
  size: number;
  createdBy: ObjectId;
  directory: string;
  filename: string;
  isDirectory: boolean;
  _isDeleted: boolean;
  tags: Array<any>;
  repository: string;
  path: string;
  thumbnailPath: string;
  mimeType: string;
  metadata: object;
  createdAt: Date;
}

const assetsSchema = new Schema<IAssets>(
  {
    title: String,
    assetType: String,
    description: String,
    size: Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    directory: String,
    filename: String,
    isDirectory: Boolean,
    _isDeleted: Boolean,
    tags: [mongoose.Schema.Types.ObjectId],
    repository: String,
    path: String,
    thumbnailPath: String,
    mimeType: String,
    metadata: Object,
    createdAt: Date,
  },
  {
    collection: 'assets',
    timestamps: true,
  }
);

export const AssetsModel = model<IAssets>('Assets', assetsSchema);
