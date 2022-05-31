import {model, Schema} from "mongoose";
import IUserDataModel from "../../../dataModel/iUserDataModel";

const userSchema = model<IUserDataModel>(`User`, new Schema({
  domainId: {
    type: String,
    required: [true, `Persistence requires a User ID.`],
    unique: true
  },
  email: {
    type: String,
    required: [true, `Persistence requires a User e-mail.`],
    unique: true
  },
  password: {
    type: String,
    required: [true, `Persistence requires a User e-mail.`],
  }
}, {timestamps: true}));

export default userSchema;
