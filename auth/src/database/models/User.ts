import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "../../interfaces/user";
import { Password } from "../../services/password";

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const hashed = Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

UserSchema.statics.build = (args: IUser) => new User(args);

const User = model<IUserDocument, IUserModel>("users", UserSchema);

export { User };
