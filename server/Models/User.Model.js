import { model, Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(uniqueValidator);
export const UserModel = model("User", userSchema);
