import { Document, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  status: number;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  build(args: IUser): IUserDocument;
}

export interface IUserPayload {
  id: string;
  email: string;
  status: number;
}
